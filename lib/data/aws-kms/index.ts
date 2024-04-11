import {
  CommitmentPolicy,
  KmsKeyringNode,
  buildClient,
} from '@aws-crypto/client-node'

export async function decryptData(encryptedData: Buffer) {
  const generatorKeyId = process.env.AWS_KMS_KEY_ID

  const { decrypt } = buildClient(
    CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT,
  )

  const keyring = new KmsKeyringNode({ generatorKeyId })

  const context = {
    stage: 'dashgen',
    purpose: 'Data dashboard tool',
    origin: process.env.AWS_REGION!,
  }

  try {
    const { plaintext, messageHeader } = await decrypt(keyring, encryptedData)
    const { encryptionContext } = messageHeader

    Object.entries(context).forEach(([key, value]) => {
      if (encryptionContext[key] !== value)
        throw new Error('Encryption Context does not match expected values')
    })

    return plaintext.toString()
  } catch (e) {
    console.error(e)
  }
}

export async function encryptData(connectionString: string) {
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
