import * as React from 'react'

export interface InjectedToastProps {
  close: () => void
}

export interface IToastProps {
  autoClose: false | number
  onOpen?: () => void
  children: (props: InjectedToastProps) => JSX.Element
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
      close: () => {}
    }
  }

  render() {
    return this.props.children(this.getRenderProps())
  }
}

export default Toast
