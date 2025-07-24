import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NzModule } from '../../../shared/modules/nz.module'
import { ItemsContainerComponent } from '../../../shared/components/items-container/items-container.component'
import { Observable } from 'rxjs'
import { ItemStateModel } from '../../../shared/models/state.model'
import { Store } from '@ngxs/store'
import { ItemsActions } from '../../state/items.actions'
import { ItemState } from '../../state/items.states'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ItemActionsService } from '../../../shared/services/item-actions.service'

@Component({
  selector: 'app-ngxs-container',
  templateUrl: './ngxs-container.component.html',
  styleUrls: ['./ngxs-container.component.scss'],
  imports: [CommonModule, NzModule, FormsModule, ItemsContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxsContainerComponent implements OnInit {
  startTime!: number
  private readonly store = inject(Store)
  private readonly actions = inject(ItemActionsService)
  private readonly destroyRef = inject(DestroyRef)
  state$: Observable<ItemStateModel> = this.store.select(ItemState.fullState)

  ngOnInit() {
    this.actions.addItems$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(count => this.addItems(count))
    this.actions.clearItems$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.clearItems())
    this.actions.searchQuery$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(q => this.searchItem(q))
  }

  addItems(itemsCount: number) {
    this.startTime = performance.now()
    this.store.dispatch(new ItemsActions.AddItems(itemsCount))
  }

  removeItem(id: number) {
    this.startTime = performance.now()
    this.store.dispatch(new ItemsActions.RemoveItem(id))
  }

  clearItems() {
    this.startTime = performance.now()
    this.store.dispatch(new ItemsActions.ClearItems())
  }

  searchItem(searchQuery: string | null) {
    this.startTime = performance.now()
    this.store.dispatch(new ItemsActions.SearchItem(searchQuery))
  }
}
