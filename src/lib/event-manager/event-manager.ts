import { EventType } from '../events/events'

export interface IEventManager {
  emit<T>(eventType: EventType, eventPayload: T): boolean
  on<T>(eventType: EventType, callback: (eventPayload: T) => void): IEventManager
  off(eventType: EventType): IEventManager
}

class EventManager implements IEventManager {
  private static instance: EventManager

  private list = new Map<EventType, ((arg: any) => void)[]>()

  private constructor() {}

  static getInstance() {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager()
    }

    return EventManager.instance
  }

  emit<T>(eventType: EventType, eventPayload: T) {
    if (!this.list.has(eventType)) {
      return false
    }

    const listeners = this.list.get(eventType)

    if (listeners !== undefined) {
      listeners.forEach(callback => setTimeout(() => callback.call(null, eventPayload), 0))
    }

    return true
  }

  on<T>(eventType: EventType, callback: (eventPayload: T) => void) {
    if (!this.list.has(eventType)) {
      this.list.set(eventType, [])
    }

    const callbacks = this.list.get(eventType)

    if (callbacks !== undefined) {
      callbacks.push(callback)
    }

    return this
  }

  off(eventType: EventType) {
    this.list.delete(eventType)
    return this
  }

  clear() {
    this.list.clear()
    return this
  }
}

export default EventManager
