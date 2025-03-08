import { Component } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  websiteName: string = "Default Website Name";

  constructor(private configService: ConfigService) {
    this.configService.websiteName$.subscribe(name => {
      this.websiteName = name;
    });
  }
  
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
