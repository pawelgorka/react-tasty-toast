export const fireAnimationEndEvent = (wrapper: any) => {
  const autoCloseElement = wrapper.find('#auto-close')
  expect(autoCloseElement.length).toEqual(1)
  autoCloseElement.simulate('animationEnd')
}
