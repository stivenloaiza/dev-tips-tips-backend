import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  userTips: [{ type: Schema.Types.ObjectId, ref: 'UserTip' }],
});

export interface User extends Document {
  id: string;
  username: string;
  email: string;
  userTips: string[];
}
