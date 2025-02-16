import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'cms-root',
  imports: [ RouterOutlet, HeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cms';
  
}
