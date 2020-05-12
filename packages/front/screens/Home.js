import { postActions } from '@just4dev/services'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import React, { useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import Pagination from '../components/Pagination'
import PostList from '../components/PostList'
import SimilarPosts from '../components/SimilarPosts'
import { useCategories } from '../hooks/useCategories'
import { useFeatures } from '../hooks/useFeatures'
import { usePosts } from '../hooks/usePosts'
import { useSearch } from '../hooks/useSearch'

const limit = 20

const Home = ({ cat, subcat, q }) => {
  const dispatch = useDispatch()

  useSearch({ q })

  const { posts, total } = usePosts({ cat, subcat, q })
  const { similarpostsFeature } = useFeatures()
  const { categories, meta } = useCategories({ cat, subcat })

  const prefix = cat && subcat ? 'sub' : ''
  const showPagination = posts.length < total

  const onClickMore = useCallback(() => {
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
  }, [posts.length])

  const getMeta = (type) => meta[`${prefix}${type}`] || ''

  return (
    <Container maxWidth="xl">
      <Helmet>
        <meta charSet={getMeta('categoryMetaCharset')} />
        <meta name="description" content={getMeta('categoryMetaDescription')} />
        <meta name="keywords" content={getMeta('categoryMetaKeywords')} />
        <meta name="robots" content={getMeta('categoryMetaRobots')} />
        <meta name="viewport" content={getMeta('categoryMetaViewport')} />
        <title>{getMeta('categoryMetaTitle')}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Grid item xs={12}>
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
