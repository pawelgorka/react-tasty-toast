import * as React from 'react'
import EventManager, { IEventManager } from '../event-manager/event-manager'
import { Subtract } from '../helpers/ts-helpers'

export interface IWithEventManagerInjectedProps {
  eventManager: IEventManager
}

const withEventManager = <P extends IWithEventManagerInjectedProps>(
  InnerComponent: React.ComponentType<P>,
  eventManager: IEventManager = EventManager.getInstance()
) => {
  return class WithEventManager extends React.Component<
    Subtract<P, IWithEventManagerInjectedProps>
  > {
    render() {
      return <InnerComponent {...this.props} eventManager={eventManager} />
    }
  }
}

export default withEventManager
