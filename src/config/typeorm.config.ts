import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// 1. typeorm설정 후
// 2. app.module.ts 가서 import
export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1',
  database: 'prj0130_db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
