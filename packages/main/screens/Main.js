import routes from '@just4dev/reach-router'
import { categorySelectors } from '@just4dev/services'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { fade, makeStyles, useTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import SearchIcon from '@material-ui/icons/Search'
import { navigate } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingBottom: '4rem',
    backgroundColor: 'white',
    marginTop: '4.5rem',
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: 'white',
    color: 'black',
    zIndex: theme.zIndex.drawer + 1,
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
      <ListItem button onClick={() => onClick({ cat, subCat })} key={subCat}>
        <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={subCat} />
      </ListItem>
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
          <List key={`${cat}_subcategories`}>{renderSubCategories(cat)}</List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))
  }

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
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
              keepMounted: true,
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
