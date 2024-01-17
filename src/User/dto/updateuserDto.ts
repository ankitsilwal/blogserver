import { IsNotEmpty, ValidateIf } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { IsEnum, IsNumber } from "@nestjs/class-validator";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  VIEWER = "view",
}
export class UpdateUserDto {
  @ApiProperty()
  @ValidateIf((obj) => !obj.role && !obj.pnumber)
  @IsNotEmpty()
  username: String;

  @ApiProperty()
  @IsEnum(UserRole)
  @ValidateIf((obj) => !obj.username && !obj.pnumber)
  @IsNotEmpty()
  role: UserRole;

  @ValidateIf((obj) => !obj.role && !obj.username)
  @IsNotEmpty()
  @IsNumber()
  pnumber: Number;
}

export class updateUserPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  password: String;

  @ApiProperty()
  @IsNotEmpty()
  confirmPassword: String;
}
