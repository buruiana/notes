import Loader from '@just4dev/layouts/components/Loader'
import { Router } from '@reach/router'
import React, { Suspense } from 'react'

const Home = React.lazy(() => import('@just4dev/layouts/screens/Home'))
const LoginForm = React.lazy(() => import('@just4dev/layouts/forms/LoginForm'))
const NotFound = React.lazy(() => import('@just4dev/layouts/screens/NotFound'))
const PostForm = React.lazy(() => import('@just4dev/layouts/forms/PostForm'))
const Post = React.lazy(() => import('@just4dev/layouts/screens/Post'))
const AdminPostList = React.lazy(() =>
  import('@just4dev/layouts/screens/AdminPostList'),
)

const routes = (
  <div>
    <Suspense fallback={<Loader />}>
      <Router>
        <Home path="/" />
        <LoginForm path="login" />
        <PostForm path="postform/:id" />
        <PostForm path="postform/" />
        <AdminPostList path="adminpostlist" />
        <Post path="post/:id" />
        <NotFound default />
      </Router>
    </Suspense>
  </div>
)

export default routes
