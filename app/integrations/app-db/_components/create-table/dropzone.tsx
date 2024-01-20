import { Button } from '@/components/ui/button'
import { Upload } from '@/icons'
import { useDropzone, type DropzoneOptions } from 'react-dropzone'

export function Dropzone({ options }: { options: DropzoneOptions }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(options)

  return (
    <>
      <div
        {...getRootProps({
          className:
            'flex justify-center cursor-pointer bg-white rounded-lg border-2 border-dashed border-neutral-200 px-16 py-8 min-h-[11rem]',
        })}
      >
        <input {...getInputProps({ name: 'file', type: 'file' })} />
        <div className="flex flex-col items-center justify-center gap-4">
          <Upload className="h-8 w-8 text-slate-900" />
          {isDragActive ? (
            <p className="text-slate-600">Drop the files here...</p>
          ) : (
            <>
              <p className="text-sm text-slate-600">
                Drag & drop your file here
              </p>
              <Button variant={'outline'} size={'sm'}>
                Browse files
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
