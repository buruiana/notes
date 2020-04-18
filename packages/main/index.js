import GenericModal from '@just4dev/layouts/screens/GenericModal'
import store from '@just4dev/redux-store'
import { featureActions } from '@just4dev/services'
import Container from '@material-ui/core/Container'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Footer from './components/Footer'
import Main from './screens/Main'
import './styles.scss'

const theme = createMuiTheme({})
const notesStore = store()
notesStore.dispatch(
  featureActions.handleFeatures({
    operation: 'read',
    modelType: 'feature',
    query: {},
  }),
)

render(
  <Provider store={notesStore}>
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Main />
        <Footer />
        <GenericModal />
      </Container>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
)
