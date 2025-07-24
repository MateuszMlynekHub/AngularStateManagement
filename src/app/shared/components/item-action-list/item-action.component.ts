import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { NzModule } from '../../modules/nz.module'
import { FormsModule } from '@angular/forms'
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs'

@Component({
  selector: 'app-item-actions',
  standalone: true,
  imports: [CommonModule, NzModule, TranslateModule, FormsModule],
  templateUrl: './item-actions.component.html',
  styleUrls: ['./item-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemActionsListComponent {
  // @Output() handleLoadData = new EventEmitter<void>()
  @Output() handleAddItem = new EventEmitter<number>()
  @Output() handleRemoveItem = new EventEmitter<void>()
  @Output() handleSearchQuery = new EventEmitter<string | null>()
  private readonly searchDebouncer = new Subject<string | null>()
  elementCount = 1
  searchQuery: string | null = ''

  constructor() { 
    this.searchDebouncer.pipe(debounceTime(1000), distinctUntilChanged())
    .subscribe(query => this.handleSearchQuery.emit(query))
  }

  searchQueryChanged(query: string): void {
    this.searchQuery = query
    this.searchDebouncer.next(query)
  }

  handleResetSearch() {
    this.searchQuery = null
    this.searchDebouncer.next(null)
  }
}
