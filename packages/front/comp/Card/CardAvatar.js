import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React from 'react'
import styles from '../../assets/jss/material-dashboard-react/components/cardAvatarStyle.js'

const useStyles = makeStyles(styles)

const CardAvatar = (props) => {
  const classes = useStyles()
  const { children, className, plain, profile, ...rest } = props
  const cardAvatarClasses = classNames({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [className]: className !== undefined,
  })
  return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  )
}

export default CardAvatar
