import * as React from 'react'
import { IRenderProps } from '../toast.model'
import AutoClose from './AutoClose'

export interface IToastProps {
  autoClose: false | number
  pauseOnHover: boolean
  closeOnClick: boolean
  close: () => void
  onOpen?: () => void
  children: (props: IRenderProps) => JSX.Element
}

interface IToastState {
  isRunning: boolean
}

interface IToastContainerProps {
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

class Toast extends React.Component<IToastProps, IToastState> {
  constructor(props: IToastProps) {
    super(props)

    this.state = {
      isRunning: true
    }
  }

  componentDidMount() {
    if (this.props.onOpen !== undefined) {
      this.props.onOpen()
    }
  }

  private getRenderProps = (): IRenderProps => ({
    autoClose: this.props.autoClose,
    close: this.props.close,
    closeOnClick: this.props.closeOnClick,
    isRunning: this.props.autoClose ? this.state.isRunning : null,
    pauseOnHover: this.props.pauseOnHover
  })

  pauseToast = () => {
    if (this.props.autoClose) {
      this.setState({ isRunning: false })
    }
  }

  playToast = () => {
    if (this.props.autoClose) {
      this.setState({ isRunning: true })
    }
  }

  render() {
    const renderProps = this.getRenderProps()
    const { autoClose, close, pauseOnHover, closeOnClick } = renderProps
    const { isRunning } = this.state

    let toastContainerProps: IToastContainerProps = {}

    if (autoClose && pauseOnHover) {
      toastContainerProps.onMouseEnter = this.pauseToast
      toastContainerProps.onMouseLeave = this.playToast
    }

    if (closeOnClick) {
      toastContainerProps.onClick = close
    }

    return (
      <div {...toastContainerProps}>
        {this.props.children(this.getRenderProps())}
        {autoClose !== false && <AutoClose delay={autoClose} isRunning={isRunning} close={close} />}
      </div>
    )
  }
}

export default Toast
