import * as React from 'react'

import { TastyToastContainer, tastyToastService } from 'react-tasty-toast'
import ExampleToast from './example-toast/ExampleToast'

class App extends React.Component {
  public handleShowToastButtonClick = () => {
    tastyToastService.show(({ close }) => <ExampleToast onClose={close} />, { autoClose: false })
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p>
          <button onClick={this.handleShowToastButtonClick}>showToast</button>
        </p>
        <TastyToastContainer />
      </div>
    )
  }
}

export default App
