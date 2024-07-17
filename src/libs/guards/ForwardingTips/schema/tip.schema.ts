import { Schema, Document } from 'mongoose';

export const TipSchema = new Schema({
  content: { type: String, required: true },
  userTips: [{ type: Schema.Types.ObjectId, ref: 'UserTip' }],
});

export interface Tip extends Document {
  id: string;
  content: string;
  userTips: string[];
}
