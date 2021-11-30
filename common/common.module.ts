import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentRepository } from '../comment/comment.repository';
import { CountryLangMap } from '../place/entity/country-lang-map.entity';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { LikeMap } from './entities/like-map.entity';
import { LangIso639Repository } from './repositories/iso_339_lang.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      LikeMap,
      CountryLangMap,
      LangIso639Repository,
    ]),
  ],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
