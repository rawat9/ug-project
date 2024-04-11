'use server'

import { Element } from '@/app/dashboard/[slug]/_components/canvas/types'
import type { Json } from '@/types/database'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { Tables } from '@/types/database'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type Dashboard = Tables<'dashboard'>

// export const updateDashboardContent = async ({
//   id,
//   path,
//   new_value,
// }: {
//   id: string
//   path: string
//   new_value: string
// }) => {
//   const result = z
//     .object({
//       id: z.string().uuid(),
//       path: z.string().trim().min(1),
//       new_value: z.string().trim().min(1),
//     })
//     .safeParse({ id, path, new_value })

//   if (!result.success) {
//     console.error(result.error)
//     throw new Error('Invalid form data')
//   }

//   const supabase = await createSupabaseServerClient()
//   const { error } = await supabase.rpc('update_content', {
//     path,
//     id: result.data.id,
//     new_value,
//   })

//   // const { error } = await supabase
//   //   .from('dashboard')
//   //   .update({
//   //     title: result.data.title,
//   //   })
//   //   .eq('id', result.data.id)

//   if (error) {
//     console.error(error.message)
//     throw new Error('Error updating dashboard')
//   }

//   // revalidatePath('/dashboard')
// }

export const fetchDashboards = async (): Promise<Dashboard[]> => {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from('dashboard')
      .select()
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error.message)
      throw new Error('Error fetching data')
    }

    return data ?? []
  } catch (error) {
    console.error(error)
    throw new Error('Error creating the supabase client')
  }
}

export const createDashboard = async (body: FormData) => {
  const result = z
    .object({
      title: z.string().trim().min(1),
      description: z.string().optional(),
    })
    .safeParse({
      title: body.get('title'),
      description: body.get('description'),
    })

  if (!result.success) {
    console.error(result.error)
    throw new Error('Invalid form data')
  }

  const { title, description } = result.data

  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('dashboard')
    .insert({
      title,
      description,
    })
    .select('id')
    .single()

  if (error) {
    console.error(error.message)
    throw new Error('Error creating dashboard')
  }

  revalidatePath('/dashboard')
  redirect(`/dashboard/${data?.id}/edit`)
}

export const getDashboardById = async (
  id: string,
): Promise<Dashboard | null> => {
  const result = z.string().uuid().safeParse(id)

  if (!result.success) {
    console.error(result.error)
    throw new Error('Invalid uuid')
  }

  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from('dashboard')
      .select()
      .eq('id', result.data)
      .single()

    if (error) {
      console.error(error.message)
      return null
    }

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Error creating the supabase client')
  }
}

export const updateDashboardTitle = async ({
  id,
  title,
}: {
  id: string
  title: string
}) => {
  const result = z
    .object({
      id: z.string().uuid(),
      title: z.string().trim().min(1),
    })
    .safeParse({ id, title })

  if (!result.success) {
    console.error(result.error)
    throw new Error('Invalid form data')
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('dashboard')
    .update({
      title: result.data.title,
    })
    .eq('id', result.data.id)

  if (error) {
    console.error(error.message)
    throw new Error('Error updating dashboard')
  }

  revalidatePath('/dashboard')
}

export const publishDashboard = async (id: string) => {
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase
    .from('dashboard')
    .update({
      is_published: true,
    })
    .eq('id', id)

  if (error) {
    console.error(error.message)
    throw new Error('Error publishing dashboard')
  }
}

export const unPublishDashboard = async (id: string) => {
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase
    .from('dashboard')
    .update({
      is_published: false,
    })
    .eq('id', id)

  if (error) {
    console.error(error.message)
    throw new Error('Error un-publishing dashboard')
  }
}

export const saveCanvas = async (id: string, elements: Element[]) => {
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase
    .from('dashboard')
    .update({
      content: { elements } as unknown as Json,
    })
    .eq('id', id)

  if (error) {
    console.error(error.message)
    throw new Error('Error updating dashboard')
  }
}

type Canvas = {
  elements: Element[]
}

export const fetchCanvas = async (id: string) => {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('dashboard')
    .select('content')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error.message)
    throw new Error('Error fetching data')
  }

  // FIX ME - This is a hack to get around the type system
  return data.content as unknown as Canvas
}
