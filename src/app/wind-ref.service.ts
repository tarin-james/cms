import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindRefService {

  constructor() {}

  // Method to return a reference to the native window object
  getNativeWindow() {
    if (typeof window !== 'undefined') {
      return window;  // In browser, return window object
    } else {
      // Optionally return a mock window object if needed for SSR
      return {
        alert: (message: string) => console.log('SSR: ' + message)
      };
    }// Returns the DOM window object
  }
}
