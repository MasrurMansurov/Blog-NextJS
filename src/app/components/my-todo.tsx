'use client'

import * as React from 'react'
import { useStore } from '../store/useStore'
import { apiTodos } from '../api/path'
import { typeTodo } from '../types/todos'
import { axiosInstance } from '../api/axiosInstance'
import useSWR from 'swr'
import { Card } from '@/components/ui/card'


const MyTodo = () => {
    const profile = useStore((state) => state.profile)

    const getMyTodo = async (id: number): Promise<typeTodo[]> => {
        try {
            const response = await axiosInstance.get(`${apiTodos}?userId=${id}`)
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    React.useEffect(() => {
        if(profile && profile.todos){
            getMyTodo(profile.id)
        }
    },[])

    const { data, error } = useSWR(profile ? [profile.id] : null , getMyTodo)

    if(error) return <div>Failed to load Todos</div>
    if(!data) return <div>Loading...</div>
 
  return (
    <div>
      {
        data && data.length > 0 ? 
        (
            data.map(({id, title, completed}) => {
                return (
                    <Card className={`${ completed ? 'p-[15px] mt-[10px] line-through' : 'p-[15px] mt-[10px]' }`} key={id}>
                        {title}
                    </Card>
                )
            })
        ) : (
            <div>No Todos found</div>
        )
      }
    </div>
  )
}

export default MyTodo
