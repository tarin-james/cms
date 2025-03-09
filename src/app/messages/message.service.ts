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
  private firebaseUrl = 'https://cms-project-851c2-default-rtdb.firebaseio.com/messages.json'; // Firebase URL for messages
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();
    this.loadMessagesFromServer();  // Load messages from the server on initialization
  }

  // Helper method to load messages from Firebase
  private loadMessagesFromServer(): void {
    this.http.get<Message[]>(this.firebaseUrl).subscribe(
      (messages: Message[]) => {
        this.messages = messages || [];
        this.maxMessageId = this.getMaxId();  // Update the maxMessageId after loading messages
        this.messageChangedEvent.emit(this.messages.slice());  // Emit the updated message list
      },
      (error: any) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  // Get the max ID of messages to generate unique IDs for new messages
  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  // Get the list of messages
  getMessages(): Message[] {
    return this.messages.slice();
  }

  // Store the updated list of messages in Firebase
  storeMessages(): void {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.firebaseUrl, messagesString, { headers }).subscribe(
      () => {
        this.messageChangedEvent.emit(this.messages.slice());  // Emit the updated list
      },
      (error: any) => {
        console.error('Error saving messages:', error);
      }
    );
  }

  // Add a new message
  addMessage(newMessage: Message): void {
    if (!newMessage) return;
    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();  // Assign a unique ID to the new message
    this.messages.push(newMessage);  // Add the new message to the list
    this.storeMessages();  // Save the updated list of messages to Firebase
  }

  // Get a message by its ID
  getMessage(id: string): Message | null {
    return this.messages.find(message => message.id === id) || null;
  }
}
