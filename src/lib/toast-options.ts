export interface IToastOptions {
  autoClose: number | false
  pauseOnHover: boolean
  onOpen?: () => void
}

export interface IShowToastOptions extends IToastOptions {}
