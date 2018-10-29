import * as React from 'react'
import { IRenderProps } from '../toast.model'

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
    autoClose: false,
    close: this.props.close
  })

  getWrapperStyles = (): React.CSSProperties => {
    return {
      position: 'fixed',
      right: 0,
      top: 0
    }
  }

  render() {
    return <div style={this.getWrapperStyles()}>{this.props.children(this.getRenderProps())}</div>
  }
}

export default Toast
