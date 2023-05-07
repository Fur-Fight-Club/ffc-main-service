import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { ArenasService } from "./arenas.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  AreanApiResponse,
  CreateArenaDto,
  UpdateArenaDto,
} from "./arenas.schema";
import { UserGuard } from "src/auth/auth-user.guard";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";

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
  @Roles("ADMIN")
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
