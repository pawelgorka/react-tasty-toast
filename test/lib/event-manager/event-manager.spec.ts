import EventManager, { IEventManager } from '../../../src/lib/event-manager/event-manager'
import { EventType } from '../../../src/lib/events/events'

jest.useFakeTimers()

type testEventPayload = {
  test: boolean
  lorem: string
}

// tslint:disable-next-line:no-empty
const noop = () => {}

describe('EventManager', () => {
  let eventManager: EventManager

  beforeEach(() => {
    eventManager = EventManager.getInstance()
    eventManager.clear()
  })

  it('Should be able to bind an event', () => {
    eventManager.on<testEventPayload>(EventType.Show, noop)
  })

  it('Should be able to emit event', () => {
    const cb = jest.fn()

    eventManager.on(EventType.Show, cb)
    expect(cb).not.toHaveBeenCalled()

    eventManager.emit<testEventPayload>(EventType.Show, { test: true, lorem: 'ipsum' })
    jest.runAllTimers()

    expect(cb).toHaveBeenCalled()
  })

  it('Should return false when trying to call unbound event', () => {
    const result = eventManager.emit<testEventPayload>(EventType.Show, {
      test: true,
      lorem: 'ipsum'
    })
    jest.runAllTimers()
    expect(result).toBe(false)
  })

  it('Should be able to remove event', () => {
    eventManager.on(EventType.Show, noop)
    eventManager.off(EventType.Show)
    const result = eventManager.emit<testEventPayload>(EventType.Show, {
      test: true,
      lorem: 'ipsum'
    })
    jest.runAllTimers()

    expect(result).toBe(false)
  })
})
