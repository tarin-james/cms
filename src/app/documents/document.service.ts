import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number;
  documentListChangedEvent = new Subject<Document[]>();
  private firebaseUrl = 'https://cms-project-851c2-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
    this.loadDocumentsFromServer();  // Load documents initially
  }

  // Helper method to load documents from Firebase
  private loadDocumentsFromServer(): void {
    this.http.get<Document[]>(this.firebaseUrl).subscribe(
      (documents: Document[]) => {
        this.documents = documents || [];
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  // Get the max ID for document IDs
  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  // Get the list of documents
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  // Store the updated list of documents in Firebase
  storeDocuments(): void {
    const documentsString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.firebaseUrl, documentsString, { headers }).subscribe(
      () => {
        // Emit the updated list of documents when the server responds successfully
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error('Error saving documents:', error);
      }
    );
  }

  // Add a new document to the list
  addDocument(newDocument: Document): void {
    if (!newDocument) return;
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();  // Save the updated list to Firebase
  }

  // Update an existing document
  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) return;
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();  // Save the updated list to Firebase
  }

  // Delete a document from the list
  deleteDocument(document: Document | null): void {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.storeDocuments();  // Save the updated list to Firebase
  }

  // Get a document by its ID
  getDocument(id: string): Document | null {
    return this.documents.find(document => document.id === id) || null;
  }
}
