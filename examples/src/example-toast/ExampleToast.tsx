import * as React from 'react'

import './ExampleToast.css'

interface IExampleToast {
  onClose: () => void
}

const ExampleToast: React.SFC<IExampleToast> = ({ onClose, ...props }) => (
  <div className="example-toast__toast">
    <div role="alert" className="example-toast__toast-body">
      Simple Toast
    </div>
    <button
      className="example-toast__close-button"
      type="button"
      aria-label="close"
      onClick={onClose}
    >
      ✖
    </button>
  </div>
)

export default ExampleToast
