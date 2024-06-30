import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxChomeAiService {

  /**
   * This method sends a prompt message to the AI service and returns a response.
   * 
   * @param message - The message string to be sent as a prompt.
   * @returns A promise that resolves to a string containing the response from the AI service.
  */
  public async sendPrompt(message: string) {
    const m = await (window as any).ai.createTextSession()
    return m.prompt(message)
  }

  /**
   * This method checks the environment to ensure the browser and AI service are correctly configured.
   * 
   * @returns An array of error messages (string[]) if any checks fail, or undefined if all checks pass.
   */
  public async checkEnv(): Promise<string[] | undefined> {
    const errors: string[] = [];

    function getChromeVersion(): number {
      const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)
      return raw ? parseInt(raw[2], 10) : 0
    }

    const version = getChromeVersion()
    if (version < 127) {
      errors.push("Your browser is not supported. Please update to version 127 or greater.")
    }

    if (!("ai" in globalThis)) {
      errors.push("Prompt API is not available, check your configuration in chrome://flags/#prompt-api-for-gemini-nano")
    }

    const state = await (window as any).ai?.canCreateGenericSession()
    if (state !== "readily") {
      errors.push("Built-in AI is not ready, check your configuration in chrome://flags/#optimization-guide-on-device-model")
    }

    return errors.length > 0 ? errors : undefined
  }
}
