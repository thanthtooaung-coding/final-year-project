export interface User {
    id: string
    name: string
    avatarUrl: string
    email?: string
    role: "customer" | "agency"
}
  
export interface Comment {
    id: string
    content: string
    createdAt: Date
    likes: number
    user: User
    postId: string
}
  
  