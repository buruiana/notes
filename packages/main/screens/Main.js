import Navbar from '@just4dev/front/comp/Navbars/Navbar.js'
import Sidebar from '@just4dev/front/comp/Sidebar/Sidebar.js'
import routes from '@just4dev/reach-router'
import { categorySelectors } from '@just4dev/services'
import { makeStyles } from '@material-ui/core/styles'
import { navigate } from '@reach/router'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { useSelector } from 'react-redux'
import bgImage from '../assets/img/prog-5.jpg'
import logo from '../assets/img/reactlogo.png'
import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js'
import '../styles.scss'

const useStyles = makeStyles(styles)

const Main = ({ ...rest }) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const { categories = [] } = useSelector(categorySelectors.categorySelector)

  const onClick = ({ text, cat, subCat }) => {
    if (text) {
      navigate(`/${text}`)
    } else if (subCat && cat) {
      navigate(`/${cat}/${subCat}`)
    } else if (cat) {
      navigate(`/${cat}`)
    } else {
      navigate('/')
    }
    return null
  }

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'just 4 dev'}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color="white"
        categories={categories}
        onClick={onClick}
        {...rest}
      />
      <div className={classes.mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <PerfectScrollbar>{routes()}</PerfectScrollbar>
        </div>
      </div>
    </div>
  )
}

export default Main
