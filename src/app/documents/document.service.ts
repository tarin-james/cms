import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.loadDocumentsFromServer(); // Load documents initially
  }

  // Load documents from the Node.js server
  private loadDocumentsFromServer(): void {
    this.http.get<Document[]>('http://localhost:3000/documents').subscribe(
      (documents: Document[]) => {
        this.documents = documents || [];
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  // Get the list of documents
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  // Add a new document
  addDocument(newDocument: Document): void {
    if (!newDocument) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, document: Document }>(
      'http://localhost:3000/documents', newDocument, { headers }
    ).subscribe(responseData => {
      this.documents.push(responseData.document);
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }

  // Update an existing document
  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(`http://localhost:3000/documents/${originalDocument.id}`,
      newDocument, { headers }
    ).subscribe(() => {
      const pos = this.documents.findIndex(d => d.id === originalDocument.id);
      if (pos >= 0) {
        this.documents[pos] = newDocument;
        this.documentListChangedEvent.next(this.documents.slice());
      }
    });
  }

  // Delete a document
  deleteDocument(document: Document | null): void {
    if (!document) return;

    this.http.delete(`http://localhost:3000/documents/${document.id}`).subscribe(
      () => {
        this.documents = this.documents.filter(d => d.id !== document.id);
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
  }

  // Get a document by its ID
  getDocument(id: string): Document | null {
    return this.documents.find(document => document.id === id) || null;
  }
}
