import * as React from 'react'

import { ToastService } from '../../src/lib/toast-service'
import { IEventManager } from '../../src/lib/event-manager/event-manager'
import { EventType } from '../../src/lib/events/events'

describe('ToastService', () => {
  let toastService: ToastService
  let eventManagerMock: IEventManager

  beforeEach(() => {
    let EventManagerMock = jest.fn<IEventManager>(() => ({
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn()
    }))

    eventManagerMock = new EventManagerMock()

    toastService = new ToastService(eventManagerMock)
  })

  it('should schedule show event if the toast container is not mounted yet', () => {
    toastService.show(() => <span>lorem</span>, { autoClose: false })
    expect(eventManagerMock.emit).not.toHaveBeenCalled()
    expect(toastService.queue.length).toBe(1)
  })

  it('should emit show event if the toast container is mounted', () => {
    let EventManagerMock = jest.fn<IEventManager>(() => ({
      emit: jest.fn(),
      on: jest.fn().mockImplementationOnce((_: EventType, callback) => {
        callback()
      }),
      off: jest.fn()
    }))

    eventManagerMock = new EventManagerMock()
    toastService = new ToastService(eventManagerMock)
    toastService.show(() => <span>lorem</span>, { autoClose: false })

    expect(eventManagerMock.emit).toHaveBeenNthCalledWith(
      1,
      EventType.Show,
      expect.objectContaining({
        options: expect.any(Object)
      })
    )
    expect(toastService.queue.length).toBe(0)
  })
})
