import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-create-post",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./create-post.component.html",
  styleUrl: "./create-post.component.css",
})
export class CreatePostComponent {
  post = {
    title: "",
    category: "",
    description: "",
    content: "",
  }

  imagePreview: string | null = null

  pricingOptions = [
    {
      name: "",
      price: null,
      description: "",
    },
  ]

  onImageSelected(event: any) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        this.imagePreview = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  removeImage() {
    this.imagePreview = null
  }

  addPricingOption() {
    this.pricingOptions.push({
      name: "",
      price: null,
      description: "",
    })
  }

  removePricingOption(index: number) {
    this.pricingOptions.splice(index, 1)
  }

  savePost() {
    console.log("Saving post:", {
      ...this.post,
      image: this.imagePreview,
      pricingOptions: this.pricingOptions,
    })
    // Implement actual save logic here
  }
}

