import { ApiProperty } from "@nestjs/swagger";

export class UserRequestDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
