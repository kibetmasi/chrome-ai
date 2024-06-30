# ngx-chome-ai

Install library ```npm i ngx-chome-ai```

## Enable AI in Chrome

> ⚠️ Note:
> * This module is under development and may contain errors and frequent incompatible changes.


Chrome built-in AI is a preview feature, you need to use chrome version 127 or greater, now in [dev](https://www.google.com/chrome/dev/?extra=devchannel) or [canary](https://www.google.com/chrome/canary/) channel, [may release on stable chanel at Jul 17, 2024](https://chromestatus.com/roadmap).

After then, you should turn on these flags:
* [chrome://flags/#prompt-api-for-gemini-nano](chrome://flags/#prompt-api-for-gemini-nano): `Enabled`
* [chrome://flags/#optimization-guide-on-device-model](chrome://flags/#optimization-guide-on-device-model): `Enabled BypassPrefRequirement`
* [chrome://components/](chrome://components/): Click `Optimization Guide On Device Model` to download the model.


## Import and run in your project

```
import { NgxChomeAiService } from 'ngx-chome-ai';

'chrome-ai' = inject(NgxChomeAiService)
errors = toSignal<string[] | undefined>(from(this['chrome-ai'].checkEnv()))

async sendMessage(message: string) {
  return await this['chrome-ai'].sendPrompt(message)
  }
}
```

## Docs
https://developer.chrome.com/docs/ai/built-in