import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { MatIcon, MatIconModule } from '@angular/material/icon';

interface Post {
  id: string
  title: string
  description: string
  content: string
  imageUrl: string
  category: string
  createdAt: Date
  likes: number
  commentCount: number
  agency: {
    id: string
    name: string
    logoUrl: string
    description?: string
    website?: string
    contactEmail?: string
  }
}

interface Comment {
  id: string
  content: string
  createdAt: Date
  likes: number
  user: {
    id: string
    name: string
    avatarUrl: string
    role: "customer" | "agency"
  }
  postId: string
}

@Component({
  selector: "app-post-detail",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatIconModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null
  comments: Comment[] = []
  isLoading = true
  error: string | null = null
  newComment = ""
  isLiked = false

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get("id")
      if (postId) {
        this.loadPost(postId)
        this.loadComments(postId)
      }
    })
  }

  loadPost(id: string): void {
    // Simulate API call
    setTimeout(() => {
      this.post = {
        id: "1",
        title: "Professional Web Design Services",
        description: "Custom web design solutions tailored to your business needs.",
        content: `
          <p>Our team of expert designers creates beautiful, responsive websites that help your business stand out.</p>
          <p>We focus on user experience, conversion optimization, and mobile-first design principles.</p>
          <p>Our web design process includes:</p>
          <ul>
            <li>Discovery and research</li>
            <li>Wireframing and prototyping</li>
            <li>Visual design</li>
            <li>Development</li>
            <li>Testing and launch</li>
            <li>Ongoing support and maintenance</li>
          </ul>
          <p>We work closely with you to understand your business goals and create a website that not only looks great but also drives results.</p>
        `,
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
      }
      this.isLoading = false
    }, 1000)
  }

  loadComments(postId: string): void {
    // Simulate API call
    setTimeout(() => {
      this.comments = [
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
    }, 1500)
  }

  likePost(): void {
    if (this.post) {
      this.isLiked = !this.isLiked
      this.post.likes += this.isLiked ? 1 : -1
    }
  }

  sharePost(): void {
    // Implement share functionality
    console.log("Sharing post")
  }

  savePost(): void {
    // Implement save functionality
    console.log("Saving post")
  }

  contactAgency(): void {
    // Implement contact functionality
    console.log("Contacting agency")
  }

  scrollToComments(): void {
    document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })
  }

  isLoggedIn(): boolean {
    // Placeholder for auth check
    return false
  }

  submitComment(): void {
    if (!this.newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      content: this.newComment,
      createdAt: new Date(),
      likes: 0,
      user: {
        id: "current-user",
        name: "Current User",
        avatarUrl: "https://via.placeholder.com/100",
        role: "customer",
      },
      postId: this.post?.id || "",
    }

    this.comments.unshift(comment)
    if (this.post) {
      this.post.commentCount++
    }
    this.newComment = ""
  }

  likeComment(comment: Comment): void {
    comment.likes++
  }

  replyToComment(comment: Comment): void {
    // Implement reply functionality
    console.log("Replying to comment", comment)
  }
}

