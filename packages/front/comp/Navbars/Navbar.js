import AppBar from '@material-ui/core/AppBar'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from '@material-ui/icons/Menu'
import Search from '@material-ui/icons/Search'
import { navigate } from '@reach/router'
import classNames from 'classnames'
import React, { useState } from 'react'
import styles from '../../assets/jss/material-dashboard-react/components/headerStyle.js'
import Button from '../CustomButtons/Button.js'
import CustomInput from '../CustomInput/CustomInput.js'

const useStyles = makeStyles(styles)

const Header = (props) => {
  const classes = useStyles()
  const [search, setSearch] = useState('')

  const onChange = (e) => setSearch(e.target.value)
  const onSearch = () => navigate(`/search/${search}`)

  const { color } = props
  const appBarClasses = classNames({
    [' ' + classes[color]]: color,
  })
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button color="transparent" href="#" className={classes.title}>
            'brand'
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <div className={classes.searchWrapper}>
            <CustomInput
              onChange={onChange}
              formControlProps={{
                className: classes.margin + ' ' + classes.search,
              }}
              inputProps={{
                placeholder: 'Search',
                inputProps: {
                  'aria-label': 'Search',
                },
              }}
            />
            <Button
              color="white"
              aria-label="edit"
              justIcon
              round
              onClick={onSearch}
            >
              <Search />
            </Button>
          </div>
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default Header
