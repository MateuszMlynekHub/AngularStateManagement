import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Observable } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ItemsContainerComponent } from '../../shared/components/items-container/items-container.component'
import { ItemStateModel } from '../../shared/models/state.model'
import { NzModule } from '../../shared/modules/nz.module'
import { ItemActionsService } from '../../shared/services/item-actions.service'
import { ItemsFacade } from '../state/items.facade'


@Component({
  selector: 'app-elf-container',
  templateUrl: './elf-container.component.html',
  styleUrls: ['./elf-container.component.scss'],
  standalone: true,
  imports: [CommonModule, NzModule, FormsModule, ItemsContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElfContainerComponent implements OnInit {
  startTime!: number
  private readonly facade = inject(ItemsFacade)
  private readonly actions = inject(ItemActionsService)
  private readonly destroyRef = inject(DestroyRef)
  state$: Observable<ItemStateModel> = this.facade.fullState$

  ngOnInit() {
    this.actions.addItems$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(count => this.addItems(count))
    this.actions.clearItems$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.clearItems())
    this.actions.searchQuery$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(q => this.searchItem(q))
  }

  addItems(itemsCount: number) {
    this.startTime = performance.now()
    this.facade.addItems(itemsCount).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  removeItem(id: number) {
    this.startTime = performance.now()
    this.facade.removeItem(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  clearItems() {
    this.startTime = performance.now()
    this.facade.clearItems().pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  searchItem(searchQuery: string | null) {
    this.startTime = performance.now()
    this.facade.searchItem(searchQuery)
  }
}
