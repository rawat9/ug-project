import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name of the integration is required' }),
  description: z.string().optional(),
  details: z
    .object({
      host: z.string().min(1, { message: 'Host is required' }),
      port: z.string(),
      username: z.string().min(1, { message: 'Username is required' }),
      password: z.string().min(6, { message: 'Password is required' }),
      database: z.string().min(1, { message: 'Database name is required' }),
      ssl: z.string(),
    })
    .optional(),
  connectionString: z.string().optional(),
})
