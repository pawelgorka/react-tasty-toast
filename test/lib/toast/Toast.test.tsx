import * as React from 'react'

import { mount } from 'enzyme'

import { Omit } from '../../../src/lib/helpers/ts-helpers'
import { IRenderProps } from '../../../src/lib/toast.model'
import Toast, { IToastProps } from '../../../src/lib/toast/Toast'

const getToastComponent = (
  toastProps: Partial<Omit<IToastProps, 'children'>>,
  renderProp?: (props: IRenderProps) => JSX.Element
) => {
  const defaultProps: Omit<IToastProps, 'children'> = {
    autoClose: false,
    close: () => {
      return
    }
  }

  const props: Omit<IToastProps, 'children'> = {
    ...toastProps,
    ...defaultProps
  }

  return (
    <Toast {...props}>
      {renderProp === undefined
        ? () => {
            return <span />
          }
        : renderProp}
    </Toast>
  )
}

describe('A <Toast />', () => {
  it('should pass props to render prop function', () => {
    const wrap = mount(
      getToastComponent({}, ({ close }) => {
        return <span>lorem</span>
      })
    )

    expect(wrap.text()).toContain('lorem')
  })

  it('should call onOpen callback when component mounts', () => {
    const cb = jest.fn()
    mount(getToastComponent({ onOpen: cb }))
    expect(cb).toHaveBeenCalledTimes(1)
  })
})
