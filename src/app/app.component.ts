import { Component, inject, signal } from '@angular/core';
import { NgxChomeAiService } from 'ngx-chome-ai';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  'chrome-ai' = inject(NgxChomeAiService)
  errors = toSignal<string[] | undefined>(from(this['chrome-ai'].checkEnv()))

  messages: { text: string, fromUser: boolean }[] = []
  message: string = ''
  loading = signal<boolean>(false)

  sendMessage() {
  if (this.message.trim() === '') return
    this.messages.push({ text: this.message, fromUser: true })
    this.loading.set(true)
    this['chrome-ai'].sendPrompt(this.message)
    .then(e => {
      this.messages.push({ text: e, fromUser: false })
    })
    .finally(() => this.loading.set(false))
  this.message = ''
  }
}
