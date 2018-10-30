import * as React from 'react'
import withEventManager, { IWithEventManagerInjectedProps } from '../hoc/withEventManager'
import { EventType, IShowToastPayload, IHideToastPayload } from '../events/events'
import { ToastFactoryFunction } from '../toast.model'
import Toast from '../toast/Toast'
import { IToastOptions } from '../toast-options'

export interface IToastContainerProps extends IWithEventManagerInjectedProps {}

interface IToastContainerState {
  toastIds: number[]
  toasts: { [toastId: number]: ToastFactoryFunction }
  options: { [toastId: number]: IToastOptions }
  close: { [toastId: number]: () => void }
}

class ToastContainer extends React.Component<IToastContainerProps, IToastContainerState> {
  constructor(props: IToastContainerProps) {
    super(props)

    this.state = {
      toastIds: [],
      toasts: {},
      options: {},
      close: {}
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
      toasts: { ...state.toasts, [toastId]: content },
      options: { ...state.options, [toastId]: options },
      close: {
        ...state.close,
        [toastId]: () => {
          this.onHideToast({ toastId })
        }
      }
    }))
  }

  onHideToast(hideEventPayload: IHideToastPayload) {
    const { toastId } = hideEventPayload
    this.setState(state => {
      const { toastIds, toasts, options, close } = state
      const { [toastId]: toast, ...restToasts } = toasts
      const { [toastId]: option, ...restOptions } = options
      const { [toastId]: closeFn, ...restClose } = close

      return {
        ...state,
        toastIds: toastIds.filter(tId => tId !== toastId),
        toasts: restToasts,
        options: restOptions,
        close: restClose
      }
    })
  }

  getToastContainerStyles = (): React.CSSProperties => {
    return {
      position: 'fixed',
      top: 0,
      right: 0
    }
  }

  render() {
    const { toastIds, toasts, options, close } = this.state

    return (
      <div style={this.getToastContainerStyles()}>
        {toastIds.map(toastId => {
          const toastOptions = options[toastId]
          const closeToast = close[toastId]
          return (
            <Toast key={toastId} autoClose={toastOptions.autoClose} close={closeToast}>
              {toasts[toastId]}
            </Toast>
          )
        })}
      </div>
    )
  }
}

export { ToastContainer }

export default withEventManager<IToastContainerProps>(ToastContainer)
