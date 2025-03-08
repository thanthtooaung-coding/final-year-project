import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"

interface Agency {
  id: string
  name: string
  logoUrl: string
  coverUrl: string
  description: string
  location: string
  rating: number
  reviewCount: number
  categories: string[]
  verified: boolean
  featured: boolean
}

@Component({
  selector: "app-agencies",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./agencies.component.html",
  styleUrl: "./agencies.component.css",
})
export class AgenciesComponent implements OnInit {
  searchQuery = ""
  selectedCategory = ""
  sortBy = "rating"
  onlyVerified = false

  categories: string[] = ["Design", "Development", "Marketing", "Consulting", "Finance", "SEO", "Content"]

  agencies: Agency[] = []
  filteredAgencies: Agency[] = []
  featuredAgencies: Agency[] = []

  // Pagination
  currentPage = 1
  itemsPerPage = 9
  totalPages = 1

  ngOnInit(): void {
    // Load mock data
    this.loadAgencies()
    this.applyFilters()
  }

  loadAgencies(): void {
    // This would normally be an API call
    this.agencies = [
      {
        id: "1",
        name: "DesignMasters",
        logoUrl: "https://via.placeholder.com/100",
        coverUrl: "https://via.placeholder.com/800x300",
        description: "Award-winning design agency specializing in branding, UI/UX, and web design.",
        location: "San Francisco, CA",
        rating: 4.9,
        reviewCount: 152,
        categories: ["Design", "Development"],
        verified: true,
        featured: true,
      },
      {
        id: "2",
        name: "GrowthHackers",
        logoUrl: "https://via.placeholder.com/100",
        coverUrl: "https://via.placeholder.com/800x300",
        description: "Digital marketing experts helping businesses achieve sustainable growth.",
        location: "New York, NY",
        rating: 4.7,
        reviewCount: 98,
        categories: ["Marketing", "SEO"],
        verified: true,
        featured: true,
      },
      {
        id: "3",
        name: "AppCrafters",
        logoUrl: "https://via.placeholder.com/100",
        coverUrl: "https://via.placeholder.com/800x300",
        description: "Mobile app development agency creating native iOS and Android applications.",
        location: "Austin, TX",
        rating: 4.8,
        reviewCount: 76,
        categories: ["Development"],
        verified: true,
        featured: false,
      },
      {
        id: "4",
        name: "ContentKings",
        logoUrl: "https://via.placeholder.com/100",
        coverUrl: "https://via.placeholder.com/800x300",
        description: "Content creation agency specializing in blogs, articles, and social media content.",
        location: "Chicago, IL",
        rating: 4.5,
        reviewCount: 64,
        categories: ["Content", "Marketing"],
        verified: false,
        featured: false,
      },
      {
        id: "5",
        name: "StrategyPartners",
        logoUrl: "https://via.placeholder.com/100",
        coverUrl: "https://via.placeholder.com/800x300",
        description: "Business consulting firm helping startups and enterprises optimize operations.",
        location: "Boston, MA",
        rating: 4.6,
        reviewCount: 41,
        categories: ["Consulting", "Finance"],
        verified: true,
        featured: false,
      },
      {
        id: "6",
        name: "SEOGenius",
        logoUrl: "https://via.placeholder.com/100",
        coverUrl: "https://via.placeholder.com/800x300",
        description: "SEO agency focused on improving organic search rankings and visibility.",
        location: "Seattle, WA",
        rating: 4.4,
        reviewCount: 37,
        categories: ["SEO", "Marketing"],
        verified: false,
        featured: false,
      },
      {
        id: "7",
        name: "CodeCrafters",
        logoUrl: "https://via.placeholder.com/100",
        coverUrl: "https://via.placeholder.com/800x300",
        description: "Full-stack development agency building custom web applications and solutions.",
        location: "Portland, OR",
        rating: 4.7,
        reviewCount: 58,
        categories: ["Development"],
        verified: true,
        featured: false,
      },
      {
        id: "8",
        name: "BrandBuilders",
        logoUrl: "https://via.placeholder.com/100",
        coverUrl: "https://via.placeholder.com/800x300",
        description: "Brand identity and strategy agency helping businesses establish market presence.",
        location: "Los Angeles, CA",
        rating: 4.8,
        reviewCount: 82,
        categories: ["Design", "Marketing"],
        verified: true,
        featured: true,
      },
      {
        id: "9",
        name: "DataDriven",
        logoUrl: "https://via.placeholder.com/100",
        coverUrl: "https://via.placeholder.com/800x300",
        description: "Data analytics agency providing insights and business intelligence solutions.",
        location: "Denver, CO",
        rating: 4.5,
        reviewCount: 29,
        categories: ["Consulting", "Finance"],
        verified: false,
        featured: false,
      },
      {
        id: "10",
        name: "SocialStars",
        logoUrl: "https://via.placeholder.com/100",
        coverUrl: "https://via.placeholder.com/800x300",
        description: "Social media marketing agency specializing in engagement and audience growth.",
        location: "Miami, FL",
        rating: 4.6,
        reviewCount: 49,
        categories: ["Marketing", "Content"],
        verified: true,
        featured: false,
      },
      {
        id: "11",
        name: "WebWizards",
        logoUrl: "https://via.placeholder.com/100",
        coverUrl: "https://via.placeholder.com/800x300",
        description: "Website development agency creating responsive and SEO-friendly sites.",
        location: "Atlanta, GA",
        rating: 4.7,
        reviewCount: 63,
        categories: ["Development", "SEO"],
        verified: true,
        featured: false,
      },
      {
        id: "12",
        name: "FinanceForward",
        logoUrl: "https://via.placeholder.com/100",
        coverUrl: "https://via.placeholder.com/800x300",
        description: "Financial consulting firm helping businesses manage resources and growth.",
        location: "Washington, DC",
        rating: 4.4,
        reviewCount: 31,
        categories: ["Finance", "Consulting"],
        verified: true,
        featured: false,
      },
    ]

    // Extract featured agencies
    this.featuredAgencies = this.agencies.filter((agency) => agency.featured)
  }

  applyFilters(): void {
    let filtered = [...this.agencies]

    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (agency) =>
          agency.name.toLowerCase().includes(query) ||
          agency.location.toLowerCase().includes(query) ||
          agency.categories.some((cat) => cat.toLowerCase().includes(query)) ||
          agency.description.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter((agency) => agency.categories.includes(this.selectedCategory))
    }

    // Apply verified filter
    if (this.onlyVerified) {
      filtered = filtered.filter((agency) => agency.verified)
    }

    // Apply sorting
    switch (this.sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviewCount":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    // Apply pagination
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    this.filteredAgencies = filtered.slice(startIndex, startIndex + this.itemsPerPage)
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

