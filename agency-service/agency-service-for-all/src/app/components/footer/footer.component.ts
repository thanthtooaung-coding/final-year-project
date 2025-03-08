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

  websiteName: string = "Default Website Name";
  
  constructor(private configService: ConfigService) {
    this.configService.websiteName$.subscribe(name => {
      this.websiteName = name;
    });
  }
}
