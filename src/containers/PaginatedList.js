import React from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import LoadingOverlay from 'react-loading-overlay'
import PropTypes from 'prop-types'
import {useQuery} from 'react-query'
import Header from '../components/Header'
import {connect} from 'react-redux'
import {getActivePageNum, getNumItemsPerPage} from '../redux/selector'
import {setTotalNumItems} from '../redux/actions'
import TotNumItems from '../components/TotNumItems'
import ArrowsAndNumbers from '../components/ArrowsAndNumbers'
import NumberOfItemsPerPageSelector from '../components/NumberOfItemsPerPageSelector'

const PaginatedList = ({WrappedComponent, fetchItemsFnc, header, activePageNum, numItemsPerPage, setTotalNumItems}) => {
  const count = activePageNum * numItemsPerPage
  const limit = numItemsPerPage
  const query = useQuery(['items', {count, limit}], () => fetchItemsFnc(count, limit))
  if (query.isSuccess) {
    setTotalNumItems(query.data.totNumItems)
  }

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
  activePageNum: PropTypes.number,
  numItemsPerPage: PropTypes.number,
  setTotalNumItems: PropTypes.func
}

const mapStateToProps = state => ({
  activePageNum: getActivePageNum(state),
  numItemsPerPage: getNumItemsPerPage(state)
})

export default connect(mapStateToProps, {setTotalNumItems})(PaginatedList)
