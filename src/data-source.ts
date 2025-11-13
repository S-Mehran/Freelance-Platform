import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, MODE } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST || "aws-1-ap-southeast-1.pooler.supabase.com",
  port: Number(DB_PORT) || 5432,
  username: DB_USER || "postgres.ygbwhqmnsudzbrpaajhh",
  password: DB_PASSWORD || "QJZ-Hzf7BUGbE_c",
  database: DB_NAME || "postgres",
  ssl: { rejectUnauthorized: false }, // Supabase requires SSL

  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
});

