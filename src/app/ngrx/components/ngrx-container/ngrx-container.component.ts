import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SelectItemsState } from '../../state/items.selectors'
import { NzModule } from '../../../shared/modules/nz.module'
import { ItemsContainerComponent } from '../../../shared/components/items-container/items-container.component'
import { addItems, clearItems, removeItem, searchItem } from '../../state/items.actions'
import { ItemActionsListComponent } from '../../../shared/components/item-action-list/item-action.component'
import { Observable } from 'rxjs'
import { ItemState } from '../../../shared/models/state.model'

@Component({
  selector: 'app-ngrx-container',
  templateUrl: './ngrx-container.component.html',
  styleUrls: ['./ngrx-container.component.scss'],
  imports: [CommonModule, NzModule, FormsModule, ItemsContainerComponent, ItemActionsListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxContainerComponent {
  private readonly store = inject(Store)
  readonly state$: Observable<ItemState> = this.store.select(SelectItemsState)
  startTime!: number

  addItems(itemsCount: number) {
    this.startTime = performance.now()
    this.store.dispatch(addItems({itemsCount}))
  }

  removeItem(id: number) {
    this.startTime = performance.now()
    this.store.dispatch(removeItem({id}))
  }

  clearItems() {
    this.startTime = performance.now()
    this.store.dispatch(clearItems())
  }

  searchItem(searchQuery: string | null) {
    this.startTime = performance.now()
    this.store.dispatch(searchItem({searchQuery}))
  }
}
