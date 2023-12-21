import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StoreProduct {
    @Prop({ required: true })
    id_store: string;

    @Prop({ required: true })
    id_product: string;

    @Prop({ required: true })
    stock: number;

    @Prop()
    image: string;
}

export const StoreProductSchema = SchemaFactory.createForClass(StoreProduct);