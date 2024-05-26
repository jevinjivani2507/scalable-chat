import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init socket service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListeners() {
    const io = this._io;
    console.log("Init socket listeners...");
    io.on("connect", async (socket) => {
      console.log("New socket connection", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message", message);
        // io.emit("event:message", { message });
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected", socket.id);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
