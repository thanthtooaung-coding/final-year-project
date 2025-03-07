export interface Agency {
    id: string
    name: string
    logoUrl: string
    description?: string
    website?: string
    contactEmail?: string
}
  
export interface Post {
    id: string
    title: string
    description: string
    content: string
    imageUrl: string
    category: string
    createdAt: Date
    likes: number
    commentCount: number
    agency: Agency
}
    