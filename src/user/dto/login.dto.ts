import { IsNotEmpty, IsString, Length, Matches } from "class-validator";



export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @Length(6,18)
    username: string;


    @IsNotEmpty()
    @IsString()
    @Length(6,18)
    password: string;
}
