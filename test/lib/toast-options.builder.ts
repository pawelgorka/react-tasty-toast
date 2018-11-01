import { IToastOptions } from '../../src/lib/toast-options'
import Builder from '../helpers/builder'

class ToastOptionsBuilder extends Builder<IToastOptions> {
  constructor() {
    super()

    this.with('autoClose', false)
    this.with('pauseOnHover', false)
  }
}

export default ToastOptionsBuilder
