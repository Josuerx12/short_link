import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UrlVisitDocument = HydratedDocument<UrlVisit>;

@Schema({
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
})
export class UrlVisit {
  @Prop({ required: true })
  urlId: string;

  @Prop({ required: true })
  accessedAt: Date;

  @Prop()
  ip?: string;

  @Prop()
  userAgent?: string;

  @Prop()
  deletedAt?: Date;
}

export const UrlVisicSchema = SchemaFactory.createForClass(UrlVisit);
