import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  imports: [],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  @Input() document!: Document;

  constructor(private documentService: DocumentService) {} // Inject the ContactService
  
    ngOnInit(): void {
      // Subscribe to the contactSelectedEvent
      this.documentService.documentSelectedEvent.subscribe((document: Document) => {
        this.document = document; // Assign the selected contact
      });
    }
}
