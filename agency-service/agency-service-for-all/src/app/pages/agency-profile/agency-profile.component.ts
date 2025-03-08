import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute } from "@angular/router"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-agency-profile",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./agency-profile.component.html",
  styleUrl: "./agency-profile.component.css",
})
export class AgencyProfileComponent implements OnInit {
  agencyId: string | null = null

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.agencyId = params.get("id")
      // Load agency data based on ID
    })
  }
}

