import { GetMediaFiles } from '@/lib/types';
import React from 'react'
import MediaUplaodButton from './upload-button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import MediaCard from './media-card';

type Props = {
    data: GetMediaFiles;
    subaccountId:string,
}

const MediaComponent = ({data, subaccountId}: Props) => {
  return (
    <div className='flex flex-col gap-4 h-full w-full'>
        <div className='flex justify-between items-center'>
            <h1 className='text-4xl'>Media Bucket</h1>
            <MediaUplaodButton subaccountId={subaccountId}/>
        </div>
        <Command className='pg-transparent'>
            <CommandInput placeholder='Search for file name...'/>
            <CommandList className='max-h-full p-2'>
                <CommandEmpty>No Media Files Found</CommandEmpty>
                <CommandGroup>
                    <div className='flex flex-wrap gap-4 pt-4'>
                        {data?.Media.map((file)=>(
                            <CommandItem key={file.id} className='p-0 max-w-[300px] w-full rounded-lg !bg-transparent !font-medium !text-white'>
                                <MediaCard file={file}/>
                            </CommandItem>
                        ))}
                    </div>
                </CommandGroup>
            </CommandList>
        </Command>
    </div>
  )
}

export default MediaComponent