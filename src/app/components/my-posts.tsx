'use client'

import * as React from 'react'
import { useStore } from '../store/useStore'
import useSWR from 'swr'
import { axiosInstance } from '../api/axiosInstance'
import { apiPosts } from '../api/path'
import { typePost } from '../types/post'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'


const MyPosts = () => {
    const profile = useStore((state) => state.profile)

    const getMyPosts = async (id: number): Promise<typePost[]> => {
        try {
            const response = await axiosInstance.get(`${apiPosts}?userId=${id}`)
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    React.useEffect(() => {
        if(profile && profile.posts){
            getMyPosts(profile.id)
        }
    },[])

    if(!profile) return null

    const { data, error } = useSWR(profile ? [profile.id] : null , getMyPosts)

    console.log('data post >>>', data)

    if(error) return <div>Failed to load Posts</div>
    if(!data) return <div>Loading...</div>

  return (
    <div>
      {
        data && data.length > 0 ?
        (
        data?.map(({ id, title, body }) => {
            return (
                <Card className="p-[15px] mt-[10px]" key={id}>
                    <CardTitle>{title}</CardTitle>
                    <Separator className="my-4" />
                    <CardContent>{body}</CardContent>
                </Card>
            )
        })
        ) : (
            <div>No posts found</div>
        )
      }
    </div>
  )
}

export default MyPosts
