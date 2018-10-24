import * as React from 'react'
import withEventManager, { IWithEventManagerInjectedProps } from '../hoc/withEventManager'
import { EventType, IShowToastPayload } from '../events/events'

export interface IToastContainerProps extends IWithEventManagerInjectedProps {}

interface IToastContainerState {
  toastIds: number[]
}

class ToastContainer extends React.Component<IToastContainerProps, IToastContainerState> {
  constructor(props: IToastContainerProps) {
    super(props)

    this.state = {
      toastIds: []
    }
  }

  componentDidMount() {
    this.props.eventManager
      .emit(EventType.ContainerDidMount, undefined)
  }

  componentWillUnmount() {
    this.props.eventManager
      .emit(EventType.ContainerDidUnmount, undefined);
  }

  showToast(showEventPayload: IShowToastPayload) {
    const { content, options } = showEventPayload

    const toastId = options.toastId

    this.setState(state => ({ ...state, toastIds: [...state.toastIds, toastId] }))
  }

  render() {
    return <div />
  }
}

export { ToastContainer }

export default withEventManager<IToastContainerProps>(ToastContainer)
