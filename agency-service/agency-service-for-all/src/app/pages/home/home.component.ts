import { Component, type OnInit } from "@angular/core"
import { PostService } from "../../services/post.service"
import type { Post } from "../../models/post.model"
import { MatChipsModule } from "@angular/material/chips"
import { MatIconModule } from "@angular/material/icon"
import { PostCardComponent } from "../../components/post-card/post-card.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { ConfigService } from "../../services/config.service"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  imports: [MatChipsModule, MatIconModule, MatProgressSpinnerModule, CommonModule, RouterLink],
})
export class HomeComponent implements OnInit {
  posts: Post[] = []
  categories: string[] = ["All", "Marketing", "Design", "Development", "Consulting", "Finance"]
  selectedCategory = "All"
  isLoading = true

  websiteName: string = "Default Website Name";
  constructor(private postService: PostService, private configService: ConfigService) {
    this.configService.websiteName$.subscribe(name => {
      this.websiteName = name;
    });
  }

  ngOnInit(): void {
    this.loadPosts()
  }

  loadPosts(): void {
    this.isLoading = true
    this.postService.getPosts(this.selectedCategory !== "All" ? this.selectedCategory : null).subscribe(
      (posts) => {
        this.posts = posts
        this.isLoading = false
      },
      (error) => {
        console.error("Error loading posts", error)
        this.isLoading = false
      },
    )
  }

  selectCategory(category: string): void {
    this.selectedCategory = category
    this.loadPosts()
  }
}

