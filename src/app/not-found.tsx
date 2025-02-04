import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

const NotFound = () => {
  return ( 
  <>
    <div className='flex items-center gap-[5px] justify-center mt-[50px] font-mono'>
      Error <span className='text-[30px] text-red-500 font-black'>404</span> : page not found !
    </div>
    <Button className='mt-[10px] block m-auto'> <Link className='flex items-center gap-[5px]' href='/'> <ArrowLeft/> Back - Home Page</Link> </Button>
  </>
  )
}

export default NotFound
