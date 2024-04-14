import { z } from 'zod'
import { Table } from './types'

export const formSchema = z.object({
  name: z
    .string()
    .regex(new RegExp('^[a-zA-Z_]*$'), {
      message: 'Only letters and underscores are allowed',
    })
    .min(1, { message: 'Please enter table name' }),
  description: z.string().optional(),
  columns: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Please enter column name' }),
        type: z.union(
          [
            z.literal('uuid'),
            z.literal('integer'),
            z.literal('text'),
            z.literal('date'),
            z.literal('boolean'),
            z.literal('timestamp'),
          ],
          { required_error: 'Please select column type' },
        ),
        options: z.object({
          primary: z.boolean(),
          nullable: z.boolean(),
          unique: z.boolean(),
        }),
      }),
    )
    .nonempty({ message: 'Please add at least one column' }),
})

export const defaultValues = {
  name: '',
  description: '',
  columns: [
    {
      name: 'id',
      type: 'uuid',
      default: 'gen_random_uuid()',
      options: {
        primary: true,
        nullable: false,
        unique: true,
      },
    },
    {
      name: 'created_at',
      type: 'timestamp',
      default: 'CURRENT_TIMESTAMP',
      options: {
        primary: false,
        nullable: false,
        unique: false,
      },
    },
  ],
} satisfies Table
