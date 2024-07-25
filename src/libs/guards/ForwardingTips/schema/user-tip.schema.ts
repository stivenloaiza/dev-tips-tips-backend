import { Schema, Document } from 'mongoose';

export const UserTipSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tip: { type: Schema.Types.ObjectId, ref: 'Tip', required: true },
  sentAt: { type: Date, required: true, default: Date.now },
});

export interface UserTip extends Document {
  id: string;
  user: string;
  tip: string;
  sentAt: Date;
}
