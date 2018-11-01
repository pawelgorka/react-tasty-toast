import * as React from 'react'
import { once } from '../helpers/once'

interface IAutoCloseProps {
  delay: number
  isRunning: boolean
  close: () => void
}

const addKeyframesAnimation = once(() => {
  if (document === undefined) {
    return
  }

  let styleSheet = document.styleSheets[0]

  if (styleSheet === undefined) {
    return
  }

  let keyframes = `
    @keyframes ${animationName} {
      0%{
        width: 100%;
      }
      100% {
        width: 0;
      }
    }
  `

  if (typeof styleSheet !== 'object' || typeof (styleSheet as any).insertRule !== 'function') {
    return
  }

  ;(styleSheet as any).insertRule(keyframes, (styleSheet as any).cssRules.length)
})

const animationName = `toast-close-fake-tracking-animation`

class AutoClose extends React.Component<IAutoCloseProps> {
  componentDidMount() {
    addKeyframesAnimation()
  }

  render() {
    const { delay, isRunning, close } = this.props

    const style = {
      animationName: animationName,
      animationDuration: `${delay}ms`,
      animationPlayState: isRunning ? 'running' : 'paused'
    }

    return <div id="auto-close" style={style} onAnimationEnd={close} />
  }
}

export default AutoClose
