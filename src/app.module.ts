import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'minhaEx',
          type: 'direct',
        },
      ],
      uri: 'amqps://kvmqtrbj:iLOjSy_NXLLlfeAPcRJy5lLXvspkW1qA@moose.rmq.cloudamqp.com/kvmqtrbj',
    }),

    //Microservice TCP comunication
    ClientsModule.register([
      { name: 'DATABASE', transport: Transport.TCP },
      // {
      //   name: 'RABBIT',
      //   transport: Transport.TCP,
      //   options: {
      //     port: 4001,
      //   },
      // },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
