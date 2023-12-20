import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMQ } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: RabbitMQ.queue,
        queueOptions: {
          durable: false
        },
      },
    });
  await app.listen();
  console.log('Microservice inventory is listening');
}
bootstrap();
