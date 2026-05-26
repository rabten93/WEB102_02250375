import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("postgresql://postgres.tvxxtesvigplqkkunnef:Rabtentenzin0712@@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"),
  },
});