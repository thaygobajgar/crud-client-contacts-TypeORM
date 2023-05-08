import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import { Client, Contact } from "./entities";
import { createClient1679708074123 } from "./migrations/1679708074123-createClient";
import { createContact1679767636330 } from "./migrations/1679767636330-createContact";
import { removeUniqueContactEmail1680263853100 } from "./migrations/1680263853100-removeUniqueContactEmail";

const dataSourceConfig = (): DataSourceOptions => {
  const dbUrl: string | undefined = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("Env var DATABASE_URL does not exists");
  }

  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [Client, Contact],
    };
  }

  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    migrations: [
      createClient1679708074123,
      createContact1679767636330,
      removeUniqueContactEmail1680263853100,
    ],
    entities: [Client, Contact],
  };
};

const AppDataSource = new DataSource(dataSourceConfig());

export { AppDataSource };
