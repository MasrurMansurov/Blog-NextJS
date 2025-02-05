'use client'

import * as React from "react"
import { axiosInstance } from "@/app/api/axiosInstance"
import { apiPosts } from "@/app/api/path"
import { useStore } from "@/app/store/useStore"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { MessageCircleMore } from "lucide-react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


const Posts = () => {
    const posts = useStore((state) => state.posts)
    const getPosts = useStore((state) => state.getPosts)
    const [currentPage, setCurrentPage] = React.useState(1)
    const itemsPerPage = 10

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPosts = posts?.slice(startIndex, endIndex)

    const handleChangePage = ( _: React.ChangeEvent<unknown>, value: number ) => {
        setCurrentPage(value)
    }

    const setPosts = async () => {
        try {
            const response = await axiosInstance.get(apiPosts)
            getPosts(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(()=> {
        setPosts()
    },[])
    
    const totalPages = Math.ceil(posts?.length / itemsPerPage)

  return (
    <div>
        {/* Posts */}
        {
          currentPosts.length > 0 &&
          currentPosts.map((post, id)=> {
            return (
                <Card className="max-w-[1000px] p-[15px] mt-[10px]" key={id}>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription className="mt-[7px]">{post.body}</CardDescription>
                    <Separator className="my-4" />
                    <Link href={`/pages/posts/${post.id}`}><MessageCircleMore/></Link>
                </Card>
            )
          })
        }
     
        {/* Pagination */}
        <Pagination className="mt-[20px] mb-[20px]">
           <PaginationContent>
               <PaginationItem>
                   <PaginationPrevious href="#" onClick={(event) => handleChangePage(event, currentPage - 1)} />
               </PaginationItem>
               {Array.from({length: totalPages}, (_, i) => i + 1).map((page, index) => (
                   <PaginationItem key={index}>
                       <PaginationLink href="#" onClick={(event) => handleChangePage(event, page)} isActive={currentPage === page}>
                           {page}
                       </PaginationLink>
                   </PaginationItem>
               ))}
               <PaginationItem>
                   <PaginationNext href="#" onClick={(event) => handleChangePage(event, currentPage + 1)} />
               </PaginationItem>
           </PaginationContent>
        </Pagination>
    </div>
  )
}

export default Posts
