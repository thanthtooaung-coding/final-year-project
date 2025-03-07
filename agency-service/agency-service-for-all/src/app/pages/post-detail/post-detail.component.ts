import { Component, type OnInit } from "@angular/core"
import { ActivatedRoute, RouterLink } from "@angular/router"
import { PostService } from "../../services/post.service"
import type { Post } from "../../models/post.model"
import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"
import { MatIconModule } from "@angular/material/icon"
import { CommonModule } from "@angular/common"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { CommentSectionComponent } from "../../components/comment-section/comment-section.component";
import { MatDividerModule } from "@angular/material/divider"

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"],
  imports: [MatCardModule, MatChipsModule, RouterLink, MatIconModule, CommonModule, MatProgressSpinnerModule, CommentSectionComponent, MatDividerModule],
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null
  isLoading = true
  error: string | null = null

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get("id")
      if (postId) {
        this.loadPost(postId)
      }
    })
  }

  loadPost(id: string): void {
    this.isLoading = true
    this.postService.getPostById(id).subscribe(
      (post) => {
        this.post = post
        this.isLoading = false
      },
      (error) => {
        this.error = "Failed to load post details"
        this.isLoading = false
        console.error("Error loading post", error)
      },
    )
  }

  likePost(): void {
    if (this.post) {
      this.postService.likePost(this.post.id).subscribe(
        (updatedPost) => {
          this.post = updatedPost
        },
        (error) => {
          console.error("Error liking post", error)
        },
      )
    }
  }
}

