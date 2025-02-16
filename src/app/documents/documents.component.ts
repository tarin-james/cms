import { Component } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';
import { Document } from './document.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-documents',
  imports: [RouterOutlet, DocumentListComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
    selectedDocument!: Document; 
  
    onDocumentSelected(document: Document) {
      this.selectedDocument = document;
    }
}
