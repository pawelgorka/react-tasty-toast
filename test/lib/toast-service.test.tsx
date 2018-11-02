import * as React from 'react'

import { ToastService } from '../../src/lib/toast-service'
import { IEventManager } from '../../src/lib/event-manager/event-manager'
import { EventType } from '../../src/lib/events/events'
import { IToastOptions } from '../../src/lib/toast-options'
import Builder from '../helpers/builder'

describe('ToastService', () => {
  let toastService: ToastService
  let optionsBuilder: Builder<IToastOptions>
  let eventManagerBuilder: Builder<IEventManager>
  let eventManager: IEventManager

  beforeEach(() => {
    optionsBuilder = new Builder<IToastOptions>()
    optionsBuilder.with('autoClose', false)
    optionsBuilder.with('pauseOnHover', false)

    eventManagerBuilder = new Builder<IEventManager>()

    eventManagerBuilder.with('on', jest.fn())
    eventManagerBuilder.with('emit', jest.fn())
    eventManagerBuilder.with('off', jest.fn())

    eventManager = eventManagerBuilder.build()
    toastService = new ToastService(eventManager)
  })

  it('should return unique toast id from show method', () => {
    const toastId1 = toastService.show(() => <span>lorem</span>, optionsBuilder.build())
    const toastId2 = toastService.show(() => <span>lorem</span>, optionsBuilder.build())
    expect(toastId1).toBeDefined()
    expect(toastId2).toBeDefined()
    expect(toastId1).not.toEqual(toastId2)
  })

  it('should schedule show event if the toast container is not mounted yet', () => {
    toastService.show(() => <span>lorem</span>, optionsBuilder.with('autoClose', false).build())
    expect(eventManager.emit).not.toHaveBeenCalled()
    expect(toastService.queue.length).toBe(1)
  })

  it('should emit show event if the toast container is mounted', () => {
    eventManagerBuilder.with(
      'on',
      jest.fn().mockImplementation((eventType: EventType, callback) => {
        if (eventType === EventType.ContainerDidMount) {
          callback()
        }
      })
    )

    eventManager = eventManagerBuilder.build()
    toastService = new ToastService(eventManager)
    toastService.show(() => <span>lorem</span>, optionsBuilder.with('autoClose', false).build())

    expect(eventManager.emit).toHaveBeenNthCalledWith(
      1,
      EventType.Show,
      expect.objectContaining({
        options: expect.any(Object)
      })
    )

    expect(toastService.queue.length).toBe(0)
  })

  it('should dequeue all show events as soon as toast container is mounted', () => {
    let containerDidMountCallback: any = undefined

    eventManagerBuilder.with(
      'on',
      jest.fn().mockImplementation((eventType: EventType, callback) => {
        if (eventType === EventType.ContainerDidMount) {
          containerDidMountCallback = callback
        }
      })
    )

    eventManager = eventManagerBuilder.build()
    toastService = new ToastService(eventManager)

    toastService.show(() => <span>lorem 1 </span>, optionsBuilder.with('autoClose', false).build())
    toastService.show(() => <span>lorem 2 </span>, optionsBuilder.with('autoClose', false).build())

    expect(eventManager.emit).not.toHaveBeenCalled()
    expect(toastService.queue.length).toBe(2)

    containerDidMountCallback()

    expect(eventManager.emit).toHaveBeenCalledTimes(2)
    expect(toastService.queue.length).toBe(0)
  })

  it('should enqueue all new show requests events as soon as toast container is unmounted', () => {
    let containerDidUnmountCallback: any = undefined

    eventManagerBuilder.with(
      'on',
      jest.fn().mockImplementation((eventType: EventType, callback) => {
        if (eventType === EventType.ContainerDidUnmount) {
          containerDidUnmountCallback = callback
        } else if (eventType === EventType.ContainerDidMount) {
          callback()
        }
      })
    )

    eventManager = eventManagerBuilder.build()
    toastService = new ToastService(eventManager)
    toastService.show(() => <span>lorem 1 </span>, optionsBuilder.with('autoClose', false).build())

    expect(eventManager.emit).toHaveBeenCalledTimes(1)
    expect(toastService.queue.length).toBe(0)

    containerDidUnmountCallback()

    toastService.show(() => <span>lorem 2 </span>, optionsBuilder.with('autoClose', false).build())
    toastService.show(() => <span>lorem 3 </span>, optionsBuilder.with('autoClose', false).build())

    expect(toastService.queue.length).toBe(2)
  })

  it('should hide toast that has already been shown by passing toastId to hide method', () => {
    let eventManager = eventManagerBuilder.build()
    let toastService = new ToastService(eventManager)
    const toastId = toastService.show(() => <span>lorem</span>, optionsBuilder.build())
    expect(eventManager.emit).not.toHaveBeenCalled()
    toastService.hide(toastId)
    expect(eventManager.emit).toHaveBeenCalledTimes(1)
  })
})
