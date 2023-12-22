import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Ctx, Payload } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('DATABASE') private readonly databaseClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  @RabbitSubscribe({
    exchange: 'minhaEx',
    routingKey: 'pagamento',
    queue: 'pagamento3', // Nome da sua fila
  })
  async sendMessageToQ(@Payload() message: any) {
    console.log('message from queue pagamento3', message);

    const data = {
      name: message.data?.name,
      value: message.data?.value,
      description: message.data?.description,
    };

    this.databaseClient.emit('save_message', data);
  }
}
