import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = ""
  password = ""
  showPassword = false

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  login() {
    console.log("Login with:", this.email, this.password)
    // Implement actual login logic here
  }
}

