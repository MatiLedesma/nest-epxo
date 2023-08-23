import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  email: string;
}
