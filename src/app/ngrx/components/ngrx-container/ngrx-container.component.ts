import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SelectItemsState } from '../../state/items.selectors'
import { NzModule } from '../../../shared/modules/nz.module'
import { ItemsContainerComponent } from '../../../shared/components/items-container/items-container.component'
import { addItems, clearItems, removeItem, searchItem } from '../../state/items.actions'
import { Observable } from 'rxjs'
import { ItemStateModel } from '../../../shared/models/state.model'
import { ItemActionsService } from '../../../shared/services/item-actions.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
@Component({
  selector: 'app-ngrx-container',
  templateUrl: './ngrx-container.component.html',
  styleUrls: ['./ngrx-container.component.scss'],
  imports: [CommonModule, NzModule, FormsModule, ItemsContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxContainerComponent implements OnInit {
  startTime!: number
  private readonly store = inject(Store)
  private readonly actions = inject(ItemActionsService)
  private readonly destroyRef = inject(DestroyRef)
  readonly state$: Observable<ItemStateModel> = this.store.select(SelectItemsState)

  ngOnInit() {
    this.actions.addItems$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(count => this.addItems(count))
    this.actions.clearItems$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.clearItems())
    this.actions.searchQuery$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(q => this.searchItem(q))
  }

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
