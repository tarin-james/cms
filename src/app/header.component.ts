import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownDirective } from './shared/dropdown.directive';

@Component({
  selector: 'app-header',
  imports: [DropdownDirective],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
