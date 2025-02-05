'use client'

import * as React from "react"
import { axiosInstance } from "@/app/api/axiosInstance"
import { apiComments } from "@/app/api/path"
import { useStore } from "@/app/store/useStore"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useParams } from "next/navigation"
import AddComment from "@/app/components/add-comment"

const Comments = () => {

  const { postId } = useParams() as { postId: string }
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
    setComments(+postId)
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
      <AddComment/>
    </div>
  )
}

export default Comments
