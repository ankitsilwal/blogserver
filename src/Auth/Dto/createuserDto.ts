import { ApiProperty } from "@nestjs/swagger/dist";
import { IsEnum, IsNotEmpty, IsNumber } from "@nestjs/class-validator";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  VIEWER = "view",
}
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: String;
  @ApiProperty()
  @IsNotEmpty()
  password: String;

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  pnumber: Number;
}
