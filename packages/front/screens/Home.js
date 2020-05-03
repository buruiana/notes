import {
  categorySelectors,
  featureSelectors,
  postActions,
  postSelectors,
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

const limit = 2

const Home = ({ cat, subcat }) => {
  const dispatch = useDispatch()
  const catId = cat ? useSelector(categorySelectors.idByCatTitle)(cat) : ''

  const subcatId =
    cat && subcat
      ? useSelector(categorySelectors.idByCatSubCatTitle)(cat, subcat)
      : ''
  let posts = []
  let total = 0

  if (subcatId) {
    posts = useSelector(postSelectors.postByCatSubCat)(catId, subcatId) || []
    total = useSelector(postSelectors.totalsCatSubCat)({ catId, subcatId })
  } else if (catId) {
    posts = useSelector(postSelectors.postByCat)(catId) || []
    total = useSelector(postSelectors.totalsCatSubCat)({ catId })
  } else {
    posts = useSelector(postSelectors.postSelector) || []
    total = useSelector(postSelectors.totalsCatSubCat)({})
  }

  const similarpostsFeature =
    useSelector(featureSelectors.featuresByNameSelector)('similar_posts') || {}
  const { categories = [] } = useSelector(categorySelectors.categorySelector)

  const showPagination = posts.length < total

  useEffect(() => {
    if (!posts.length)
      dispatch(
        postActions.handlePosts({
          operation: 'read',
          modelType: 'post',
          info: {
            skip: 0,
            limit,
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
