import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UpdateEmailUserDto,
  UpdatePasswordUserDto,
  UpdateRequest,
  UserResponse,
} from "src/api/auth/user/user.schema";
import { UserGuard } from "src/auth/auth-user.guard";
import { JWTUserRequest } from "src/auth/auth.model";
import { Roles } from "src/decorators/roles.decorator";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("User controller")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    description: "Un utilisateur se connecte",
    type: LoginRequest,
  })
  @ApiResponse({
    description: "L'utilisateur est connecté",
    type: LoginResponse,
  })
  @Post("login")
  async login(@Body() body: LoginRequest) {
    return await this.userService.login(body);
  }

  @Post("logout")
  async logout() {
    return true;
  }

  @ApiBody({
    description: "Un utilisateur s'inscrit",
    type: RegisterRequest,
  })
  @ApiResponse({
    description: "L'utilisateur est inscrit",
    type: UserResponse,
  })
  @Post("register")
  async register(@Body() body: RegisterRequest) {
    return await this.userService.register(body);
  }

  @Get("me")
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiResponse({
    description: "L'utilisateur est retourné",
    type: UserResponse,
  })
  async getMe(@Request() request: JWTUserRequest) {
    return await this.userService.getMe(request.user.sub);
  }

  @Patch("password-patch")
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiResponse({
    description: "L'utilisateur est retourné",
    type: UserResponse,
  })
  async updatePassword(
    @Request() request: JWTUserRequest,
    @Body() body: UpdatePasswordUserDto
  ) {
    return await this.userService.updatePassword({
      ...body,
      id: +request.user.sub,
    });
  }

  @Patch(":id")
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiResponse({
    description: "L'utilisateur est retourné",
    type: UserResponse,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateRequest
    // @Request() request: JWTUserRequest
  ) {
    return await this.userService.update({ ...body, id: +id });
    // return await this.userService.update({ ...body, id: request.user.sub });
  }

  @Get(":id")
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @Roles("ADMIN")
  async getOneUser(@Param("id", ParseIntPipe) id: number) {
    return await this.userService.getById(id);
  }

  @Get()
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @Roles("ADMIN")
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Delete(":id")
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @Roles("ADMIN")
  async removeUser(@Param("id", ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }

  @Patch("email-update")
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiResponse({
    description: "L'utilisateur est retourné",
    type: UserResponse,
  })
  async updateEmail(
    @Request() request: JWTUserRequest,
    @Body() body: UpdateEmailUserDto
  ) {
    console.log("body", body);
    return await this.userService.updateEmail({
      email: body.email,
      id: +request.user.sub,
    });
  }
}
