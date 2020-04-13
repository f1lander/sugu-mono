import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import saga from './sagas/'
import Main from './layouts/main'
import { sagaMiddleware } from './middleware'

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)

export default App

sagaMiddleware.run(saga)