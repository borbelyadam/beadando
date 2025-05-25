import { Schema, model, Document, Types } from 'mongoose';

export interface IMember extends Document {
    name: string;
    phone: string;
    pid: string;
    address: string;
    deleted: boolean;
    items: Types.ObjectId[]; // referenciák Item-ekre
}

const MemberSchema = new Schema<IMember>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    pid: { type: String, required: true },
    address: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }] // kapcsolat több Item-hez
});

export const MemberModel = model<IMember>('Member', MemberSchema);