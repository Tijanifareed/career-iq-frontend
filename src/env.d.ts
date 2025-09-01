interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // add more variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}