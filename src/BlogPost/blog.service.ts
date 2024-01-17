import { Injectable, NotFoundException } from "@nestjs/common";
import { Blog } from "./blog.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateBlogDto } from "./BlogDTO/createblog.dto";
import mongoose from "mongoose";
import { UpdateBlogDto } from "./BlogDTO/updateblog.dto";
@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createBlog(
    blogId: string,
    createBlogDto: CreateBlogDto
  ): Promise<Blog> {
    const blog = await this.blogModel.create({
      ...createBlogDto,
      author: new mongoose.Types.ObjectId(blogId),
    });
    return blog;
  }

  async deleteBlogById(
    blogId: mongoose.Types.ObjectId,
    author: mongoose.Types.ObjectId
  ): Promise<Blog> {
    const deletedBlog = await this.blogModel.findOneAndDelete({
      _id: blogId,
      author: new mongoose.Types.ObjectId(author),
    });

    if (!deletedBlog) {
      throw new NotFoundException(`Blog with ID ${blogId} not found`);
    }

    return deletedBlog;
  }

  async updateById(
    blogId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    updateBlogDto: UpdateBlogDto
  ): Promise<Blog> {
    const existsBlog = await this.blogModel.findOneAndUpdate(
      {
        _id: blogId,
        author: new mongoose.Types.ObjectId(userId),
      },
      updateBlogDto,
      { new: true }
    );

    if (!existsBlog) {
      throw new NotFoundException(
        `Blog with #${blogId} not found or does not belong to the specified user`
      );
    }

    return existsBlog;
  }

  async getAllBlogs(page: number = 1, pageSize: number = 5): Promise<{ blogs: Blog[] }> {
    const skip = (page - 1) * pageSize;
  
    const [blogs, ] = await Promise.all([
      this.blogModel
        .find()
        .populate("author", { password: 0 })
        .skip(skip)
        .limit(pageSize)
        .exec(),
      this.blogModel.countDocuments().exec(),
    ]);
  
    return { blogs};
  }
  

  async getBlogById(
    blogId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ): Promise<Blog> {
    const foundBlog = await this.blogModel.findOne({
      _id: blogId,
      author: new mongoose.Types.ObjectId(userId),
    });

    if (!foundBlog) {
      throw new NotFoundException(
        `Blog with #${blogId} not found or does not belong to the specified user`
      );
    }
    return foundBlog;
  }
}
