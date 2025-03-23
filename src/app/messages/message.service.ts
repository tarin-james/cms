import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {
    this.loadMessagesFromServer();  // Load messages from the server on initialization
  }

  // Helper method to load messages from the NodeJS server
  private loadMessagesFromServer(): void {
    this.http.get<Message[]>('http://localhost:3000/messages').subscribe(
      (messages: Message[]) => {
        this.messages = messages || [];
        this.messageChangedEvent.emit(this.messages.slice());  // Emit the updated message list
      },
      (error: any) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  // Get the list of messages
  getMessages(): Message[] {
    return this.messages.slice();
  }

  // Add a new message
  addMessage(newMessage: Message): void {
    if (!newMessage) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, messageData: Message }>(
      'http://localhost:3000/messages', newMessage, { headers }
    ).subscribe(responseData => {
      this.messages.push(newMessage);
      this.messageChangedEvent.emit(this.messages.slice());
    });
  }

  // Get a message by its ID
  getMessage(id: string): Message | null {
    return this.messages.find(message => message.id === id) || null;
  }
}
