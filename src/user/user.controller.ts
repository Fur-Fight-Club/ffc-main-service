import {
  Body,
  Controller,
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
  UpdateRequest,
  UserResponse,
} from "src/api/auth/user/user.schema";
import { UserService } from "./user.service";
import { JWTUserRequest } from "src/auth/auth.model";
import { UserGuard } from "src/auth/auth-user.guard";

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

  @Patch("update")
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiResponse({
    description: "L'utilisateur est retourné",
    type: UserResponse,
  })
  async update(
    @Request() request: JWTUserRequest,
    @Body() body: UpdateRequest
  ) {
    return await this.userService.update({ ...body, id: +request.user.sub });
  }
}
