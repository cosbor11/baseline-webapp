import type { KnipConfig } from "knip";

const config = {
  entry: ["open-next.config.ts"],
  // Zustand is an intentional baseline dependency. Do not create a store until
  // shared, client-owned state has a concrete owner.
  ignoreDependencies: ["zustand"],
  // shadcn variant exports are public APIs and are also consumed in their file.
  ignoreExportsUsedInFile: true,
  vitest: {
    config: ["vitest.config.ts"],
  },
} satisfies KnipConfig;

export default config;
