import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQ } from 'src/utils/constants';
import { StoreProduct, StoreProductSchema } from './schema/store-product.schema';
import { StoreProductService } from './store-product.service';
import { StoreProductController } from './store-product.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: StoreProduct.name,
                schema: StoreProductSchema,
            },
        ]),
        ClientsModule.register([
            {
                name: 'STORE_PRODUCT_SERVICE',
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
    controllers: [StoreProductController],
    providers: [StoreProductService],
    exports: [StoreProductService],
})
export class StoreProductModule {}
