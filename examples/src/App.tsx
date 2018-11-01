import * as React from 'react'

import { ToastContainer, toastService } from 'react-tasty-toast'
import { IShowToastOptions } from '../../dist/types/lib/toast-options'
import ExampleToast from './example-toast/ExampleToast'

// tslint:disable-next-line:no-empty-interface
interface IAppProps {}

interface IAppState {
  autoClose: number
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props)

    this.state = {
      autoClose: 0
    }
  }

  public handleShowToastButtonClick = () => {
    const { autoClose } = this.state

    const toastOptions: IShowToastOptions = {
      autoClose: autoClose === 0 ? false : autoClose
    }

    toastService.show(({ close }) => <ExampleToast onClose={close} />, toastOptions)
  }

  public handleAutoCloseInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const autoClose = +event.target.value
    this.setState(prev => ({ ...prev, autoClose }))
  }

  public handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    this.handleShowToastButtonClick()
  }

  public render() {
    const { autoClose } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <input
              id="autoclose"
              type="number"
              value={autoClose}
              onChange={this.handleAutoCloseInputChange}
            />
            <label htmlFor="autoclose">auto close</label>
            <button type="submit">show toast</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    )
  }
}

export default App
