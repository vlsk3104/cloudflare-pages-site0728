import type { Config } from "drizzle-kit"

const drizzleConfig = {
  schema: "./db/schema.ts",
  out: "./migrations",
  breakpoints: true,
} satisfies Config

export default drizzleConfig
