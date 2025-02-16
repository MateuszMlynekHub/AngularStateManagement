import { NgComponentOutlet } from "@angular/common"
import { TemplateRef } from "@angular/core"

export interface TabsOption {
  readonly label: string
  readonly component?: NgComponentOutlet['ngComponentOutlet']
  readonly template?: TemplateRef<unknown>
  readonly id?: number
  readonly key?: string | number
  readonly elementCount?: string
  readonly noPadding?: boolean
}