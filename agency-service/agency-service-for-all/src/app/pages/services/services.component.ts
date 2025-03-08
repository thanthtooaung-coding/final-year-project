import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"

interface Service {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  priceRange: string
  agency: {
    id: string
    name: string
    logoUrl: string
  }
  featured: boolean
}

@Component({
  selector: "app-services",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./services.component.html",
  styleUrl: "./services.component.css",
})
export class ServicesComponent implements OnInit {
  searchQuery = ""
  selectedCategory = ""
  sortBy = "featured"

  categories: string[] = ["Design", "Development", "Marketing", "Consulting", "Finance", "SEO", "Content"]
  allCategoriesWithAll: string[] = [] // Will be populated in ngOnInit
  popularCategories: string[] = ["Web Design", "Mobile Development", "Digital Marketing", "Branding", "SEO"]

  services: Service[] = []
  filteredServices: Service[] = []
  featuredServices: Service[] = []

  // Pagination
  currentPage = 1
  itemsPerPage = 9
  totalPages = 1

  get searchResultsTitle(): string {
    if (this.searchQuery && this.selectedCategory) {
      return `Results for "${this.searchQuery}" in ${this.selectedCategory}`
    } else if (this.searchQuery) {
      return `Results for "${this.searchQuery}"`
    } else if (this.selectedCategory) {
      return `${this.selectedCategory} Services`
    } else {
      return "All Services"
    }
  }

  ngOnInit(): void {
    // Initialize allCategoriesWithAll
    this.allCategoriesWithAll = ["All", ...this.categories]

    // Load mock data
    this.loadServices()
    this.applyFilters()
  }

  loadServices(): void {
    // This would normally be an API call
    this.services = [
      {
        id: "1",
        title: "Professional Web Design Services",
        description: "Custom web design solutions tailored to your business needs.",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Design",
        priceRange: "$1,000 - $5,000",
        agency: {
          id: "101",
          name: "DesignMasters",
          logoUrl: "https://via.placeholder.com/100",
        },
        featured: true,
      },
      {
        id: "2",
        title: "Digital Marketing Campaign Management",
        description: "Comprehensive digital marketing services to grow your online presence.",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Marketing",
        priceRange: "$2,500 - $10,000",
        agency: {
          id: "102",
          name: "GrowthHackers",
          logoUrl: "https://via.placeholder.com/100",
        },
        featured: true,
      },
      {
        id: "3",
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications for iOS and Android.",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Development",
        priceRange: "$5,000 - $25,000",
        agency: {
          id: "103",
          name: "AppCrafters",
          logoUrl: "https://via.placeholder.com/100",
        },
        featured: true,
      },
      {
        id: "4",
        title: "Brand Identity Development",
        description: "Create a unique brand identity that resonates with your target audience.",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Design",
        priceRange: "$3,000 - $7,500",
        agency: {
          id: "101",
          name: "DesignMasters",
          logoUrl: "https://via.placeholder.com/100",
        },
        featured: false,
      },
      {
        id: "5",
        title: "Search Engine Optimization",
        description: "Improve your website ranking and visibility on search engines.",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "SEO",
        priceRange: "$1,500 - $4,000",
        agency: {
          id: "104",
          name: "SEOGenius",
          logoUrl: "https://via.placeholder.com/100",
        },
        featured: false,
      },
      {
        id: "6",
        title: "Content Marketing Strategy",
        description: "Develop and implement effective content strategies to attract and engage your audience.",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Content",
        priceRange: "$2,000 - $6,000",
        agency: {
          id: "105",
          name: "ContentKings",
          logoUrl: "https://via.placeholder.com/100",
        },
        featured: false,
      },
      {
        id: "7",
        title: "E-commerce Website Development",
        description: "Build a high-converting online store with secure payment processing.",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Development",
        priceRange: "$4,000 - $15,000",
        agency: {
          id: "106",
          name: "WebWizards",
          logoUrl: "https://via.placeholder.com/100",
        },
        featured: false,
      },
      {
        id: "8",
        title: "Social Media Marketing",
        description: "Grow your brand presence and engagement across social media platforms.",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Marketing",
        priceRange: "$1,800 - $5,500",
        agency: {
          id: "107",
          name: "SocialStars",
          logoUrl: "https://via.placeholder.com/100",
        },
        featured: false,
      },
      {
        id: "9",
        title: "Business Strategy Consulting",
        description: "Expert advice to optimize your business operations and growth strategy.",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Consulting",
        priceRange: "$3,500 - $12,000",
        agency: {
          id: "108",
          name: "StrategyPartners",
          logoUrl: "https://via.placeholder.com/100",
        },
        featured: false,
      },
      {
        id: "10",
        title: "UI/UX Design Services",
        description: "Create intuitive user experiences that convert visitors into customers.",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Design",
        priceRange: "$2,500 - $8,000",
        agency: {
          id: "101",
          name: "DesignMasters",
          logoUrl: "https://via.placeholder.com/100",
        },
        featured: false,
      },
      {
        id: "11",
        title: "Financial Consulting Services",
        description: "Expert financial advice for businesses at any stage of growth.",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Finance",
        priceRange: "$4,000 - $15,000",
        agency: {
          id: "109",
          name: "FinanceForward",
          logoUrl: "https://via.placeholder.com/100",
        },
        featured: false,
      },
      {
        id: "12",
        title: "Data Analytics and Insights",
        description: "Turn your business data into actionable insights for growth.",
        imageUrl: "https://via.placeholder.com/800x400",
        category: "Consulting",
        priceRange: "$3,000 - $9,000",
        agency: {
          id: "110",
          name: "DataDriven",
          logoUrl: "https://via.placeholder.com/100",
        },
        featured: false,
      },
    ]

    // Extract featured services
    this.featuredServices = this.services.filter((service) => service.featured)
  }

  applyFilters(): void {
    let filtered = [...this.services]

    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query) ||
          service.agency.name.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter((service) => service.category === this.selectedCategory)
    }

    // Apply sorting
    switch (this.sortBy) {
      case "featured":
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
        break
      case "newest":
        // In a real app, you would sort by date
        // For this mock, we'll just use the ID as a proxy for "newest"
        filtered.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
        break
      case "priceAsc":
        filtered.sort((a, b) => {
          const aPrice = Number.parseInt(a.priceRange.split(" - ")[0].replace(/\D/g, ""))
          const bPrice = Number.parseInt(b.priceRange.split(" - ")[0].replace(/\D/g, ""))
          return aPrice - bPrice
        })
        break
      case "priceDesc":
        filtered.sort((a, b) => {
          const aPrice = Number.parseInt(a.priceRange.split(" - ")[1].replace(/\D/g, ""))
          const bPrice = Number.parseInt(b.priceRange.split(" - ")[1].replace(/\D/g, ""))
          return bPrice - aPrice
        })
        break
    }

    // Apply pagination
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    this.filteredServices = filtered.slice(startIndex, startIndex + this.itemsPerPage)
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

