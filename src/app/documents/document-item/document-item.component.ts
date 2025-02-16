import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Document } from '../document.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'cms-document-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  @Input() document!: Document;
}
