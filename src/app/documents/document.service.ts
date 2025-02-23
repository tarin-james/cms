import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';  // Import the Document model
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';  // Import the MOCKDOCUMENTS array
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];  
  maxDocumentId: number;
  documentListChangedEvent = new Subject<Document[]>();
  
  constructor() {
    this.documents = MOCKDOCUMENTS;  
    this.maxDocumentId = this.getMaxId();
  }
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

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.getDocuments());
  }

  

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentListChangedEvent.next(this.getDocuments());
  }


  // Method to get a specific document by ID
  getDocument(id: string): Document | null {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;  
      }
    }
    return null;  
  }

  deleteDocument(document: Document | null) {
    if (!document) return;

    const pos = this.documents.indexOf(document);
    if (pos < 0) return;

    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.getDocuments());
  }
}

