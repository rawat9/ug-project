// 'use client'

// import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip'
// import { Tables } from '@/types/database'
// import { updateDashboardContent } from '@/lib/data/server/dashboard'

// export function ElementName({
//   id,
//   title,
// }: Pick<Tables<'dashboard'>, 'id' | 'title'>) {
//   const [isRenaming, setRenaming] = useState(false)
//   const [currentTitle, setCurrentTitle] = useState(title)

//   const handleNameChange = useCallback(
//     (event: ChangeEvent<HTMLInputElement>) => {
//       setCurrentTitle(event.target.value)
//     },
//     [],
//   )

//   const handleRenamingCancel = useCallback(() => {
//     setCurrentTitle(title)
//     setRenaming(false)
//   }, [title])

//   const handleRenamingSave = useCallback(async () => {
//     await updateDashboardContent({
//       id,
//       path: '{elements,0,name}',
//       new_value: currentTitle,
//     })
//     setRenaming(false)
//   }, [id, currentTitle])

//   const handleNameKeyDown = useCallback(
//     (event: KeyboardEvent<HTMLInputElement>) => {
//       if (event.key === 'Enter') {
//         handleRenamingSave()
//       } else if (event.key === 'Escape') {
//         handleRenamingCancel()
//       }
//     },
//     [handleRenamingCancel, handleRenamingSave],
//   )

//   return (
//     <>
//       {isRenaming ? (
//         <input
//           autoFocus
//           name="title"
//           className="p-0 font-medium focus:outline-none"
//           onBlur={handleRenamingCancel}
//           onKeyDown={handleNameKeyDown}
//           onChange={handleNameChange}
//           defaultValue={title}
//         />
//       ) : (
//         <>
//           <h3 className="select-all truncate font-medium">{title}</h3>) : (
//           <TooltipProvider delayDuration={0}>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <h3
//                   className="truncate font-medium hover:rounded-sm hover:ring-1"
//                   onClick={() => setRenaming(true)}
//                 >
//                   {title}
//                 </h3>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Rename</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </>
//       )}
//     </>
//   )
// }
