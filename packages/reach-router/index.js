import Loader from '@just4dev/layouts/components/Loader'
import { Router } from '@reach/router'
import React, { Suspense } from 'react'

const Home = React.lazy(() => import('@just4dev/layouts/screens/Home'))

const Features = React.lazy(() => import('@just4dev/layouts/screens/Features'))
const FeatureForm = React.lazy(() =>
  import('@just4dev/layouts/forms/FeatureForm'),
)

const LoginForm = React.lazy(() => import('@just4dev/layouts/forms/LoginForm'))
const NotFound = React.lazy(() => import('@just4dev/layouts/screens/NotFound'))

const PostForm = React.lazy(() => import('@just4dev/layouts/forms/PostForm'))
const Post = React.lazy(() => import('@just4dev/layouts/screens/Post'))

const Categories = React.lazy(() =>
  import('@just4dev/layouts/forms/Categories'),
)

const Posts = React.lazy(() => import('@just4dev/layouts/screens/Posts'))

const routes = (
  <div>
    <Suspense fallback={<Loader />}>
      <Router>
        <Home path="/" />
        <Features path="features" />
        <Categories path="categories" />
        <LoginForm path="login" />
        <FeatureForm path="featureform/:id" />
        <FeatureForm path="featureform/" />
        <PostForm path="postform/:id" />
        <PostForm path="postform/" />
        <Posts path="Posts" />
        {/* <Post path="post/:id" /> */}
        <Home path="/:cat" />
        <Home path="/:cat/:subcat" />
        <Post path="/:cat/:subcat/:id" />
        <NotFound default />
      </Router>
    </Suspense>
  </div>
)

export default routes
