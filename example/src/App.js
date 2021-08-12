import React from 'react'
import PropTypes from 'prop-types'

import withPaginatedList from 'paginated-list'

const Element = ({item}) => {
  return (
    <span>{item}</span>
  )
}

Element.propTypes = {
  item: PropTypes.string.isRequired
}

const App = () => {
  const elements = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6', 'Test7', 'Test8']

  const PaginatedList = withPaginatedList(Element, (offset, limit) => {
    return new Promise((resolve, reject) => {
      resolve({
        items: elements.slice(offset, offset + limit),
        totNumItems: elements.length
      })
    })
  })
  return (
    <div>
      <PaginatedList />
    </div>
  )
}

export default App
