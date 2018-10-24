import { ToastFactoryFunction } from './toast.model'

export interface IToastOptions {
  autoClose: number | false
}

export interface IShowToastOptions extends IToastOptions {}
