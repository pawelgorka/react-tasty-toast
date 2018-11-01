import { ToastFactoryFunction } from './toast.model'

export interface IToastOptions {
  autoClose: number | false
  pauseOnHover: boolean
}

export interface IShowToastOptions extends IToastOptions {}
