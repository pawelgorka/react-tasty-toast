import * as React from 'react'
import { mount } from 'enzyme'
import { ToastContainer } from '../../../src/lib/toast-container/ToastContainer'
import { IEventManager } from '../../../src/lib/event-manager/event-manager'
import withEventManager from '../../../src/lib/hoc/withEventManager'
import { EventType, IShowToastPayload } from '../../../src/lib/events/events'
import ToastOptionsBuilder from '../toast-options.builder'

const getToastContainerComponent = (eventManager: IEventManager) => {
  return withEventManager(ToastContainer, eventManager)
}

describe('A <ToastContainer />', () => {
  let EventManagerMock: jest.Mock<IEventManager>
  let eventManagerMock: IEventManager
  let onMountCallback: () => void
  let onUnmountCallback: () => void
  let onShowToastCallback: (showToastPayload: IShowToastPayload) => void
  let optionsBuilder: ToastOptionsBuilder

  beforeEach(() => {
    EventManagerMock = jest.fn<IEventManager>(() => ({
      emit: jest.fn(),
      on: jest.fn().mockImplementation((eventType: EventType, callback) => {
        if (eventType === EventType.ContainerDidMount) {
          onMountCallback = callback
        } else if (eventType === EventType.ContainerDidUnmount) {
          onUnmountCallback = callback
        } else if (eventType === EventType.Show) {
          onShowToastCallback = callback
        }
      }),
      off: jest.fn()
    }))

    eventManagerMock = new EventManagerMock()

    optionsBuilder = new ToastOptionsBuilder()
  })

  it('should emit ToastContainerMounted event on mount', () => {
    const ToastContainerComponent = getToastContainerComponent(eventManagerMock)
    mount(<ToastContainerComponent />)
    expect(eventManagerMock.emit).toHaveBeenCalledTimes(1)
  })

  it('should render Toast Component on show toast event', () => {
    const ToastContainerComponent = getToastContainerComponent(eventManagerMock)
    const wrapper = mount(<ToastContainerComponent />)

    onShowToastCallback({
      content: () => <span>lorem 1</span>,
      options: { autoClose: false, toastId: 1, pauseOnHover: false }
    })

    expect(wrapper.text()).toContain('lorem 1')
  })

  it('should pass close callback as a render prop and this callback should remove Toast', () => {
    const ToastContainerComponent = getToastContainerComponent(eventManagerMock)
    const wrapper = mount(<ToastContainerComponent />)

    onShowToastCallback({
      content: ({ close }) => (
        <div>
          <button className="close-button" onClick={close}>
            click to close toast
          </button>
        </div>
      ),
      options: { ...optionsBuilder.with('autoClose', false).build(), toastId: 1 }
    })

    wrapper.update()

    const button = wrapper.find('.close-button')
    expect(button.length).toEqual(1)
    button.simulate('click')

    wrapper.update()

    expect(wrapper.text()).not.toContain('click to close toast')
  })
})
