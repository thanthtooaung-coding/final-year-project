import { Component } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false
  isUserMenuOpen = false

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
    if (this.isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen
  }

  isLoggedIn() {
    // Placeholder until auth service is implemented
    return false
  }

  isAgency() {
    // Placeholder until auth service is implemented
    return false
  }

  logout() {
    // Will implement auth service later
    console.log("Logout clicked")
  }
}
