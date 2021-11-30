import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  loginName: string;

  //Matches is used to validate against regex
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  //@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
    message: 'Password is too weak',
  })
  //at least 1 lowercase, uppercase, numeric and special char and
  // 8 or more char. Special cars !@#$%^&*
  password: string;
}
//mediumPW = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
//  at least  1 lowercase, uppercase, numeric and at least 6 char in length
