import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod']).default('dev'),
  PORT: z.coerce.number().default(3000),
  MONGODB: z.coerce.string(),
  DEFAULT_LIMIT:z.coerce.number().default(8)
})

export type EnvConfig = z.infer<typeof envSchema>;

export function validate(config: Record<string,unknown>){
  const result = envSchema.safeParse(config);
  if(!result.success){
    throw new Error(`Config validation error: ${result.error.message}`)
  };
  return result.data;
}