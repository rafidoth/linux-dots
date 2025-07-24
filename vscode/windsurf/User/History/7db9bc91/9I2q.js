export function runSocket(io) {
  io.on("connection", (socket) => {
    console.log("a user connected with id ", socket.id);

    socket.on("exam_id", (eId) => {
      console.log("exam_id", eId);
    });
  });
}
