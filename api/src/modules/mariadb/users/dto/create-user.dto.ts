import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAuthProviderDto } from "../../auth-providers/dto/create-auth-provider.dto";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;


  @IsString()
  picture: string

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAuthProviderDto)
  authProvider?: CreateAuthProviderDto;
}
