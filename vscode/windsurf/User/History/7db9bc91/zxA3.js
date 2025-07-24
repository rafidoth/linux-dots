export function runSocket(io) {
  io.on("connection", (socket) => {
    console.log("a user connected");
  });
}
