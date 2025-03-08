import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name = ""
  email = ""
  password = ""
  accountType: "customer" | "agency" = "customer"
  showPassword = false

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  register() {
    console.log("Register with:", {
      name: this.name,
      email: this.email,
      password: this.password,
      accountType: this.accountType,
    })
    // Implement actual registration logic here
  }
}

