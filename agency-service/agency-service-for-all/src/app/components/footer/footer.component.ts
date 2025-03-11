import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon"
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-footer',
  imports: [
    MatIconModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear()  
  
  constructor(private configService: ConfigService) {}
  get websiteName(): string {
    return this.configService.getWebsiteName()
  }
}
