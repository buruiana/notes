import Chip from '@material-ui/core/Chip'
import React from 'react'

const Keywords = ({ keywords }) =>
  keywords.map((keyword) => (
    <Chip
      label={keyword.name}
      variant="outlined"
      color="primary"
      key={`${keyword}_${Math.floor(Math.random() * 100000 + 1)}`}
    />
  ))

export default Keywords
