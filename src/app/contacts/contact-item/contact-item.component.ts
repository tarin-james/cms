import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
@Component({
  selector: 'cms-contact-item',
  imports: [RouterLink, CdkDrag],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css',
})
export class ContactItemComponent implements OnInit {
  @Input() contact!: Contact;
  isEditRoute: boolean = false; // To determine if the route is 'edit'
  private routeSub!: Subscription;
  private navEndSub!: Subscription;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.navEndSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(); // Recheck the route when navigation ends
      }
    });

    // Check the initial route on component initialization
    this.checkRoute();
    // Check if the current route contains '/edit'
  }

  // Check if the route is an 'edit' route
  checkRoute(): void {
    const segments = this.router.routerState.snapshot.url.split('/');
      // Check if 'edit' exists in the URL path
      this.isEditRoute = segments.includes('edit');
   
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.navEndSub) {
      this.navEndSub.unsubscribe();
    }
  }
  
}
