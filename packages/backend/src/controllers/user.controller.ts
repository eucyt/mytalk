import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from "routing-controllers";

@Controller("/users")
export default class UserController {
  @Get("/")
  getAll(): string {
    return "This action returns all users";
  }

  @Get("/:id")
  getOne(@Param("id") id: number): string {
    return "This action returns user #" + id.toString();
  }

  @Post("")
  post(@Body() user: any): string {
    return "Saving user...";
  }

  @Put("/:id")
  put(@Param("id") id: number, @Body() user: any): string {
    return "Updating a user...";
  }

  @Delete("/:id")
  remove(@Param("id") id: number): string {
    return "Removing user...";
  }
}
