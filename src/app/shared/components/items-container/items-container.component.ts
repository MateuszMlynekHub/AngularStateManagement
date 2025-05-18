import { AfterContentChecked, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from '../item/item.component';
import { NzModule } from '../../modules/nz.module';
import { ItemStateModel } from '../../models/state.model';
import { TimeFormatterPipe } from '../../pipes/ms-to-date.pipe';

@Component({
  selector: 'app-items-container',
  templateUrl: './items-container.component.html',
  styleUrls: ['./items-container.component.scss'],
  imports: [CommonModule, NzModule, FormsModule, ItemComponent, TimeFormatterPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsContainerComponent implements AfterContentChecked{
  @Input({required: true}) state!: ItemStateModel
  @Input() startTime!: number
  @Output() removeItem = new EventEmitter<number>()
  endTime = 0 

  ngAfterContentChecked()	{
    this.endTime = performance.now();
  }
}
