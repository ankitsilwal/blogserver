import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose, { Model } from "mongoose";
import { UpdateUserDto, updateUserPasswordDto } from "./dto/updateuserDto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModle: Model<User>) {}

  async deleteUserById(userId: mongoose.Types.ObjectId): Promise<User> {
    const deleteUserById = await this.userModle.findByIdAndDelete(userId);
    if (!deleteUserById) {
      throw new NotFoundException(`User with #${userId} not found`);
    }
    return deleteUserById;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModle
      .find({}, { password: 0, role: 0, pnumber: 0 })
      .exec();
    return users;
  }

  async getUserById(userId: mongoose.Types.ObjectId): Promise<User> {
    const getUserById = await this.userModle.findById(userId, {
      password: 0,
      role: 0,
      pnumber: 0,
    });
    if (!getUserById) {
      throw new NotFoundException(`User with #${userId} not Found`);
    }
    return getUserById;
  }

  async updateById(
    userId: mongoose.Types.ObjectId,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const existsUser = await this.userModle.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true }
    );
    if (!existsUser) {
      throw new NotFoundException(`User with #${userId} not found`);
    }
    return existsUser;
  }

  async updatePasswordById(
    userId: mongoose.Types.ObjectId,
    updateUserPasswordDto: updateUserPasswordDto
  ): Promise<User> {
    const { password, confirmPassword } = updateUserPasswordDto;

    if (password !== confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUserPasswordDto = { password: hashedPassword };

    const updatedUser = await this.userModle.findByIdAndUpdate(
      userId,
      updatedUserPasswordDto,
      { new: true }
    );
    if (!updatedUser) {
      throw new NotFoundException(`User with #${userId} not found`);
    }

    return updatedUser;
  }
}
