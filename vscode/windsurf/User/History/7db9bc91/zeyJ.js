export function runSocket(io) {
  io.on("connection", async (socket) => {
    console.log("a user connected with id ", socket.id);

    const examId = await socket.emitWithAck("exam-id");
    socket.join(`exam:${examId}`);
  });
}
