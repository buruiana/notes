import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import { navigate } from '@reach/router'
import React from 'react'
import Card from '../comp/Card/Card.js'
import CardBody from '../comp/Card/CardBody.js'
import CardHeader from '../comp/Card/CardHeader.js'
import { getCategoryName } from '../utils/common'
import Breadcrumb from './Breadcrumb'
import Keywords from './Keywords'

const styles = {
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
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

const PostList = ({ posts, categories }) => {
  const classes = useStyles()
  const renderPosts = () => {
    return posts.map((post) => {
      const {
        _id: postId,
        title,
        postUrl,
        longDescription,
        imageName,
        datetime,
        category,
        subcategory,
        keywords,
      } = post

      const { categoryTitle, subcategoryTitle } = getCategoryName({
        category,
        subcategory,
        categories,
      })

      const onTitleClick = () =>
        navigate(`/${categoryTitle}/${subcategoryTitle}/${postUrl}`)

      return (
        <Card key={postId}>
          <CardHeader color="primary">
            <Link className="generic_link" onClick={onTitleClick}>
              <h4 className={classes.cardTitleWhite}>{title}</h4>
            </Link>
            <Breadcrumb
              category={categoryTitle}
              subcategory={subcategoryTitle}
            />
          </CardHeader>
          <CardBody>
            <div className={classes.typo}>
              <div className={classes.note}>Header 1</div>
              <div>{longDescription}</div>
              <div>
                <Keywords keywords={keywords} />
              </div>
            </div>
          </CardBody>
        </Card>
      )
    })
  }

  return <>{renderPosts()}</>
}

export default PostList
