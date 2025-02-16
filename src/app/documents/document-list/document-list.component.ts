import { Component, EventEmitter } from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { Document } from '../document.model';
import { Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocumentService } from '../document.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'cms-document-list',
  imports: [RouterLink, DocumentItemComponent, NgFor],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor(private documentService: DocumentService) {}
  documents: Document[] = [];
  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }

}

// export class Document {
//   constructor(
//     public id: string,
//     public name: string,
//     public description: string,
//     public url: string,
//     public children: Document[]
//   ) {}
// }
