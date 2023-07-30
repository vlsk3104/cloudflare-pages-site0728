import type { Config } from "drizzle-kit"

const drizzleConfig = {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  breakpoints: true,
} satisfies Config

export default drizzleConfig
