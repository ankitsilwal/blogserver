import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "../Auth/Dto/createUserDto";
import { User } from "src/User/user.schema";
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModle: Model<User>
  ) {}

  async signin(username: string, password: string) {
    const userSign = await this.findUserByusername(username);
    if (!userSign) {
      throw new UnauthorizedException("User Not Found");
    }

    const Validpassword = await bcrypt.compare(password, userSign.password);
    if (!Validpassword) {
      throw new UnauthorizedException("Invalid password");
    }

    const payload = {
      sub: userSign.id,
      role: userSign.role,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { accessToken };
  }

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<{ user: User; accessToken: string }> {
    const { username, password, role, pnumber } = createUserDto;

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await this.userModle.create({
      username,
      password: hashedpassword,
      role,
      pnumber,
    });

    const userdata = {
      sub: user.id,

      role: user.role,
    };
    const accessToken = this.jwtService.sign(userdata);
    return { user, accessToken };
  }

  async findUserByusername(username: string): Promise<User | null> {
    return this.userModle.findOne({ username });
  }
}
