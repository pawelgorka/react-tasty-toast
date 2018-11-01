import * as React from 'react'
import { IRenderProps } from '../toast.model'
import AutoClose from './AutoClose'

export interface IToastProps {
  autoClose: false | number
  close: () => void
  onOpen?: () => void
  children: (props: IRenderProps) => JSX.Element
}

class Toast extends React.Component<IToastProps> {
  componentDidMount() {
    if (this.props.onOpen !== undefined) {
      this.props.onOpen()
    }
  }

  private getRenderProps = (): IRenderProps => ({
    autoClose: this.props.autoClose,
    close: this.props.close
  })

  render() {
    const renderProps = this.getRenderProps()
    const { autoClose, close } = renderProps

    return (
      <React.Fragment>
        {this.props.children(this.getRenderProps())}
        {autoClose !== false && <AutoClose delay={autoClose} isRunning={true} close={close} />}
      </React.Fragment>
    )
  }
}

export default Toast
