import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { ConfigModule, registerAs } from "@nestjs/config";

dotenvConfig({ path: '.env' });

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.db_host,
  port: Number(process.env.db_port),
  username: process.env.db_username,
  password: process.env.db_password,
  database: process.env.db_database,
  entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  migrationsRun: false,
  autoLoadEntities: true,
  synchronize: false,
  ssl: process.env.db_ssl === 'true'
}

export const dataSource = registerAs('data-source', () => config);

const connectionSource = new DataSource(config as DataSourceOptions);

export default connectionSource;