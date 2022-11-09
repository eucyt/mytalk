import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { AuthService } from '../auth/auth.service';
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:8080', 'https://mytalk.euchi.jp'],
    credentials: true,
  },
})
export class TalkGateway {
  private logger: Logger = new Logger('TalkGateway');
  @WebSocketServer()
  server!: Server;
  constructor(private readonly authService: AuthService) {}

  @SubscribeMessage('join')
  handleEvent(@MessageBody() data: number) {
    console.log(data);
  }

  afterInit(server: Server) {
    this.logger.log('TalkGateway initialized.');
  }

  async handleConnection(client: Socket, ...args: unknown[]) {
    const jwtToken = client.handshake.auth.access_token as string;

    if (!jwtToken) {
      client.disconnect(true);
      this.logger.log(`Client disconnected: ${client.id}`);
      return;
    }

    try {
      const user = await this.authService.findUserByJwt(jwtToken);
      if (!user) {
        client.disconnect(true);
        this.logger.log(`Client disconnected: ${client.id}`);
        return;
      }
    } catch (e) {
      client.disconnect(true);
      this.logger.log(`Client disconnected: ${client.id}`);
      return;
    }
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // async handleConnection(socket: Socket) {
  //   const jwtToken = socket.handshake.auth.access_token as string;
  //
  //   if (!jwtToken) {
  //     socket.disconnect(true);
  //     return;
  //   }
  //
  //   let user: User | null;
  //
  //   try {
  //     user = await this.authService.getUserFromToken(jwtToken);
  //   } catch (e) {
  //     socket.disconnect(true);
  //     return;
  //   }
  //
  //   if (!user) {
  //     socket.disconnect(true);
  //     return;
  //   }
  //
  //   const talks = await this.talkService.getTalks();
  //   const joinedTalks = talks.filter((talk) =>
  //     talk.users.some((member) => member.id === user?.id),
  //   );
  //
  //   joinedTalks.forEach((talk) => void socket.join(talk.id));
  // }
}
