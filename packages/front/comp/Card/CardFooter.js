import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React from 'react'
import styles from '../../assets/jss/material-dashboard-react/components/cardFooterStyle.js'

const useStyles = makeStyles(styles)

const CardFooter = (props) => {
  const classes = useStyles()
  const { className, children, plain, profile, stats, chart, ...rest } = props
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
    [className]: className !== undefined,
  })
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  )
}

export default CardFooter
