import Button from '@material-ui/core/Button'
import React from 'react'

const Pagination = ({ onClickMore }) => {
  return (
    <div>
      <Button size="small" onClick={onClickMore}>
        More
      </Button>
    </div>
  )
}

export default Pagination
