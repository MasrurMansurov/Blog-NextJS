import { typeComment } from "./comment"
import { typePost } from "./post"
import { typeTodo } from "./todos"
import { typeUser } from "./user"


export type typeProfile = typeUser & {
    todos: typeTodo[],
    posts: typePost[],
    comments: typeComment[]
}