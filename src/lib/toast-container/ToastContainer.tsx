import * as React from 'react'
import withEventManager, { IWithEventManagerInjectedProps } from '../hoc/withEventManager'
import { EventType, IShowToastPayload } from '../events/events'
import { ToastFactoryFunction } from '../toast.model'

export interface IToastContainerProps extends IWithEventManagerInjectedProps {}

interface IToastContainerState {
  toastIds: number[]
  toasts: { [toastId: number]: ToastFactoryFunction }
}

class ToastContainer extends React.Component<IToastContainerProps, IToastContainerState> {
  constructor(props: IToastContainerProps) {
    super(props)

    this.state = {
      toastIds: [],
      toasts: {}
    }
  }

  componentDidMount() {
    this.props.eventManager.on(EventType.Show, this.onShowToast.bind(this))
    this.props.eventManager.emit(EventType.ContainerDidMount, undefined)
  }

  componentWillUnmount() {
    this.props.eventManager.emit(EventType.ContainerDidUnmount, undefined)
  }

  onShowToast(showEventPayload: IShowToastPayload) {
    const { content, options } = showEventPayload

    const toastId = options.toastId

    this.setState(state => ({
      ...state,
      toastIds: [...state.toastIds, toastId],
      toasts: { ...state.toasts, [toastId]: content }
    }))
  }

  render() {
    const { toastIds, toasts } = this.state
    return (
      <div>
        {toastIds.map(toastId => {
          return <React.Fragment key={toastId}>{toasts[toastId]()}</React.Fragment>
        })}
      </div>
    )
  }
}

export { ToastContainer }

export default withEventManager<IToastContainerProps>(ToastContainer)
