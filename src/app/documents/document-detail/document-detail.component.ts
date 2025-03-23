import { Component } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, Params, RouterLink } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';
@Component({
  selector: 'cms-document-detail',
  imports: [RouterLink],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent {
  document!: Document | null;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private windowRefService: WindRefService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {} // Inject the ContactService

  ngOnInit(): void {
    // Subscribe to the contactSelectedEvent
    this.nativeWindow = this.windowRefService.getNativeWindow();
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params['id']; // Get 'id' from route parameters
      this.document = this.documentService.getDocument(id); // Fetch document
    });
  }
  onView() {
    if (this?.document?.url) {
  
      this.nativeWindow.open(this.document.url);
    }
  }
  onDelete() {
    this.documentService.deleteDocument(this.document);

 }
}
