'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { z } from 'zod'

export const updateDashboardContent = async ({
  id,
  path,
  new_value,
}: {
  id: string
  path: string
  new_value: string
}) => {
  const result = z
    .object({
      id: z.string().uuid(),
      path: z.string().trim().min(1),
      new_value: z.string().trim().min(1),
    })
    .safeParse({ id, path, new_value })

  if (!result.success) {
    console.error(result.error)
    throw new Error('Invalid form data')
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.rpc('update_content', {
    path,
    id: result.data.id,
    new_value,
  })

  // const { error } = await supabase
  //   .from('dashboard')
  //   .update({
  //     title: result.data.title,
  //   })
  //   .eq('id', result.data.id)

  if (error) {
    console.error(error.message)
    throw new Error('Error updating dashboard')
  }

  // revalidatePath('/dashboard')
}
