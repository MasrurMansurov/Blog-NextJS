import * as React from 'react'

import {
  Card,
  CardHeader,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import MyPosts from './my-posts'
import MyTodo from './my-todo'

const TabProfile = () => {
  return (
    <Tabs defaultValue="account" className="w-full mt-[30px]">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="posts">Posts</TabsTrigger>
      <TabsTrigger value="todo">Todo</TabsTrigger>
    </TabsList>
    <TabsContent value="posts">
    <Card>
        <CardHeader>
          <MyPosts/>
        </CardHeader>
      </Card>
    </TabsContent>
    <TabsContent value="todo">
      <Card>
        <CardHeader>
          <MyTodo/>
        </CardHeader>
      </Card>
    </TabsContent>
  </Tabs>
  )
}

export default TabProfile
