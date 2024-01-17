import { Module } from "@nestjs/common";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { Blog, BlogSchema } from "./blog.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../Auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { RolesGuard } from "../Auth/RolesGuard/role.guard";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    AuthModule,
  ],

  controllers: [BlogController],
  providers: [BlogService, JwtService, RolesGuard],
})
export class BlogModule {}
