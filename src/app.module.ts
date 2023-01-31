import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { BoardsModule } from './boards/boards.module';
import { TypeORMConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig), BoardsModule],
})
export class AppModule {}
