import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserGuard } from "src/auth/auth-user.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import {
  AreanApiResponse,
  CreateArenaDto,
  UpdateArenaDto,
} from "./arenas.schema";
import { ArenasService } from "./arenas.service";

@Controller("arenas")
@ApiTags("Arenas controller")
@UseGuards(UserGuard, RolesGuard)
@ApiBearerAuth()
@ApiResponse({
  status: 200,
  description: "The Arenas has been successfully retrieved.",
  type: AreanApiResponse,
})
export class ArenasController {
  constructor(private readonly arenasService: ArenasService) {}

  @Post()
  @Roles("ADMIN")
  @ApiBody({
    description: "Create Arena",
    type: CreateArenaDto,
  })
  create(@Body() createArenaDto: CreateArenaDto) {
    return this.arenasService.create(createArenaDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: "The Arenas has been successfully retrieved.",
    type: [AreanApiResponse],
  })
  findAll() {
    return this.arenasService.findAll();
  }

  @Get(":id")
  @Roles("ADMIN")
  @ApiParam({
    name: "id",
    description: "Arena id",
    type: Number,
  })
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.arenasService.findOne({ id: +id });
  }

  @Patch(":id")
  @Roles("ADMIN")
  @ApiParam({
    name: "id",
    description: "Arena id",
    type: Number,
  })
  @ApiBody({
    description: "Update Arena",
    type: UpdateArenaDto,
  })
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateArenaDto: UpdateArenaDto
  ) {
    return this.arenasService.update({ ...updateArenaDto, id: +id });
  }

  @Delete(":id")
  @Roles("ADMIN")
  @ApiParam({
    name: "id",
    description: "Arena id",
    type: Number,
  })
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.arenasService.remove({ id: +id });
  }
}
