export function runSocket(io) {
  io.on("connection", async (socket) => {
    console.log("a user connected with id ", socket.id);

    const { examId, userId } = await socket.emitWithAck("exam-init");
    console.log("exam id", examId);
  });
}
