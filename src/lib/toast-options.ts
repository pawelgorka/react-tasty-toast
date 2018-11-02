export interface IToastOptions {
  autoClose: number | false
  pauseOnHover: boolean
  closeOnClick: boolean
  onOpen?: () => void
}

export interface IShowToastOptions extends IToastOptions {}
