import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:8080', 'https://mytalk.euchi.jp'],
    credentials: true,
  },
})
export class TalkGateway {
  @WebSocketServer()
  server!: Server;

  private logger: Logger = new Logger('TalkGateway');

  // constructor(
  //   private readonly authService: AuthService,
  //   @Inject(forwardRef(() => TalkService))
  //   private readonly talkService: TalkService,
  // ) {}

  @SubscribeMessage('new_message')
  handleEvent(@MessageBody() data: string): string {
    console.log(data);
    return data;
  }

  afterInit(server: Server) {
    this.logger.log('TalkGateway initialized.');
  }

  // TODO: auth
  handleConnection(client: Socket, ...args: unknown[]) {
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
