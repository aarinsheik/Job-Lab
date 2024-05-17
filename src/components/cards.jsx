import React from 'react'

const cards = ( { children , bgcol = 'bg-gray-100' } ) => {
  return (
    <div className={`${bgcol} p-6 rounded-lg shawdow-md`}>
      { children }
    </div>
  )
}

export default cards
