import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const styles = {
  card: {
    minWidth: 275,
    display: 'inline-block',
    marginRight: '20px',
  },
}

const SimpleCard = (props) => {
  const { classes } = props
  const bull = <span className={classes.bullet}>•</span>

  return (
    <div style={{ display: 'inline-block' }}>
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
    </div>
  )
}

export default withStyles(styles)(SimpleCard)
