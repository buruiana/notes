import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React from 'react'
import styles from '../../assets/jss/material-dashboard-react/components/cardHeaderStyle.js'

const useStyles = makeStyles(styles)

const CardHeader = (props) => {
  const classes = useStyles()
  const { className, children, color, plain, stats, icon, ...rest } = props
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + 'CardHeader']]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined,
  })
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  )
}

export default CardHeader
