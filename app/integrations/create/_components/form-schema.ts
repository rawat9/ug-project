import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name of the integration is required' }),
  description: z.string().optional(),
  details: z
    .object({
      host: z.string().min(1, { message: 'Host is required' }),
      port: z.number().min(1, { message: 'Port is required' }),
      username: z.string().min(1, { message: 'Username is required' }),
      password: z
        .string()
        .min(1, { message: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters long' }),
      database: z.string().min(1, { message: 'Database name is required' }),
      ssl: z.string(),
    })
    .optional(),
  connectionString: z
    .string()
    .regex(
      /(postgres(?:ql)?):\/\/(?:([^@\s]+)@)?([^\/\s]+)(?:\/(\w+))?(?:\?(.+))?/g,
      { message: 'Invalid connection string' },
    )
    .optional(),
})
