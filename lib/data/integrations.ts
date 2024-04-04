'use server'

import {
  KmsKeyringNode,
  buildClient,
  CommitmentPolicy,
} from '@aws-crypto/client-node'
import { createSupabaseServerClient } from '../supabase/server'
import { revalidatePath } from 'next/cache'
import { ConnectionObject, Result } from '@/types'

async function encryptData(connectionString: string) {
  const generatorKeyId = process.env.AWS_KMS_KEY_ID

  const { encrypt } = buildClient(
    CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT,
  )

  const keyring = new KmsKeyringNode({ generatorKeyId })

  const context = {
    stage: 'dashgen',
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

export async function createIntegration(
  title: string,
  description: string,
  connection: string,
) {
  const supabase = await createSupabaseServerClient()
  // const encryptedString = await encryptData(connectionString)

  // if (!encryptedString) {
  //   throw new Error('Error encrypting connection string')
  // }

  const { error } = await supabase.from('integration').insert({
    title,
    description,
    conn_string: connection,
  })

  if (error) {
    console.error(error.message)
    throw new Error('Error creating dashboard')
  }

  revalidatePath('/integrations')
}

// cache this function call
export async function testConnection(connectionString: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.functions.invoke<
    Result['test-connection']
  >('test-connection', {
    method: 'POST',
    body: {
      type: 'postgres',
      conn_string: connectionString,
    },
  })

  if (error) {
    console.log(error)
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error('No data returned')
  }

  return data
}