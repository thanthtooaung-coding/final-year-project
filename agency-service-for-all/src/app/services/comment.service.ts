import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"
import type { Comment } from "../models/comment.model"

@Injectable({
  providedIn: "root",
})
export class CommentService {
  private apiUrl = "api/comments" // Replace with your actual API URL

  // Mock data for development
  private mockComments: Comment[] = [
    {
      id: "1",
      content: "This is exactly what I was looking for! How soon can we schedule a consultation?",
      createdAt: new Date("2023-05-16T10:30:00"),
      likes: 5,
      user: {
        id: "201",
        name: "John Smith",
        avatarUrl: "https://via.placeholder.com/100",
        role: "customer",
      },
      postId: "1",
    },
    {
      id: "2",
      content: "I worked with this agency before and had a great experience. Highly recommended!",
      createdAt: new Date("2023-05-15T14:20:00"),
      likes: 8,
      user: {
        id: "202",
        name: "Sarah Johnson",
        avatarUrl: "https://via.placeholder.com/100",
        role: "customer",
      },
      postId: "1",
    },
    {
      id: "3",
      content: "What's your typical timeline for a project like this?",
      createdAt: new Date("2023-05-14T09:15:00"),
      likes: 2,
      user: {
        id: "203",
        name: "Michael Brown",
        avatarUrl: "https://via.placeholder.com/100",
        role: "customer",
      },
      postId: "1",
    },
  ]

  constructor(private http: HttpClient) {}

  getCommentsByPostId(postId: string): Observable<Comment[]> {
    // For development, return mock data
    // In production, use: return this.http.get<Comment[]>(`${this.apiUrl}?postId=${postId}`);

    return of(this.mockComments.filter((comment) => comment.postId === postId))
  }

  addComment(postId: string, content: string): Observable<Comment> {
    // For development, create a mock comment
    // In production, use: return this.http.post<Comment>(this.apiUrl, { postId, content });

    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
      likes: 0,
      user: {
        id: "999",
        name: "Current User",
        avatarUrl: "https://via.placeholder.com/100",
        role: "customer",
      },
      postId,
    }

    this.mockComments.unshift(newComment)
    return of(newComment)
  }

  deleteComment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  likeComment(id: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${id}/like`, {})
  }
}

