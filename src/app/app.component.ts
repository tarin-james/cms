import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { ContactsComponent} from './contacts/contacts.component';
import { NgIf } from '@angular/common';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';

@Component({
  selector: 'cms-root',
  imports: [RouterOutlet, HeaderComponent, ContactsComponent, NgIf, DocumentsComponent, MessageListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cms';
  selectedFeature: string = 'documents';

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
