import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './schema/store.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQ } from 'src/utils/constants';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Store.name,
                schema: StoreSchema,
            },
        ]),
        ClientsModule.register([
            {
                name: 'STORE_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.AMQP_URL],
                    queue: RabbitMQ.queue,
                    queueOptions: {
                        durable: false
                    },
                },
            },
        ]),
    ],
    controllers: [StoreController],
    providers: [StoreService],
    exports: [StoreService],
})
export class StoreModule {}
