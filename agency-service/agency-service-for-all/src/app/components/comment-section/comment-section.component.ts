import { Component, Input, type OnInit } from "@angular/core"
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { CommentService } from "../../services/comment.service"
import { AuthService } from "../../services/auth.service"
import type { Comment } from "../../models/comment.model"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatIconModule } from "@angular/material/icon"
import { MatChipsModule } from "@angular/material/chips"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatCardModule } from "@angular/material/card"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-comment-section",
  templateUrl: "./comment-section.component.html",
  styleUrls: ["./comment-section.component.css"],
  imports: [
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    CommonModule
  ],
})
export class CommentSectionComponent implements OnInit {
  @Input() postId!: string

  comments: Comment[] = []
  commentForm: FormGroup
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    public authService: AuthService,
  ) {
    this.commentForm = this.fb.group({
      content: ["", [Validators.required, Validators.maxLength(500)]],
    })
  }

  ngOnInit(): void {
    this.loadComments()
  }

  loadComments(): void {
    this.isLoading = true
    this.commentService.getCommentsByPostId(this.postId).subscribe(
      (comments) => {
        this.comments = comments
        this.isLoading = false
      },
      (error) => {
        console.error("Error loading comments", error)
        this.isLoading = false
      },
    )
  }

  submitComment(): void {
    if (this.commentForm.valid) {
      const content = this.commentForm.get("content")?.value

      this.commentService.addComment(this.postId, content).subscribe(
        (newComment) => {
          this.comments.unshift(newComment)
          this.commentForm.reset()
        },
        (error) => {
          console.error("Error adding comment", error)
        },
      )
    }
  }
}

