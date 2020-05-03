import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import { navigate } from '@reach/router'
import React from 'react'
import { getCategoryName } from '../utils/common'

const handleClick = (event) => {
  event.preventDefault()
  navigate(`${event.target.href}`)
}

const Breadcrumb = ({ category, subcategory, categories }) => {
  if (!category) return null

  return (
    <Breadcrumbs aria-label="breadcrumb" className="breadCrumbWrapper">
      <Link
        color="inherit"
        href={`/${getCategoryName({ category, categories })}`}
        onClick={handleClick}
      >
        {getCategoryName({ category, categories })}
      </Link>
      {subcategory && (
        <Link
          color="textPrimary"
          href={`/${getCategoryName({
            category,
            categories,
          })}/${getCategoryName({
            category,
            subcategory,
            categories,
          })}`}
          onClick={handleClick}
          aria-current="page"
        >
          {getCategoryName({
            category,
            subcategory,
            categories,
          })}
        </Link>
      )}
    </Breadcrumbs>
  )
}

export default Breadcrumb
