import {  ChangeDetectionStrategy, Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { ItemsService } from '../shared/services/items.service';
import { NzModule } from '../shared/modules/nz.module';
import { TranslateModule } from '@ngx-translate/core'
import { CommonModule } from '@angular/common';
import { TabsHandlerComponent } from '../shared/components/tabs-handler/tabs-handler.component';
import { TabsOption } from '../shared/models/tabs.model';
import { NgrxContainerComponent } from '../ngrx/components/ngrx-container/ngrx-container.component';
import { NgxsContainerComponent } from '../ngxs/components/ngxs-container/ngxs-container.component';
import { ItemActionsService } from '../shared/services/item-actions.service';
import { ElfContainerComponent } from '../elf/elf-container/elf-container.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [CommonModule, NzModule, TranslateModule, TabsHandlerComponent, NgrxContainerComponent, NgxsContainerComponent, ElfContainerComponent],
  providers: [ItemsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit{
  tabs: TabsOption[] = []
  public readonly actions = inject(ItemActionsService)
  @ViewChild('ngrx', { static: true }) public ngrx!: TemplateRef<void>
  @ViewChild('ngxs', { static: true }) public ngxs!: TemplateRef<void>
  @ViewChild('elf', { static: true }) public elf!: TemplateRef<void>
  @ViewChild('comparison', { static: true }) public comparison!: TemplateRef<void>

  ngOnInit() {
    this.tabs = this.getTabs()
  }

  getTabs(): TabsOption[] {
    return [
      {
        label: 'NgRx',
        template: this.ngrx,
      },
      {
        label: 'NGxS',
        template: this.ngxs,
      },
      {
        label: 'Elf',
        template: this.elf,
      },
      {
        label: 'comparison',
        template: this.comparison,
      },
    ]
  }
}