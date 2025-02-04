'use client'

import { axiosInstance } from "@/app/api/axiosInstance"
import { apiComments } from "@/app/api/path"
import { useStore } from "@/app/store/useStore"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useParams } from "next/navigation"
import * as React from "react"

const Comments = () => {

  const { id } = useParams() as { id: string }
  const comments = useStore((state) => state.comments)
  const getComments = useStore((state) => state.getComments)

  const setComments = async (id: number) => {
    try {
      const response = await axiosInstance.get(`${apiComments}?postId=${id}`)
      getComments(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    setComments(+id)
  },[])
 
  return (
    <div>
      {
        comments.length > 0 &&
        comments.map((comment, id) => {
          return (
            <Card className="max-w-[1000px] p-[15px] mt-[10px]" key={id}>
              <CardTitle>{comment.name}</CardTitle>
              <CardDescription className="mt-[7px]">{comment.body}</CardDescription>
              <Separator className="my-4" />
              <CardDescription className="text-end">{comment.email}</CardDescription>
            </Card>
          )
        })
      }
    </div>
  )
}

export default Comments
