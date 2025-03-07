import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"
import type { Post } from "../models/post.model"

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiUrl = "api/posts" // Replace with your actual API URL

  // Mock data for development
  private mockPosts: Post[] = [
    {
      id: "1",
      title: "Professional Web Design Services",
      description: "Custom web design solutions tailored to your business needs.",
      content:
        "<p>Our team of expert designers creates beautiful, responsive websites that help your business stand out.</p><p>We focus on user experience, conversion optimization, and mobile-first design principles.</p>",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPQ5gB912M2i2LM1CPd4sUPB1DXpcVMj846Q&s",
      category: "Design",
      createdAt: new Date("2023-05-15"),
      likes: 42,
      commentCount: 7,
      agency: {
        id: "101",
        name: "DesignMasters",
        logoUrl: "https://via.placeholder.com/100",
        website: "https://designmasters.example.com",
      },
    },
    {
      id: "2",
      title: "Digital Marketing Campaign Management",
      description: "Comprehensive digital marketing services to grow your online presence.",
      content:
        "<p>Our digital marketing experts will help you reach your target audience through SEO, PPC, social media, and content marketing.</p><p>We develop data-driven strategies that deliver measurable results.</p>",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPQ5gB912M2i2LM1CPd4sUPB1DXpcVMj846Q&s",
      category: "Marketing",
      createdAt: new Date("2023-05-10"),
      likes: 38,
      commentCount: 5,
      agency: {
        id: "102",
        name: "GrowthHackers",
        logoUrl: "https://via.placeholder.com/100",
        website: "https://growthhackers.example.com",
      },
    },
    {
      id: "3",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      content:
        "<p>Our development team builds high-performance mobile apps that provide exceptional user experiences.</p><p>We use the latest technologies and follow best practices to ensure your app is reliable, secure, and scalable.</p>",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPQ5gB912M2i2LM1CPd4sUPB1DXpcVMj846Q&s",
      category: "Development",
      createdAt: new Date("2023-05-05"),
      likes: 56,
      commentCount: 9,
      agency: {
        id: "103",
        name: "AppCrafters",
        logoUrl: "https://via.placeholder.com/100",
        website: "https://appcrafters.example.com",
      },
    },
  ]

  constructor(private http: HttpClient) {}

  getPosts(category: string | null = null): Observable<Post[]> {
    // For development, return mock data
    // In production, use: return this.http.get<Post[]>(`${this.apiUrl}?category=${category || ''}`);

    if (category) {
      return of(this.mockPosts.filter((post) => post.category === category))
    }
    return of(this.mockPosts)
  }

  getPostById(id: string): Observable<Post> {
    // For development, return mock data
    // In production, use: return this.http.get<Post>(`${this.apiUrl}/${id}`);

    const post = this.mockPosts.find((p) => p.id === id)
    if (post) {
      return of(post)
    }
    throw new Error("Post not found")
  }

  createPost(postData: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, postData)
  }

  updatePost(id: string, postData: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, postData)
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  likePost(id: string): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/${id}/like`, {})
  }
}

