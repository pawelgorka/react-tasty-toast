import { IShowToastOptions } from './toast-options'
import { ToastFactoryFunction } from './toast.model'
import EventManager, { IEventManager } from './event-manager/event-manager'
import { EventType, IShowToastPayload } from './events/events'

export interface IToastService {
  show: (content: any, options: IShowToastOptions) => {}
}

class ToastService {
  eventManager: IEventManager
  queue: IShowToastPayload[]
  toastId: number
  isContainerMounted: boolean

  constructor(eventManager: IEventManager) {
    this.eventManager = eventManager
    this.toastId = 1
    this.queue = []
    this.isContainerMounted = false

    this.eventManager.on(EventType.ContainerDidMount, this.onContainerDidMount)
    this.eventManager.on(EventType.ContainerDidUnmount, this.onContainerDidUnmount)
  }

  private onContainerDidMount = () => {
    this.isContainerMounted = true
  }

  private onContainerDidUnmount = () => {
    this.isContainerMounted = false
  }

  public generateNextToastId() {
    this.toastId = this.toastId + 1
    return this.toastId
  }

  show = (content: ToastFactoryFunction, options: IShowToastOptions) => {
    const showToastEventPayload = {
      content: content,
      options: {
        ...options,
        toastId: this.generateNextToastId()
      }
    }

    if (this.isContainerMounted) {
      this.eventManager.emit<IShowToastPayload>(EventType.Show, showToastEventPayload)
    } else {
      this.queue.push(showToastEventPayload)
    }
  }
}

export { ToastService }

const toastService = new ToastService(EventManager.getInstance())

export default toastService
