import { IToastOptions } from '../../src/lib/toast-options'
import Builder from '../helpers/builder'

class ToastOptionsBuilder extends Builder<IToastOptions> {
  constructor() {
    super()

    this.with('autoClose', false)
    this.with('pauseOnHover', false)
  }

  public build = (): IToastOptions => {
    const toastOptions = super.build()
    // check it toast options are valid
    return toastOptions
  }
}

export default ToastOptionsBuilder
