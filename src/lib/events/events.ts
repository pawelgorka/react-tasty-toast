import { IShowToastOptions } from '../toast-options'

export enum EventType {
  Show = 0,
  Hide = 1
}

export type ShowEventPayload = {
  options: IShowToastOptions
}
