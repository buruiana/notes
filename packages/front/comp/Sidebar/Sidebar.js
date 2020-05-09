import { loginSelectors } from '@just4dev/services'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import LowPriorityIcon from '@material-ui/icons/LowPriority'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../assets/jss/material-dashboard-react/components/sidebarStyle.js'

const useStyles = makeStyles(styles)

const Sidebar = (props) => {
  const classes = useStyles()
  const authenticated = useSelector(loginSelectors.loginSelector)
  const activeRoute = () => false

  const {
    color,
    logo,
    image,
    logoText,
    categories,
    layout,
    path,
    onClick,
  } = props
  const cats = categories.map((e) => e.categoryTitle)

  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (categories._id) {
      setExpanded(
        cats.reduce((acc, val) => {
          acc[val] = false
          return acc
        }, {}),
      )
    }
  }, [categories._id])

  var brand = (
    <div className={classes.logo}>
      <a
        href="http://localhost:1234"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  )

  const renderSubCategories = (cat) => {
    const selectedCat = categories.find(
      (category) => category.categoryTitle === cat,
    )
    const subCats = selectedCat.subcategories.map((e) => e.subcategoryTitle)
    const listItemClasses = classNames({
      [' ' + classes[color]]: activeRoute(),
    })
    return subCats.map((subCat, i) => (
      <ListItem
        button
        className={classes.itemLink + listItemClasses}
        key={`${subCat}_${i}_item}`}
      >
        <LowPriorityIcon
          key={`${subCat}_${i}_icon}`}
          className={classNames(classes.itemIcon, whiteFontClasses)}
        />

        <ListItemText
          primary={subCat}
          className={classNames(classes.itemText, whiteFontClasses)}
          disableTypography={true}
          key={`${subCat}_${i}_text}`}
          onClick={() => onClick({ cat, subCat })}
        />
      </ListItem>
    ))
  }

  const renderAdmin = (
    <List className={classes.list}>
      {['aFeatures', 'aPosts', 'aCategories'].map((text, index) => {
        const listItemClasses = classNames({
          [' ' + classes[color]]: activeRoute(),
        })
        return (
          <ListItem
            button
            key={text}
            onClick={() => onClick({ text })}
            className={classes.itemLink + listItemClasses}
          >
            <ListItemText
              primary={text}
              className={classNames(classes.itemText, whiteFontClasses)}
            />
          </ListItem>
        )
      })}
    </List>
  )

  const whiteFontClasses = classNames({
    [' ' + classes.whiteFont]: activeRoute(layout + path),
  })

  var links = (
    <List className={classes.list}>
      {cats.map((cat, i) => {
        var activePro = ' '
        var listItemClasses
        if (path === '/upgrade-to-pro') {
          activePro = classes.activePro + ' '
          listItemClasses = classNames({
            [' ' + classes[color]]: true,
          })
        } else {
          listItemClasses = classNames({
            [' ' + classes[color]]: activeRoute(),
          })
        }
        const whiteFontClasses = classNames({
          [' ' + classes.whiteFont]: activeRoute(),
        })
        return (
          <ListItem
            button
            className={classes.itemLink + listItemClasses}
            key={`${cat}_${i}_item}`}
          >
            <LowPriorityIcon
              key={`${cat}_${i}_icon}`}
              className={classNames(classes.itemIcon, whiteFontClasses)}
            />
            <ListItemText
              primary={cat}
              className={classNames(classes.itemText, whiteFontClasses)}
              disableTypography={true}
              key={`${cat}_${i}_text}`}
              onClick={() => onClick({ cat })}
            />
            {renderSubCategories(cat)}
          </ListItem>
        )
      })}
    </List>
  )

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? 'left' : 'right'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {brand}
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{
                backgroundImage: 'url(' + image + ')',
              }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
            {authenticated && renderAdmin}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{
                backgroundImage: 'url(' + image + ')',
              }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  )
}

export default Sidebar
