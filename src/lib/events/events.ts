import { IShowToastOptions, IToastOptions } from '../toast-options'
import { ToastFactoryFunction } from '../toast.model'

export enum EventType {
  Show = 0,
  Hide = 1,
  ContainerDidMount = 2,
  ContainerDidUnmount = 3
}

export interface IShowToastPayload {
  content: ToastFactoryFunction
  options: IToastOptions & {
    toastId: number
  }
}
