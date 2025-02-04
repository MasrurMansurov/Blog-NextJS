import { create } from "zustand";
import { typePost } from "../types/post";
import { typeComment } from "../types/comment";
import { typeProfile } from "../types/profile";

interface IStore {
    profile: typeProfile | null,
    setProfile: (profile: any) => void,
    logOut: () => void,
    posts: typePost[],
    getPosts: (posts: typePost[]) => void,
    comments: typeComment[],
    getComments: (comments: typeComment[]) => void
}

const getProfileFromLocalStorage = () => {
    const getProfile = localStorage.getItem('profile')
    if(getProfile){
        return JSON.parse(getProfile) as typeProfile
    }
    return null
}

export const useStore = create<IStore>((set, get) => ({
    // Profile
    profile: getProfileFromLocalStorage(),
    setProfile: (profile) => set({ profile }),
    logOut: () => set({ profile: null }),

    // Posts
    posts: [],
    getPosts: (posts) => {
        set({ posts: posts.map(post => ({ ...post, comments: [] })) })
    },

    // Comments
    comments: [],
    getComments: (comments) => {
      const state = get()
        const updatedComments = comments.map(comment => {
          const post = state.posts.find(post => post.id === comment.postId);
          if (post) {
            return { ...comment, post };
          }
          return comment;
        });
    set({ comments: updatedComments });
  }
}))