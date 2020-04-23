import {
  featureSelectors,
  postActions,
  postSelectors,
} from '@just4dev/services'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainHeader from '../components/MainHeader'
import MorePosts from '../components/MorePosts'
import Pagination from '../components/Pagination'
import PostList from '../components/PostList'

const Home = ({ cat, subcat }) => {
  const dispatch = useDispatch()
  let posts = []
  let total = 0

  if (subcat) {
    posts = useSelector(postSelectors.postByCatSubCat)(cat, subcat) || []
    total = useSelector(postSelectors.postTotalSelector) || 0
  } else if (cat) {
    posts = useSelector(postSelectors.postByCat)(cat) || []
    total = useSelector(postSelectors.postTotalSelector) || 0
  } else {
    posts = useSelector(postSelectors.postSelector) || []
    total = useSelector(postSelectors.postTotalSelector) || 0
  }

  console.log('########## posts', posts)

  const morepostsFeature =
    useSelector(featureSelectors.featuresByNameSelector)('moreposts') || {}

  const showPagination = posts.length < total

  useEffect(() => {
    dispatch(
      postActions.handlePosts({
        operation: 'read',
        modelType: 'post',
        info: {
          skip: 0,
          limit: 10,
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
          limit: 10,
        },
        query: {},
      }),
    )
  }

  return (
    <Container maxWidth="xl">
      <Grid item xs={12}>
        <MainHeader />
        <PostList posts={posts} cat={cat} subcat={subcat} />
        {showPagination && <Pagination onClickMore={onClickMore} />}
        {morepostsFeature.status && <MorePosts />}
      </Grid>
    </Container>
  )
}

export default Home
