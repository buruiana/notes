import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React from 'react'
import styles from '../../assets/jss/material-dashboard-react/components/cardIconStyle.js'

const useStyles = makeStyles(styles)

const CardIcon = (props) => {
  const classes = useStyles()
  const { className, children, color, ...rest } = props
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + 'CardHeader']]: color,
    [className]: className !== undefined,
  })
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  )
}

export default CardIcon
