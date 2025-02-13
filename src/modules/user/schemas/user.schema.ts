import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export enum Function {
  ADMIN = 'admin',
  CLIENT = 'client',
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name?: string;

  @Prop()
  email?: string;

  @Prop()
  password?: string;

  @Prop()
  function?: Function;

  id?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return (this._id as mongoose.Types.ObjectId).toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.password;
  },
});
