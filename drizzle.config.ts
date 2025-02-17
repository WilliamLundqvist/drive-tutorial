import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  tablesFilter: ["db_william_86c0a3"],
  dbCredentials: {
    host: env.SINGELSTORE_HOST,
    port: parseInt(env.SINGELSTORE_PORT),
    user: env.SINGELSTORE_USER,
    password: env.SINGELSTORE_PASS,
    database: env.SINGELSTORE_DB_NAME,
    ssl: {},
  },
} satisfies Config;
