import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Item } from '../../models/items.model'
import { NzModule } from '../../modules/nz.module'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  imports: [CommonModule, NzModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input({required: true}) item!: Item
  @Output() removeItem = new EventEmitter<number>()
}
