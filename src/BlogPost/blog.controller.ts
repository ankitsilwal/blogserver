import {
  Post,
  Body,
  Controller,
  HttpException,
  Delete,
  Param,
  BadRequestException,
  NotFoundException,
  Put,
  Get,
  Request,
  UseGuards,
  Query,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./BlogDTO/createblog.dto";
import mongoose from "mongoose";
import { UpdateBlogDto } from "./BlogDTO/updateblog.dto";
import { Blog } from "./blog.schema";
import { AuthGuard } from "../Auth/auth.guard";
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";
import { RolesGuard } from "../Auth/RolesGuard/role.guard";
import { UserRoles } from "../Auth/RolesGuard/role.decorator";
import { UserRole } from "../Auth/Dto/createUserDto";
import { IRequest } from "src/Auth/Interface/request.interface";

@ApiBearerAuth()
@ApiTags("BLOG- CREATION, DELETION, UPDATION & RETERIVAL")
@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  //Create Blog----------------------------------------------------------------------------------------------------------------------------------------
  @UseGuards(AuthGuard, RolesGuard)
  @UserRoles(UserRole.ADMIN, UserRole.USER, UserRole.VIEWER)
  @ApiOperation({
    summary: "CREATE BLOG",
    description: "This will create your blog",
  })
  @ApiBody({ type: CreateBlogDto, description: "Enter blog details" })
  @ApiResponse({ status: 201, description: "Blog is created successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
  @Post("")
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Request() req: any) {
    try {
      const authorId = req.user.sub;
      return await this.blogService.createBlog(authorId, createBlogDto);
    } catch (err) {
      throw new HttpException(err.message, err.statuscode ?? 400);
    }
  }

  // Delete Blog--------------------------------------------------------------------------------------------------------------------------------------------------
  @ApiOperation({
    summary: "DELETE BLOG",
    description: "This will delete your blog",
  })
  @ApiParam({
    name: "id",
    description: "Enter your Blog Id to delete",
    type: String,
  })
  @ApiResponse({ status: 200, description: "Blog is delted successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
  @UseGuards(AuthGuard, RolesGuard)
  @UserRoles(UserRole.ADMIN, UserRole.USER)
  @Delete(":id")
  async deleteBlogById(
    @Param("id") blogId: mongoose.Types.ObjectId,
    @Request() req: IRequest
  ): Promise<string> {
    const author: mongoose.Types.ObjectId = req.user.sub;
    try {
      const deletedBlog = await this.blogService.deleteBlogById(blogId, author);
      return `User Deleted with id ${deletedBlog.id}`;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // Update Blog------------------------------------------------------------------------------------------------------------------------------------------

  // @UserRoles(UserRole.USER)
  @ApiOperation({
    summary: "UPDATE BLOG",
    description: "This will update your blog",
  })
  @ApiParam({
    name: "id",
    description: "Enter your Blog Id to delete",
    type: String,
  })
  @ApiBody({ type: UpdateBlogDto, description: "Enter updated data" })
  @ApiResponse({ status: 200, description: "Blog is Updated successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
  @UseGuards(AuthGuard, RolesGuard)
  @Put(":id")
  async updateBlogById(
    @Param("id") blogId: mongoose.Types.ObjectId,
    @Body() updateBlogDto: UpdateBlogDto,
    @Request() req: IRequest
  ) {
    const userId = req.user.sub;
    try {
      const existsBlog = await this.blogService.updateById(
        blogId,
        userId,
        updateBlogDto
      );

      return existsBlog;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  //Get Blog------------------------------------------------------------------------------------------------------------------------------------------------------------------

  @ApiOperation({ summary: "GET BLOG", description: "This will Get all blogs" })
  @ApiResponse({ status: 200, description: "Blogs are retrieved successfully" })
  @Get()
  async getAllBlogs(
    @Query("page") page?: number,
    @Query("pageSize") pageSize?: number
  ): Promise<{ blogs: Blog[] }> {
    const result = await this.blogService.getAllBlogs(page, pageSize);
    return result;
  }

  // Get By Id---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  @ApiParam({
    name: "id",
    description: "Enter your Blog Id to Retrieve",
    type: String,
  })
  @ApiResponse({ status: 200, description: "Blog is Retrieved successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
  @UseGuards(AuthGuard, RolesGuard)
  @Get(":id")
  async getBlogById(
    @Param("id") blogId: mongoose.Types.ObjectId,
    @Request() req: IRequest
  ) {
    const author: mongoose.Types.ObjectId = req.user.sub;
    try {
      const findBlogById = await this.blogService.getBlogById(blogId, author);
      return findBlogById;
    } catch (err) {
      return new BadRequestException(err);
    }
  }
}
