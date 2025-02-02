import { Component } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { Document } from './document.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-documents',
  imports: [DocumentListComponent, DocumentDetailComponent, NgIf],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
    selectedDocument!: Document; 
  
    onDocumentSelected(document: Document) {
      this.selectedDocument = document;
    }
}
