import Grid from '@material-ui/core/Grid'
import React from 'react'
import Card from './Card'

const SimilarPosts = () => (
  <Grid container spacing={2}>
    <Grid container justify="space-between" spacing={2}>
      <Grid key="s1">
        <Card />
      </Grid>
      <Grid key="s2">
        <Card />
      </Grid>
    </Grid>
  </Grid>
)

export default SimilarPosts
