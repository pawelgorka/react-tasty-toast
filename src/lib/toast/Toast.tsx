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

  private getRenderProps = () => {
    return {
      autoClose: this.props.autoClose,
      // tslint:disable-next-line:no-empty
      close: this.props.close
    }
  }

  render() {
    return this.props.children(this.getRenderProps())
  }
}

export default Toast
