import { Component, EventEmitter } from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { Document } from '../document.model';
import { Output } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'cms-document-list',
  imports: [DocumentItemComponent, NgFor],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
    @Output() selectedDocumentEvent = new EventEmitter<Document>();
    documents: Document[] = [
      new Document(
        '1',
        'test doc',
        'description',
        'www.testdoc.com',
        []
      ),
      new Document(
        '2',
        'sample doc',
        'dsc',
        'www.site.com',
        [] // Initialize as an empty array
      ),
    ];
    onSelectedDocument(document: Document) {
      this.selectedDocumentEvent.emit(document);
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