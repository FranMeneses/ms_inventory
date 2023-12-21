import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Store {
    @Prop({ required: true })
    name: string;

    @Prop()
    address: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);