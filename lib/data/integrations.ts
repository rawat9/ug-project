'use server'

import {
  KmsKeyringNode,
  buildClient,
  CommitmentPolicy,
} from '@aws-crypto/client-node'
import { createSupabaseServerClient } from '../supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function encryptData(connectionString: string) {
  const generatorKeyId = process.env.AWS_KMS_KEY_ID

  const { encrypt } = buildClient(
    CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT,
  )

  const keyring = new KmsKeyringNode({ generatorKeyId })

  const context = {
    stage: 'dashcms',
    purpose: 'Data dashboard tool',
    origin: process.env.AWS_REGION!,
  }

  try {
    const { result } = await encrypt(keyring, connectionString, {
      encryptionContext: context,
    })
    return result
  } catch (e) {
    console.error(e)
  }
}

export async function createIntegration(connectionString: string) {
  const supabase = await createSupabaseServerClient()
  const encryptedString = await encryptData(connectionString)

  if (!encryptedString) {
    throw new Error('Error encrypting connection string')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.error('User not logged in')
    redirect('/login')
  }

  const { data, error } = await supabase
    .from('integration')
    .insert({
      title: 'PostgreSQL',
      encrypted_conn_string: encryptedString,
      user_id: user?.id,
    })
    .select('id')
    .single()

  if (error) {
    console.error(error.message)
    throw new Error('Error creating dashboard')
  }

  console.log('createIntegration :=>', data)
  revalidatePath('/integrations')
}
