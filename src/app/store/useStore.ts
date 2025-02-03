import { create } from "zustand";
import { typePost } from "../types/post";

interface IStore {
    posts: typePost[],
    getPosts: (posts: typePost[]) => void
}

export const useStore = create<IStore>((set) => ({
    posts: [],
    getPosts: (posts) => {
        set({posts})
    }
}))