import React from 'react'
import {Col, Container, ListGroup, ListGroupItem, Row} from 'react-bootstrap'
import LoadingOverlay from 'react-loading-overlay'
import PropTypes from 'prop-types'
import {useQuery} from 'react-query'
import Pagination from '../components/PaginationComponents'
import Header from '../components/Header'
import {connect} from 'react-redux'
import {getActivePageNum, getNumItemsPerPage} from '../redux/selector'
import {setTotalNumItems} from '../redux/actions'

const PaginatedList = ({WrappedComponent, fetchItems, header, activePageNum, numItemsPerPage, setTotalNumItems}) => {
  const count = activePageNum * numItemsPerPage
  const limit = numItemsPerPage
  const query = useQuery(['items', {count, limit}], () => fetchItems(count, limit))
  if (query.isSuccess) {
    setTotalNumItems(query.data.totNumItems)
  }

  return (
    <Container fluid>
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
        <Row>
          <Col>
            <Pagination />
          </Col>
        </Row>
        <Row>
          <Col sm='12'>
            &nbsp;
          </Col>
        </Row>
        {header !== undefined
          ? <Row>
            <Col>
              <Header header={header} />
            </Col>
          </Row> : null}
        <Row>
          <Col sm='12'>
            {query.isSuccess
              ? <ListGroup>
                {[...query.data.items].map(item =>
                  <ListGroupItem>
                    <WrappedComponent element={item} />
                  </ListGroupItem>)
                }
              </ListGroup> : null}
          </Col>
        </Row>
      </LoadingOverlay>
    </Container>
  )
}

PaginatedList.propTypes = {
  WrappedComponent: PropTypes.any.isRequired,
  fetchItems: PropTypes.func.isRequired,
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
