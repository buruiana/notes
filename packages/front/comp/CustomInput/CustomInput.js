import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import Check from '@material-ui/icons/Check'
import Clear from '@material-ui/icons/Clear'
import classNames from 'classnames'
import React from 'react'
import styles from '../../assets/jss/material-dashboard-react/components/customInputStyle.js'

const useStyles = makeStyles(styles)

const CustomInput = (props) => {
  const classes = useStyles()
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    onChange,
  } = props

  const labelClasses = classNames({
    [' ' + classes.labelRootError]: error,
    [' ' + classes.labelRootSuccess]: success && !error,
  })
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  })
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  })
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + ' ' + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        onChange={onChange}
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
      />
      {error ? (
        <Clear className={classes.feedback + ' ' + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + ' ' + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  )
}

export default CustomInput
