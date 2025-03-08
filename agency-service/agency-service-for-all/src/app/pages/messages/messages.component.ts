import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-messages",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="messages-container">
      <h1>Messages</h1>
      <p>This is the messages page.</p>
    </div>
  `,
  styles: `
    .messages-container {
      padding: 20px;
    }
  `,
})
export class MessagesComponent {}

