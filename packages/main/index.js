import Footer from '@just4dev/front/components/Footer'
import GenericModal from '@just4dev/front/screens/GenericModal'
import store from '@just4dev/redux-store'
import {
  categoryActions,
  featureActions,
  postActions,
} from '@just4dev/services'
import Container from '@material-ui/core/Container'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import './assets/css/material-dashboard-react.css'
import Main from './screens/Main'

const theme = createMuiTheme({})
const notesStore = store()
notesStore.dispatch(
  featureActions.handleFeatures({
    operation: 'read',
    modelType: 'feature',
    query: {},
  }),
)
notesStore.dispatch(
  categoryActions.handleCategories({
    operation: 'read',
    modelType: 'category',
    query: {},
  }),
)
notesStore.dispatch(
  postActions.getTotalsByCategory({
    operation: 'totalsByCategory',
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
