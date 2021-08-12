import React, {useEffect} from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import LoadingOverlay from 'react-loading-overlay'
import PropTypes from 'prop-types'
import {useQuery} from 'react-query'
import Header from '../components/Header'
import {connect} from 'react-redux'
import {getActivePageNum} from '../redux/selector'
import {setMaxNumPagesToDisplay, setNumItemsPerPage, setTotalNumItems} from '../redux/actions'
import TotNumItems from '../components/TotNumItems'
import ArrowsAndNumbers from '../components/ArrowsAndNumbers'
import NumberOfItemsPerPageSelector from '../components/NumberOfItemsPerPageSelector'

const PaginatedList = ({WrappedComponent, fetchItemsFnc, header, numItemsPerPage, maxNumPagesToDisplay, activePageNum, setTotalNumItems, setNumItemsPerPage, setMaxNumPagesToDisplay}) => {
  const count = (activePageNum - 1) * numItemsPerPage
  const limit = numItemsPerPage
  const query = useQuery(['items', {count, limit}], () => fetchItemsFnc(count, limit))
  if (query.isSuccess) {
    setTotalNumItems(query.data.totNumItems)
  }

  useEffect(() => { setNumItemsPerPage(numItemsPerPage) }, [numItemsPerPage])
  useEffect(() => { setMaxNumPagesToDisplay(maxNumPagesToDisplay) }, [maxNumPagesToDisplay])

  return (
    <div>
      <LoadingOverlay
        active={query.isLoading}
        spinner
        text='Loading data...'
        styles={{
          overlay: (base) => ({
            ...base,
            background: 'rgba(65,105,225,0.5)'
          })
        }}
      >
        <TotNumItems />
        <ArrowsAndNumbers />
        <NumberOfItemsPerPageSelector />
        <br />
        {header !== undefined
          ? <Header header={header} />
          : null
        }
        {query.isSuccess
          ? <ListGroup>
            {[...query.data.items].map((item, index) =>
              <ListGroupItem key={index}>
                <WrappedComponent item={item} />
              </ListGroupItem>)
            }
          </ListGroup>
          : null
        }
      </LoadingOverlay>
    </div>
  )
}

PaginatedList.propTypes = {
  WrappedComponent: PropTypes.any.isRequired,
  fetchItemsFnc: PropTypes.func.isRequired,
  header: PropTypes.arrayOf(PropTypes.shape({
    colWidth: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })),
  numItemsPerPage: PropTypes.number,
  maxNumPagesToDisplay: PropTypes.number,
  activePageNum: PropTypes.number,
  setTotalNumItems: PropTypes.func,
  setNumItemsPerPage: PropTypes.func,
  setMaxNumPagesToDisplay: PropTypes.func
}

const mapStateToProps = state => ({
  activePageNum: getActivePageNum(state)
})

export default connect(mapStateToProps, {
  setTotalNumItems,
  setNumItemsPerPage,
  setMaxNumPagesToDisplay
})(PaginatedList)
