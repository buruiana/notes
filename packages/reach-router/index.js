import Loader from '@just4dev/front/components/Loader'
import { featureSelectors } from '@just4dev/services'
import { createHistory, Router } from '@reach/router'
import React, { Suspense, useEffect } from 'react'
import ReactGA from 'react-ga'
import { useSelector } from 'react-redux'

const Home = React.lazy(() => import('@just4dev/front/screens/Home'))

const Features = React.lazy(() => import('@just4dev/front/screens/Features'))
const FeatureForm = React.lazy(() =>
  import('@just4dev/front/forms/FeatureForm'),
)

const LoginForm = React.lazy(() => import('@just4dev/front/forms/LoginForm'))
const NotFound = React.lazy(() => import('@just4dev/front/screens/NotFound'))

const PostForm = React.lazy(() => import('@just4dev/front/forms/PostForm'))
const Post = React.lazy(() => import('@just4dev/front/screens/Post'))

const Categories = React.lazy(() => import('@just4dev/front/forms/Categories'))

const Posts = React.lazy(() => import('@just4dev/front/screens/Posts'))

let history = createHistory(window)
history.listen((location) => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

const routes = () => {
  const gaFeature =
    useSelector(featureSelectors.featuresByNameSelector)('ga') || {}

  useEffect(() => {
    if (gaFeature.active) {
      ReactGA.initialize('UA-000000-01', {
        debug: true,
        titleCase: false,
        gaOptions: {
          userId: 123,
        },
      })
    }
  }, [gaFeature])
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Router>
          <Home path="/" />
          <NotFound default path="notfound" />
          <Features path="aFeatures" />
          <Categories path="aCategories" />
          <LoginForm path="login" />
          <FeatureForm path="featureform/:id" />
          <FeatureForm path="featureform/" />
          <PostForm path="postform/:id" />
          <PostForm path="postform/" />
          <Posts path="aPosts" />
          <Home path="/search/:q" />
          <Home path="/:cat" />
          <Home path="/:cat/:subcat" />
          <Post path="/:cat/:subcat/:id" />
        </Router>
      </Suspense>
    </div>
  )
}

export default routes
