import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import { navigate } from '@reach/router'
import React from 'react'

const handleClick = (event) => {
  event.preventDefault()
  navigate(`${event.target.href}`)
}

const Breadcrumb = ({ category, subcategory }) => (
  <Breadcrumbs aria-label="breadcrumb" className="breadCrumbWrapper">
    <Link color="inherit" href={`/${category}`} onClick={handleClick}>
      {category}
    </Link>
    {subcategory && (
      <Link
        color="textPrimary"
        href={`/${category}/${subcategory}`}
        onClick={handleClick}
        aria-current="page"
      >
        {subcategory}
      </Link>
    )}
  </Breadcrumbs>
)

export default Breadcrumb
