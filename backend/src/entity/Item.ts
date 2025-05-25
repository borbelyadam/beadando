import { Schema, model, Document, Types } from 'mongoose';

export interface IItem extends Document {
    item_type: string;
    author: string;
    title: string;
    in_date: Date;
    status: string;
    rent_from?: Date;
    member?: Types.ObjectId;
}

const ItemSchema = new Schema<IItem>({
    item_type: { type: String, required: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    in_date: { type: Date, required: true },
    status: { type: String, required: true },
    rent_from: { type: Date },
    member: { type: Schema.Types.ObjectId, ref: 'Member' }
});

export const ItemModel = model<IItem>('Item', ItemSchema);