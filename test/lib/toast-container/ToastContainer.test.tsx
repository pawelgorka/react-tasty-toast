import * as React from 'react'
import { mount } from 'enzyme'
import { ToastContainer } from '../../../src/lib/toast-container/ToastContainer'
import { IEventManager } from '../../../src/lib/event-manager/event-manager'
import withEventManager from '../../../src/lib/hoc/withEventManager'

const getToastContainerComponent = (eventManager: IEventManager) => {
  return withEventManager(ToastContainer, eventManager)
}

describe('A <ToastContainer />', () => {
  let EventManagerMock: jest.Mock<IEventManager>

  beforeEach(() => {
    EventManagerMock = jest.fn<IEventManager>(() => ({
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn()
    }))
  })

  it('should emit ToastContainerMounted event on mount', () => {
    const eventManagerMock = new EventManagerMock()
    const ToastContainerComponent = getToastContainerComponent(eventManagerMock)
    const wrapper = mount(<ToastContainerComponent />)
    expect(eventManagerMock.emit).toHaveBeenCalledTimes(1)
  })
})
