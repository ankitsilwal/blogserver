import mongoose from "mongoose";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  toObject: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Blog {
  id: mongoose.Types.ObjectId;

  @Prop()
  blogname: String;

  @Prop({ type: mongoose.Types.ObjectId, ref: "User" })
  author: mongoose.Types.ObjectId;
  @Prop()
  genre: String;
  @Prop()
  description: String;
  @Prop()
  problem: String;
  @Prop()
  summary: String;
}

export const BlogDocument = Blog && Document;
export const BlogSchema = SchemaFactory.createForClass(Blog);
