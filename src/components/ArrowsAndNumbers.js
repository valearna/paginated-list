import React from 'react'
import {Pagination} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {getActivePageNum, getMaxNumPagesToDisplay, getNumItemsPerPage, getTotalNumItems} from '../redux/selector'
import {connect} from 'react-redux'
import {goToFirstPage, goToLastPage, goToNextPage, goToPage, goToPrevPage} from '../redux/actions'

const ArrowsAndNumbers = ({totNumItems, activePageNum, numItemsPerPage, maxNumPagesToDisplay, goToFirstPage, goToNextPage, goToPrevPage, goToLastPage, goToPage}) => {
  const totNumPages = Math.ceil(totNumItems / numItemsPerPage)
  const firstDisplayedPage = Math.max(Math.min(activePageNum - Math.floor(maxNumPagesToDisplay / 2), totNumPages - maxNumPagesToDisplay + 1), 1)
  const lastDisplayedPage = Math.min(totNumPages, firstDisplayedPage + maxNumPagesToDisplay - 1)
  let items = []
  if (firstDisplayedPage > 1) {
    items.push(<Pagination.Ellipsis onClick={() => goToPage(firstDisplayedPage - 1)} />)
  }
  for (let number = firstDisplayedPage; number <= lastDisplayedPage; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePageNum} onClick={() => goToPage(number)} >
        {number}
      </Pagination.Item>
    )
  }

  return (
    <div>
      <Pagination size='sm'>
        <Pagination.First onClick={goToFirstPage} />
        <Pagination.Prev onClick={goToPrevPage} />
        {items}
        <Pagination.Next onClick={goToNextPage} />
        <Pagination.Last onClick={goToLastPage} />
      </Pagination>
    </div>
  )
}

ArrowsAndNumbers.propTypes = {
  totNumItems: PropTypes.number.isRequired,
  activePageNum: PropTypes.number.isRequired,
  numItemsPerPage: PropTypes.number.isRequired,
  maxNumPagesToDisplay: PropTypes.number.isRequired,
  goToNextPage: PropTypes.func,
  goToPrevPage: PropTypes.func,
  goToFirstPage: PropTypes.func,
  goToLastPage: PropTypes.func,
  goToPage: PropTypes.func
}

const mapStateToProps = state => ({
  totNumItems: getTotalNumItems(state),
  activePageNum: getActivePageNum(state),
  numItemsPerPage: getNumItemsPerPage(state),
  maxNumPagesToDisplay: getMaxNumPagesToDisplay(state)
})

export default connect(mapStateToProps, {
  goToFirstPage,
  goToNextPage,
  goToPrevPage,
  goToLastPage,
  goToPage
})(ArrowsAndNumbers)
