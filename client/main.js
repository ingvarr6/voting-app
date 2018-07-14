import React from 'react'
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import './assets/styles/style.css'
import App from './components/App'

const renderApp = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('mount-point')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./components/App', () => { renderApp(App) })
}
