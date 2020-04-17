import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { navigate } from '@reach/router'
import React from 'react'
import Breadcrumb from './Breadcrumb'

const PostList = ({ posts }) => {
  console.log('########## posts', posts)
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
      } = post

      const onLinkClick = () => navigate(`/post/${postUrl}`)

      return (
        <div key={postId}>
          <h2>{title}</h2>
          <Breadcrumb />
          <Grid container spacing={1}>
            <Grid item xs={2}>
              {imageName}
            </Grid>
            <Grid item xs={10}>
              {longDescription}
            </Grid>
          </Grid>
          <div>
            <div className="left">{new Date(datetime).toDateString()}</div>
            <div className="right">
              <Link onClick={onLinkClick}>more..</Link>
            </div>
          </div>
        </div>
      )
    })
  }

  return <>{renderPosts()}</>
}

export default PostList
