import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { ConfigService } from "../../services/config.service"

// This can be replaced with data from a backend service in the future
const WEBSITE_NAME = "Agency Connect"

interface TimelineItem {
  year: number
  title: string
  description: string
}

interface TeamMember {
  name: string
  title: string
  bio: string
  photoUrl: string
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: 2015,
    title: "The Beginning",
    description: `${WEBSITE_NAME} was founded by a team of industry veterans who recognized the challenges businesses face when trying to find the right agency partners.`,
  },
  {
    year: 2017,
    title: "Platform Launch",
    description: `After two years of development and testing, we launched our platform with 50 verified agencies and a handful of early business clients.`,
  },
  {
    year: 2019,
    title: "Rapid Growth",
    description: `${WEBSITE_NAME} experienced exponential growth, expanding to over 500 agencies and facilitating thousands of successful partnerships.`,
  },
  {
    year: 2021,
    title: "Global Expansion",
    description:
      "We expanded our operations globally, connecting businesses with agencies across North America, Europe, and Asia.",
  },
  {
    year: 2023,
    title: "Platform Evolution",
    description:
      "We launched our completely redesigned platform with enhanced features, improved matching algorithms, and a focus on user experience.",
  },
]

const TEAM_DATA: TeamMember[] = [
  {
    name: "Thomas Dohmke",
    title: "CEO & Founder",
    bio: `Thomas Dohmke is CEO of GitHub and drives the company’s mission of making GitHub the home for all developers.`,
    photoUrl: "https://github.blog/wp-content/uploads/2024/06/Professortocat_v2.png",
  },
  {
    name: "Demetris Cheatham",
    title: "COF",
    bio: "Demetris Cheatham is Chief of Staff for the Office of the CEO, where she serves as a trusted partner to the CEO and executive leadership team.",
    photoUrl: "/COF.jpg",
  },
  {
    name: "Kyle Daigle",
    title: "COO",
    bio: "Kyle is Chief Operating Officer at GitHub, leading teams responsible for culture, developer outreach, operations, and communications.",
    photoUrl: "/COO.jpg",
  },
  {
    name: "Mario Rodriguez",
    title: "CMO",
    bio: "Mario leads our marketing efforts, helping both businesses and agencies discover the value of our platform.",
    photoUrl: "/CMO.jpg",
  },
]

const MISSION_PART_1 = "was founded with a simple mission: to make it easier for businesses to find and collaborate with the perfect agency partners for their projects."
const MISSION_PART_2 = "We believe that the right agency partnership can transform a business, and we're dedicated to facilitating these connections through our innovative platform."
const COMPANY_START_YEAR = 2015

@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.css",
})
export class AboutComponent {
  constructor(private configService: ConfigService) {}
  
  get websiteName(): string {
    return this.configService.getWebsiteName()
  }
  
  timelineItems = TIMELINE_DATA
  teamMembers = TEAM_DATA
  missionPart1 = MISSION_PART_1
  missionPart2 = MISSION_PART_2
  companyStartYear = COMPANY_START_YEAR
}

