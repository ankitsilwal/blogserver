import {IsNotEmpty} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class CreateBlogDto{
    
    
    @ApiProperty()
    blogname : String;
    @ApiProperty()
    author : mongoose.Types.ObjectId;
    @ApiProperty()
    genre : String;
    @ApiProperty()
    description : String;
    @ApiProperty()
    problem : String;
    @ApiProperty()
    summary : String;
}