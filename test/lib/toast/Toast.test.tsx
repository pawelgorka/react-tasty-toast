import * as React from 'react'
import { mount } from 'enzyme'

import { Omit } from '../../../src/lib/helpers/ts-helpers'
import { fireAnimationEndEvent } from '../../test-helpers'
import Toast, { IToastProps } from '../../../src/lib/toast/Toast'
import { ToastFactoryFunction } from '../../../src/lib/toast.model'
import Builder from '../../helpers/builder'

const getToastComponent = (
  toastProps: Partial<Omit<IToastProps, 'children'>>,
  renderProp?: ToastFactoryFunction
) => {
  const defaultProps: Omit<IToastProps, 'children'> = {
    autoClose: false,
    pauseOnHover: false,
    onOpen: () => {
      return
    },
    close: () => {
      return
    }
  }

  const props: Omit<IToastProps, 'children'> = {
    ...defaultProps,
    ...toastProps
  }

  return <Toast {...props}>{renderProp === undefined ? () => <span /> : renderProp}</Toast>
}

describe('A <Toast />', () => {
  let props: Builder<IToastProps>

  beforeEach(() => {
    props = new Builder<IToastProps>()
  })

  it('should pass props to render prop function', () => {
    const wrap = mount(
      getToastComponent(props.build(), () => {
        return <span>lorem</span>
      })
    )

    expect(wrap.text()).toContain('lorem')
  })

  it('should call onOpen callback when component mounts', () => {
    const cb = jest.fn()
    mount(getToastComponent(props.with('onOpen', cb).build()))
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('should call close after toast autoClose duration elapses', async () => {
    const cb = jest.fn()
    const wrapper = mount(
      getToastComponent(
        props
          .with('close', cb)
          .with('autoClose', 200)
          .build()
      )
    )
    expect(cb).not.toHaveBeenCalled()
    fireAnimationEndEvent(wrapper)
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('should pass isRunning as false when the user hovers mouse over toast component', async () => {
    const wrapper = mount(
      getToastComponent(
        props
          .with('pauseOnHover', true)
          .with('autoClose', 200)
          .build(),
        ({ isRunning }) => {
          return <span id="test-id">is running: {isRunning ? 'true' : 'false'}</span>
        }
      )
    )

    const toast = wrapper.find('div').first()
    expect(toast.exists).toBeTruthy()
    expect(wrapper.html()).toContain('is running: true')
    toast.simulate('mouseEnter')
    expect(wrapper.html()).toContain('is running: false')
  })
})
