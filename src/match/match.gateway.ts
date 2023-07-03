import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

@WebSocketGateway(3999, { cors: true })
export class MatchGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  wsClients: any[] = [];

  handleConnection(client: any) {
    this.wsClients.push(client);
  }

  handleDisconnect(client) {
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
  }

  private broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (let c of this.wsClients) {
      c.emit(event, broadCastMessage);
    }
  }

  @SubscribeMessage("match")
  handleMessage(@MessageBody() data: string): string {
    console.log("Refreshing match");
    this.server.emit("match-server-response", { update: true });
    return data;
  }

  sendMessageToClient(message: { update: boolean }) {
    console.log(
      "Sending message to client",
      this.wsClients.map((c) => c.id)
    );
    this.wsClients.forEach((c) => {
      c.emit("match", message);
    });

    this.server.emit("match", message);
  }
}
