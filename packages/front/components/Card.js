import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const styles = {
  card: {
    minWidth: 350,
    display: 'inline-block',
    justifyContent: 'space-between',
    margin: '1rem',
  },
}

const SimpleCard = (props) => {
  const { classes } = props

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          Test
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">ACTION</Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(SimpleCard)
