export function runSocket(io) {
  io.on("connection", async (socket) => {
    const examId = await socket.emitWithAck("exam-id");
    socket.join(`exam:${examId}`);
  });
}
