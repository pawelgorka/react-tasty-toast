import * as React from 'react'

import { shallow } from 'enzyme'

import Toast from '../../../src/lib/toast/Toast'

describe('A <Toast />', () => {
  it('should contain toast text', () => {
    const wrapper = shallow(<Toast />)
    expect(wrapper.text()).toContain('Toast Component')
  })
})
