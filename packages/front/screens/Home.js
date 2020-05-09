import {
  categorySelectors,
  featureSelectors,
  postActions,
} from '@just4dev/services'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import MainHeader from '../components/MainHeader'
import Pagination from '../components/Pagination'
import PostList from '../components/PostList'
import SimilarPosts from '../components/SimilarPosts'
import { usePosts } from '../hooks/usePosts'

const limit = 20

const Home = ({ cat, subcat, q }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (q) {
      dispatch(
        postActions.search({
          operation: 'search',
          modelType: 'post',
          info: {
            search: q,
          },
          query: {},
        }),
      )
    }
  }, [q])

  const { posts, total } = usePosts({ cat, subcat, q })

  const similarpostsFeature =
    useSelector(featureSelectors.featuresByNameSelector)('similar_posts') || {}
  const { categories = [] } = useSelector(
    categorySelectors.categorySelector,
  ) || { categories: [] }

  const showPagination = posts.length < total

  const onClickMore = () => {
    dispatch(
      postActions.handlePosts({
        operation: 'read',
        modelType: 'post',
        info: {
          skip: posts.length,
          limit,
        },
        query: {},
      }),
    )
  }

  return (
    <Container maxWidth="xl">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Grid item xs={12}>
        <MainHeader />
        <PostList
          posts={posts}
          cat={cat}
          subcat={subcat}
          categories={categories}
        />
        {showPagination && <Pagination onClickMore={onClickMore} />}
        {similarpostsFeature.active && <SimilarPosts />}
      </Grid>
    </Container>
  )
}

export default Home
