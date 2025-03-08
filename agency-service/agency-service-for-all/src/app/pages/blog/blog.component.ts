import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { ConfigService } from "../../services/config.service"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  imageUrl: string
  category: string
  author: {
    name: string
    avatarUrl: string
    role: string
  }
  publishDate: Date
  readTime: number
  featured: boolean
}

@Component({
  selector: "app-blog",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./blog.component.html",
  styleUrl: "./blog.component.css",
})
export class BlogComponent implements OnInit {
  websiteName: string = "Default Website Name";
  
  constructor(private configService: ConfigService) {
    this.configService.websiteName$.subscribe(name => {
      this.websiteName = name;
    });
  }

  searchQuery = ""
  selectedCategory = ""

  categories: string[] = ["Business", "Design", "Development", "Marketing", "Strategy", "Industry News"]

  blogPosts: BlogPost[] = []
  filteredPosts: BlogPost[] = []
  featuredPost: BlogPost | null = null

  // Pagination
  currentPage = 1
  itemsPerPage = 6
  totalPages = 1

  ngOnInit(): void {
    // Load mock data
    this.loadBlogPosts()
    this.applyFilters()
  }

  loadBlogPosts(): void {
    // This would normally be an API call
    this.blogPosts = [
      {
        id: "1",
        title: "How to Choose the Right Agency for Your Business Needs",
        excerpt:
          "Finding the perfect agency partner can be challenging. Learn the key factors to consider when making this important decision.",
        content: "Full article content here...",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Business",
        author: {
          name: "Sarah Johnson",
          avatarUrl: "https://via.placeholder.com/100",
          role: "CEO & Co-Founder",
        },
        publishDate: new Date("2023-05-15"),
        readTime: 8,
        featured: true,
      },
      {
        id: "2",
        title: "10 Web Design Trends to Watch in 2023",
        excerpt:
          "Stay ahead of the curve with these emerging web design trends that are shaping the digital landscape this year.",
        content: "Full article content here...",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Design",
        author: {
          name: "Michael Chen",
          avatarUrl: "https://via.placeholder.com/100",
          role: "CTO & Co-Founder",
        },
        publishDate: new Date("2023-05-10"),
        readTime: 6,
        featured: false,
      },
      {
        id: "3",
        title: "The ROI of Digital Marketing: Measuring Success",
        excerpt: "Learn how to effectively measure the return on investment for your digital marketing campaigns.",
        content: "Full article content here...",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Marketing",
        author: {
          name: "Emily Patel",
          avatarUrl: "https://via.placeholder.com/100",
          role: "CMO",
        },
        publishDate: new Date("2023-05-05"),
        readTime: 7,
        featured: false,
      },
      {
        id: "4",
        title: "Building a Successful Agency-Client Relationship",
        excerpt:
          "Discover the key elements that contribute to a productive and long-lasting partnership between agencies and clients.",
        content: "Full article content here...",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Business",
        author: {
          name: "David Rodriguez",
          avatarUrl: "https://via.placeholder.com/100",
          role: "COO",
        },
        publishDate: new Date("2023-04-28"),
        readTime: 5,
        featured: false,
      },
      {
        id: "5",
        title: "The Future of AI in Creative Agencies",
        excerpt:
          "Explore how artificial intelligence is transforming the creative process and reshaping agency workflows.",
        content: "Full article content here...",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Industry News",
        author: {
          name: "Michael Chen",
          avatarUrl: "https://via.placeholder.com/100",
          role: "CTO & Co-Founder",
        },
        publishDate: new Date("2023-04-20"),
        readTime: 9,
        featured: false,
      },
      {
        id: "6",
        title: "Effective Project Management for Agency Teams",
        excerpt: "Learn best practices for managing complex projects and keeping your team aligned and productive.",
        content: "Full article content here...",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Strategy",
        author: {
          name: "David Rodriguez",
          avatarUrl: "https://via.placeholder.com/100",
          role: "COO",
        },
        publishDate: new Date("2023-04-15"),
        readTime: 6,
        featured: false,
      },
      {
        id: "7",
        title: "Mobile-First Design: Why It Matters More Than Ever",
        excerpt:
          "With mobile traffic continuing to rise, learn why prioritizing mobile experiences is crucial for business success.",
        content: "Full article content here...",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Design",
        author: {
          name: "Sarah Johnson",
          avatarUrl: "https://via.placeholder.com/100",
          role: "CEO & Co-Founder",
        },
        publishDate: new Date("2023-04-08"),
        readTime: 5,
        featured: false,
      },
      {
        id: "8",
        title: "Content Marketing Strategies That Drive Results",
        excerpt:
          "Discover proven content marketing approaches that can help your business attract and engage your target audience.",
        content: "Full article content here...",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Marketing",
        author: {
          name: "Emily Patel",
          avatarUrl: "https://via.placeholder.com/100",
          role: "CMO",
        },
        publishDate: new Date("2023-04-01"),
        readTime: 7,
        featured: false,
      },
      {
        id: "9",
        title: "The Rise of Specialized Agencies: Finding Your Niche",
        excerpt:
          "Learn how focusing on a specific industry or service can help agencies stand out in a competitive market.",
        content: "Full article content here...",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Business",
        author: {
          name: "Sarah Johnson",
          avatarUrl: "https://via.placeholder.com/100",
          role: "CEO & Co-Founder",
        },
        publishDate: new Date("2023-03-25"),
        readTime: 6,
        featured: false,
      },
    ]

    // Set featured post
    this.featuredPost = this.blogPosts.find((post) => post.featured) || null
  }

  applyFilters(): void {
    let filtered = [...this.blogPosts]

    // Remove featured post from regular list if not searching or filtering
    if (!this.searchQuery && !this.selectedCategory && this.featuredPost) {
      filtered = filtered.filter((post) => post.id !== this.featuredPost?.id)
    }

    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.author.name.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter((post) => post.category === this.selectedCategory)
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())

    // Apply pagination
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    this.filteredPosts = filtered.slice(startIndex, startIndex + this.itemsPerPage)
  }

  selectCategory(category: string): void {
    this.selectedCategory = category
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

