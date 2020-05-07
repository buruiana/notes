import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import { navigate } from '@reach/router'
import React from 'react'

const handleClick = (event) => {
  event.preventDefault()
  navigate(`${event.target.href}`)
}

const styles = {
  cardTitleWhite: {
    color: '#000',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
}

const useStyles = makeStyles(styles)

const Breadcrumb = ({ category, subcategory }) => {
  const classes = useStyles()
  if (!category) return null

  return (
    <Breadcrumbs aria-label="breadcrumb" className="breadCrumbWrapper">
      <Link
        className={classes.cardTitleWhite}
        href={`/${category}`}
        onClick={handleClick}
      >
        {category}
      </Link>
      {subcategory && (
        <Link
          className={classes.cardTitleWhite}
          href={`/${category}/${subcategory}`}
          onClick={handleClick}
          aria-current="page"
        >
          {subcategory}
        </Link>
      )}
    </Breadcrumbs>
  )
}

export default Breadcrumb
