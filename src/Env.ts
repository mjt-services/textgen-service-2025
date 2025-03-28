export type Env = Partial<{
  NATS_URL: string;
  LLM_AUTH_TOKEN: string;
  LOCAL_AUTH_TOKEN: string;
  NATS_AUTH_TOKEN: string;
  LLM_URL: string;
  LLM_MODEL: string;
  EMBEDDING_URL: string;
  EMBEDDING_MODEL: string;
}>;
