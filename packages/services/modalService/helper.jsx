import CategoryModal from '@just4dev/layouts/modals/CategoryModal'
import React from 'react'

export const getModalComponent = (modals) => {
  const currentModal = modals[modals.length - 1]

  switch (currentModal.type) {
    case 'category':
      return <CategoryModal />
    default:
      break
  }
}
