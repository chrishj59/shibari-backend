import { Body, Controller, Get, Logger, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { GetUserLogin } from 'src/auth/decorators/get-user-login.decorator';

import JwtAuthenticationGuard from '../auth/jwt/jwt-authentication.guard';
import { UserLogin } from '../auth/user-login.entity';
import { ResponseMessageDto } from '../dtos/responseMessageDto';
import { ActivityDto } from './activity-create.dto';
import { ActivityService } from './activity.service';

@Controller('api/v1/activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}
  private logger = new Logger('Activity Contorller');

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createActivity(
    @Body(ValidationPipe) inputDto: ActivityDto,
    @GetUserLogin() userLogin: UserLogin,
  ): Promise<ResponseMessageDto> {
    return await this.activityService.addActivty(inputDto, userLogin.id);
  }

  @Get('/organising')
  @UseGuards(JwtAuthenticationGuard)
  async getActivitiesOrganising(@GetUserLogin() userLogin: UserLogin) {
    return await this.activityService.getOwnActivities(userLogin.id);
  }
}
