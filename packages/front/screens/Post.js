import {
  categorySelectors,
  commentActions,
  commentSelectors,
  featureSelectors,
  likeActions,
  likeSelectors,
  postActions,
  postSelectors,
} from '@just4dev/services'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import { convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import get from 'lodash/get'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../comp/Card/Card.js'
import CardBody from '../comp/Card/CardBody.js'
import CardHeader from '../comp/Card/CardHeader.js'
import Breadcrumb from '../components/Breadcrumb'
import CommentsList from '../components/CommentsList'
import Keywords from '../components/Keywords'
import Likes from '../components/Likes'
import CommentForm from '../forms/CommentForm'
import { getCategoryName } from '../utils/common'

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
}

const useStyles = makeStyles(styles)
const Post = ({ id }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [comment, setComment] = useState(false)
  const likeFeature =
    useSelector(featureSelectors.featuresByNameSelector)('like') || {}
  const commentFeature =
    useSelector(featureSelectors.featuresByNameSelector)('comment') || {}
  const post = useSelector(postSelectors.postByPostUrlSelector)(id) || {}
  const {
    title,
    content,
    datetime,
    _id: postId,
    category,
    subcategory,
    keywords,
  } = post
  const likes = get(
    useSelector(likeSelectors.likesByPostIdSelector)(postId),
    '[0]',
    {
      postId,
      count: 0,
    },
  )
  const comments =
    useSelector(commentSelectors.commentsByPostIdSelector)(postId) || []
  const { categories = [] } = useSelector(categorySelectors.categorySelector)

  useEffect(() => {
    if (!post._id) {
      dispatch(
        postActions.handlePosts({
          operation: 'read',
          modelType: 'post',
          query: { postUrl: id },
        }),
      )
    }
  }, [post._id])

  useEffect(() => {
    if (postId) {
      dispatch(
        likeActions.handleLikes({
          operation: 'read',
          modelType: 'like',
          query: { postId },
        }),
      )
      dispatch(
        commentActions.handleComments({
          operation: 'read',
          modelType: 'comment',
          query: { postId },
        }),
      )
      dispatch(
        postActions.handlePosts({
          operation: 'read',
          modelType: 'post',
          query: {
            datetime: {
              $lte: datetime,
            },
          },
        }),
      )
    }
  }, [postId])

  const onLikeClick = () =>
    dispatch(
      likeActions.handleLikes({
        operation: likes._id ? 'update' : 'create',
        modelType: 'like',
        info: {
          postId,
          count: parseInt(likes.count) + 1,
        },
        query: { _id: likes._id },
      }),
    )

  const { categoryTitle, subcategoryTitle } = getCategoryName({
    category,
    subcategory,
    categories,
  })

  const renderPost = () => {
    return (
      <Card key={postId} className="noShadow">
        <CardHeader color="primary" className="noShadow">
          <h4 className={classes.cardTitleWhite}>{title}</h4>
          <Breadcrumb category={categoryTitle} subcategory={subcategoryTitle} />
        </CardHeader>
        <CardBody>
          {content && (
            <div
              dangerouslySetInnerHTML={{
                __html: stateToHTML(convertFromRaw(JSON.parse(content))),
              }}
            />
          )}
          <div>
            <Keywords keywords={keywords} />
          </div>
        </CardBody>
      </Card>
    )
  }

  const onDeleteComment = (_id) =>
    dispatch(
      commentActions.handleComments({
        operation: 'deleteOne',
        modelType: 'comment',
        info: { query: { _id } },
      }),
    )

  const showCommentsBlock = () => {
    if (comment) {
      return (
        <>
          <div className="commentBox">
            <CommentForm postId={postId} />
          </div>
          <CommentsList comments={comments} onDeleteComment={onDeleteComment} />
        </>
      )
    }
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {renderPost()}
      <div className="date-more">
        <span>{new Date(datetime).toDateString()}</span>
        {likeFeature.active && (
          <span>
            <Likes count={likes.count} onLikeClick={onLikeClick} />
          </span>
        )}
      </div>
      {commentFeature.active && (
        <Link
          color="textPrimary"
          href="#"
          onClick={() => setComment(!comment)}
          aria-current="page"
        >
          Leave Comment
        </Link>
      )}
      {showCommentsBlock()}
    </div>
  )
}

export default Post
