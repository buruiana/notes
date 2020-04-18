import { postActions, postSelectors } from '@just4dev/services'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainHeader from '../components/MainHeader'
import MorePosts from '../components/MorePosts'
import Pagination from '../components/Pagination'
import PostList from '../components/PostList'

const Home = () => {
  const dispatch = useDispatch()
  const posts = useSelector(postSelectors.postSelector) || []
  const total = useSelector(postSelectors.postTotalSelector) || 0

  const showPagination = posts.length < total

  useEffect(() => {
    dispatch(
      postActions.handlePosts({
        operation: 'read',
        modelType: 'post',
        info: {
          skip: 0,
          limit: 3,
        },
        query: {},
      }),
    )
  }, [])

  const onClickMore = () => {
    dispatch(
      postActions.handlePosts({
        operation: 'read',
        modelType: 'post',
        info: {
          skip: posts.length,
          limit: 3,
        },
        query: {},
      }),
    )
  }

  return (
    <Container maxWidth="xl">
      <Grid item xs={12}>
        <MainHeader />
        <PostList posts={posts} />
        {showPagination && <Pagination onClickMore={onClickMore} />}
        <MorePosts />
      </Grid>
    </Container>
  )
}

export default Home
