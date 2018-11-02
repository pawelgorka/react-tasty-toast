import * as React from 'react'

import { ToastService } from '../../src/lib/toast-service'
import { IEventManager } from '../../src/lib/event-manager/event-manager'
import { EventType } from '../../src/lib/events/events'
import ToastOptionsBuilder from './toast-options.builder'
import Builder from '../helpers/builder'

describe('ToastService', () => {
  let toastService: ToastService
  let eventManagerMock: IEventManager
  let optionsBuilder: ToastOptionsBuilder

  beforeEach(() => {
    optionsBuilder = new ToastOptionsBuilder()

    let EventManagerMock = jest.fn<IEventManager>(() => ({
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn()
    }))

    eventManagerMock = new EventManagerMock()

    toastService = new ToastService(eventManagerMock)
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
    expect(eventManagerMock.emit).not.toHaveBeenCalled()
    expect(toastService.queue.length).toBe(1)
  })

  it('should emit show event if the toast container is mounted', () => {
    let EventManagerMock = jest.fn<IEventManager>(() => ({
      emit: jest.fn(),
      on: jest.fn().mockImplementation((eventType: EventType, callback) => {
        if (eventType === EventType.ContainerDidMount) {
          callback()
        }
      }),
      off: jest.fn()
    }))

    eventManagerMock = new EventManagerMock()
    toastService = new ToastService(eventManagerMock)
    toastService.show(() => <span>lorem</span>, optionsBuilder.with('autoClose', false).build())

    expect(eventManagerMock.emit).toHaveBeenNthCalledWith(
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
    let EventManagerMock = jest.fn<IEventManager>(() => ({
      emit: jest.fn(),
      on: jest.fn().mockImplementation((eventType: EventType, cb) => {
        if (eventType === EventType.ContainerDidMount) {
          containerDidMountCallback = cb
        }
      }),
      off: jest.fn()
    }))

    eventManagerMock = new EventManagerMock()
    toastService = new ToastService(eventManagerMock)
    toastService.show(() => <span>lorem 1 </span>, optionsBuilder.with('autoClose', false).build())
    toastService.show(() => <span>lorem 2 </span>, optionsBuilder.with('autoClose', false).build())

    expect(eventManagerMock.emit).not.toHaveBeenCalled()
    expect(toastService.queue.length).toBe(2)

    containerDidMountCallback()

    expect(eventManagerMock.emit).toHaveBeenCalledTimes(2)
    expect(toastService.queue.length).toBe(0)
  })

  it('should enqueue all new show requests events as soon as toast container is unmounted', () => {
    let containerDidUnmountCallback: any = undefined
    let EventManagerMock = jest.fn<IEventManager>(() => ({
      emit: jest.fn(),
      on: jest.fn().mockImplementation((eventType: EventType, cb) => {
        if (eventType === EventType.ContainerDidUnmount) {
          containerDidUnmountCallback = cb
        } else if (eventType === EventType.ContainerDidMount) {
          cb()
        }
      }),
      off: jest.fn()
    }))

    eventManagerMock = new EventManagerMock()
    toastService = new ToastService(eventManagerMock)
    toastService.show(() => <span>lorem 1 </span>, optionsBuilder.with('autoClose', false).build())

    expect(eventManagerMock.emit).toHaveBeenCalledTimes(1)
    expect(toastService.queue.length).toBe(0)

    containerDidUnmountCallback()

    toastService.show(() => <span>lorem 2 </span>, optionsBuilder.with('autoClose', false).build())
    toastService.show(() => <span>lorem 3 </span>, optionsBuilder.with('autoClose', false).build())

    expect(toastService.queue.length).toBe(2)
  })

  it('should hide toast that has already been shown by passing toastId to hide method', () => {
    let emitMock = jest.fn()
    let offMock = jest.fn()
    let onMock = jest.fn()

    let eventManagerBuilder = new Builder<IEventManager>()
    eventManagerBuilder.with('emit', emitMock)
    eventManagerBuilder.with('off', emitMock)
    eventManagerBuilder.with('on', onMock)
    let eventManager = eventManagerBuilder.build()
    let toastService = new ToastService(eventManager)
    const toastId1 = toastService.show(() => <span>lorem</span>, optionsBuilder.build())
    expect(eventManager.emit).not.toHaveBeenCalled()
    toastService.hide(toastId1)
    expect(eventManager.emit).toHaveBeenCalledTimes(1)
  })
})
