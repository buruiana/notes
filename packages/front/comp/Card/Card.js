import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React from 'react'
import styles from '../../assets/jss/material-dashboard-react/components/cardStyle'

const useStyles = makeStyles(styles)

const Card = (props) => {
  const classes = useStyles()
  const { className, children, plain, profile, chart, ...rest } = props

  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className]: className !== undefined,
  })

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  )
}

export default Card
