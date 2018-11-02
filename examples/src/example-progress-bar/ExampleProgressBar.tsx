import * as React from 'react'

import './example-progress-bar.css'

// tslint:disable-next-line:no-empty-interface
interface IExampleProgressBarProps {
  isVisible: boolean
  isRunning: boolean | null
  duration: number
}

class ExampleProgressBar extends React.Component<IExampleProgressBarProps> {
  public render() {
    // tslint:disable-next-line:no-console
    console.log(this.props)

    const { duration, isRunning } = this.props

    const style = {
      animationDuration: `${duration}ms`,
      animationPlayState: isRunning ? 'running' : 'paused',
      opacity: 1
    }

    return <div className={'Example__progress-bar'} style={style} />
  }
}

export default ExampleProgressBar
