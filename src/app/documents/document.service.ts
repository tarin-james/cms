import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';  // Import the Document model
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';  // Import the MOCKDOCUMENTS array


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];  
  documentSelectedEvent = new EventEmitter<Document>();
  constructor() {
    this.documents = MOCKDOCUMENTS;  
  }

  // Method to get all documents
  getDocuments(): Document[] {
    return this.documents.slice();  
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
}
