import routes from '@just4dev/reach-router'
import { categorySelectors } from '@just4dev/services'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MailIcon from '@material-ui/icons/Mail'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { navigate } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingBottom: '4rem',
    backgroundColor: 'white',
  },
}))

function Main(props) {
  const { container } = props
  const classes = useStyles()
  const theme = useTheme()
  const { categories = [] } = useSelector(
    categorySelectors.categorySelector,
  ) || { categories: [] }
  const cats = categories.map((e) => e.categoryTitle)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [expanded, setExpanded] = useState({})

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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const onClick = ({ text, cat, subCat }) => {
    if (text) {
      navigate(`/${text.toLowerCase()}`)
    } else if (subCat) {
      navigate(`/${cat.toLowerCase()}/${subCat.toLowerCase()}`)
    } else if (cat) {
      navigate(`/${cat.toLowerCase()}`)
    } else {
      navigate('/')
    }
    return null
  }

  const renderSubCategories = (cat) => {
    const selectedCat = categories.find(
      (category) => category.categoryTitle === cat,
    )
    const subCats = selectedCat.subcategories.map((e) => e.subcategoryTitle)

    return subCats.map((subCat, index) => (
      <List key={subCat}>
        <ListItem button onClick={() => onClick({ cat, subCat })}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={subCat} />
        </ListItem>
      </List>
    ))
  }

  const renerCategories = () => {
    return cats.map((cat, index) => (
      <ExpansionPanel
        expanded={expanded[cat] === true}
        onChange={handleChange({
          ...expanded,
          [cat]: !expanded[cat],
        })}
        key={cat}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            className={classes.heading}
            onClick={() => onClick({ cat })}
          >
            {cat}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {renderSubCategories(cat)}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>{renerCategories()}</List>
      <Divider />
      <List>
        {['Features', 'Posts', 'Categories'].map((text, index) => (
          <ListItem button key={text} onClick={() => onClick({ text })}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{routes}</main>
    </div>
  )
}

export default Main
