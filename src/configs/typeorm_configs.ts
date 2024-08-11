import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from "@nestjs/config";

export const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Caibanmauxanh@123',
  database: 'testnestjs01',
  entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  migrationsRun: false,
  autoLoadEntities: true,
  synchronize: false,
}

export const dataSource = registerAs('data-source', () => config);

const connectionSource = new DataSource(config as DataSourceOptions);

export default connectionSource;