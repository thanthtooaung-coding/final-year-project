import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterOutlet } from "@angular/router"
import { HeaderComponent } from "./components/header/header.component"
import { FooterComponent } from "./components/footer/footer.component"
import { ConfigService } from "./services/config.service"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "agency-service"

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.configService.setWebsiteName("Agency Connect");
    // this.configService.fetchWebsiteName().subscribe(response => {
    //   this.configService.setWebsiteName(response.name);
    // });
  }
}

