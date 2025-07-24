import asyncio
import base64
import os
import json
from fastapi import FastAPI, WebSocket, websockets
import uuid
from dotenv import load_dotenv  
import websockets
import subprocess
import io
import av

load_dotenv()


app = FastAPI()

WHISPER_WS_URL = "wss://api.openai.com/v1/realtime?intent=transcription"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def webm_bytes_to_pcm16_using_ffmpeg(webm_bytes: bytes, sr: int = 24000) -> bytes:
    try:
        process = subprocess.Popen(
            [
                "ffmpeg",
                "-loglevel", "error",   # Clean output, but shows errors
                "-i", "pipe:0",         # Input from stdin
                "-f", "s16le",          # Raw PCM
                "-acodec", "pcm_s16le", # 16-bit little-endian
                "-ac", "1",             # Mono channel
                "-ar", str(sr),         # Sample rate: 24000
                "pipe:1"                # Output to stdout
            ],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        out, err = process.communicate(input=webm_bytes)
    except Exception as e:
        print(f"🚨 Error during ffmpeg processing: {e}")
        return b''
    if process.returncode != 0:
        print("🚨 ffmpeg error:", err.decode())
        return b''
    
    return out


def webm_to_pcm16_with_av(webm_data):
    input_container = av.open(io.BytesIO(webm_data))
    output_buffer = io.BytesIO()
    
    # Setup output format (raw PCM)
    output_container = av.open(output_buffer, mode='w', format='s16le')
    output_stream = output_container.add_stream('pcm_s16le')
    
    # Copy audio from input to output
    for packet in input_container.demux():
        for frame in packet.decode():
            for p in output_stream.encode(frame):
                output_container.mux(p)
    
    # Flush any remaining packets
    for p in output_stream.encode():
        output_container.mux(p)
    
    output_container.close()
    return output_buffer.getvalue()
                           


def encode_audio_to_base64(audio_bytes: bytes) -> str:
    return base64.b64encode(audio_bytes).decode('ascii')

class WhisperCommunication:
    def __init__(self, whisper_ws_url, openai_api_key, client_ws):
        self.whisper_ws_url = whisper_ws_url
        self.openai_api_key = openai_api_key
        self.client_ws = client_ws
        self.whisper_ws = None  

    def init_session(self):
        session_config ={
              "type": "session.update",
              "input_audio_format": "pcm16",
              "input_audio_transcription": {
                "model": "gpt-4o-transcribe",
                "prompt": "",
                "language": "en"
              },
              "turn_detection": {
                "type": "server_vad",
                "threshold": 0.5,
                "prefix_padding_ms": 300,
                "silence_duration_ms": 500,
              },
              "input_audio_noise_reduction": {
                "type": "near_field"
              },
              "include": [
                "item.input_audio_transcription.logprobs"
              ]
            }
        return json.dumps(session_config)

    async def send_audio(self, audio_bytes):
        try: 
            pcm_audio = webm_to_pcm16_with_av(audio_bytes)
            if not pcm_audio:
                print("ERROR: av conversion returned empty audio. Skipping send.")
                return

            print("Converted PCM bytes length:", len(pcm_audio))
            audio_base64 = encode_audio_to_base64(pcm_audio)

            # print("Sending audio to Whisper", audio_base64[:50], "...")  # Print first 50 chars for brevity
            payload = {
                "type": "input_audio_buffer.append",    
                "audio": audio_base64, 
            }
            if self.whisper_ws is not None:
                await self.whisper_ws.send(json.dumps(payload))
            # print("Audio sent to Whisper")
        except Exception as e:
            print(f"Error sending audio: {e}")

    async def receive_transcript_send_to_client(self):
        try:
            if self.whisper_ws is not None:
                res = await self.whisper_ws.recv()
                print("Received response from Whisper:", json.loads(res))
            else :
                raise Exception("Whisper WebSocket is not connected")
        except Exception as e:
            print(f"Error receiving transcript: {e}")

    async def connect(self):
        try :
            headers = {"Authorization": f"Bearer {self.openai_api_key}", "OpenAI-Beta": "realtime=v1" }
            self.whisper_ws = await websockets.connect(self.whisper_ws_url, additional_headers=headers)
            await self.whisper_ws.send(self.init_session())
        except Exception as e:
            print(f"Error in whisper communication: {e}")


class ClientConnectionManager:
    def __init__(self):
        self.connections : dict[str, WebSocket] = {}
        self.users : dict[str, str] = {}
        self.whisper_store : dict[str, WhisperCommunication] = {}


    async def receive_message(self, id : str):
            ws = self.connections[id]
            whisper = self.whisper_store[id]
            data = await ws.receive_bytes()
            if data :
                print("Received message from ", self.users[id], " data length: ", len(data))
            await asyncio.gather(
                whisper.send_audio(data),
                whisper.receive_transcript_send_to_client()
            )




    async def connect(self, websocket : WebSocket) :
        await websocket.accept()
        username = websocket.query_params['username']
        # print(username +" is joining")
        userid =  str(uuid.uuid4())
        self.connections[userid] = websocket
        self.users[userid] = username 
        # Initialize Whisper communication for the user
        whisper = WhisperCommunication(WHISPER_WS_URL, OPENAI_API_KEY, websocket)
        await whisper.connect()
        self.whisper_store[userid] = whisper
        # print("User Created ", self.users[str(id)])
        return userid

    # async def send_back_transcript(self,id : str):
    #     ws = self.connections[id]
    #     messages = []

    
    async def disconnect(self, id : str ):
        await self.connections[id].close()
        del self.connections[id]
        del self.users[id]
        print("User disconnected ", id)


manager = ClientConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket : WebSocket): 
        id = await manager.connect(websocket)         
        try :
            while True :
                await manager.receive_message(id)
        except Exception as e :  
            print(f"Error: {e}")
        finally:
            await manager.disconnect(id)
            
