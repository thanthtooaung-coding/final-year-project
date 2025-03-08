import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { PostService } from "../../services/post.service"
import type { Post } from "../../models/post.model"

@Component({
  selector: "app-posts",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./posts.component.html",
  styleUrl: "./posts.component.css",
})
export class PostsComponent implements OnInit {
  searchQuery = ""
  selectedCategory = ""
  sortBy = "newest"

  categories: string[] = ["Design", "Development", "Marketing", "Consulting", "Finance"]

  posts: Post[] = []
  filteredPosts: Post[] = []
  isLoading = true

  // Pagination
  currentPage = 1
  itemsPerPage = 9
  totalPages = 1

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts()
  }

  loadPosts(): void {
    this.isLoading = true
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts
        this.applyFilters()
        this.isLoading = false
      },
      (error) => {
        console.error("Error loading posts", error)
        this.isLoading = false
      },
    )
  }

  applyFilters(): void {
    let filtered = [...this.posts]

    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.agency.name.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter((post) => post.category === this.selectedCategory)
    }

    // Apply sorting
    switch (this.sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "popular":
        filtered.sort((a, b) => b.likes - a.likes)
        break
    }

    // Apply pagination
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    this.filteredPosts = filtered.slice(startIndex, startIndex + this.itemsPerPage)
  }

  resetFilters(): void {
    this.searchQuery = ""
    this.selectedCategory = ""
    this.sortBy = "newest"
    this.currentPage = 1
    this.applyFilters()
  }

  changePage(page: number): void {
    this.currentPage = page
    this.applyFilters()
  }

  getPageNumbers(): number[] {
    const pages = []
    // Show at most 5 page numbers
    let startPage = Math.max(1, this.currentPage - 2)
    const endPage = Math.min(this.totalPages, startPage + 4)

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }
}

