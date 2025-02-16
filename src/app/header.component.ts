import { Component } from '@angular/core';
import { DropdownDirective } from './shared/dropdown.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLinkActive, RouterLink, DropdownDirective],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {



}
