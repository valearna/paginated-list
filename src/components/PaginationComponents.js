import React, {useState} from 'react'
import {Col, Container, Row, Form, FormControl, Button, Badge, Pagination} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {getActivePageNum, getNumItemsPerPage, getTotalNumItems} from '../redux/selector'
import {connect} from 'react-redux'
import {goToFirstPage, goToLastPage, goToNextPage, goToPage, goToPrevPage} from '../redux/actions'

const PaginationComponents = ({totNumItems, activePageNum, numItemsPerPage, goToFirstPage, goToNextPage, goToPrevPage, goToLastPage, goToPage}) => {
  const [activePageTmp, setActivePageTmp] = useState(undefined)
  const maxNumPagesToDisplay = 5
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
    <Container fluid>
      <Row>
        <Col sm='12'>
          <Form.Label>total number of items:</Form.Label> <Badge
            variant='secondary'>{totNumItems}</Badge>
        </Col>
      </Row>
      <Row>
        <Col sm='12'>
          &nbsp;
        </Col>
      </Row>
      <Row>
        <Col sm='12'>
          <Pagination size='sm'>
            <Pagination.First onClick={goToFirstPage} />
            <Pagination.Prev onClick={goToPrevPage} />
            {items}
            <Pagination.Next onClick={goToNextPage} />
            <Pagination.Last onClick={goToLastPage} />
          </Pagination>
        </Col>
      </Row>
      <Row>
        <Col sm='12'>
          Go to page:
          <Form onSubmit={e => e.preventDefault()} inline>
            <Form.Group>
              <FormControl
                type='text' autoComplete='off' size='sm'
                placeholder={'1..' + totNumPages} style={{maxWidth: '80px'}}
                onInput={(event) => {
                  let pageNum = parseFloat(event.target.value)
                  if (!event.target.value.includes(',') && !event.target.value.includes('.') &&
                    !isNaN(pageNum) && isFinite(pageNum) && pageNum > 0 && pageNum <= totNumPages) {
                    setActivePageTmp(parseFloat(event.target.value))
                  } else {
                    setActivePageTmp(null)
                  }
                }}
                onKeyPress={(target) => {
                  if (target.key === 'Enter') {
                    goToPage(activePageTmp)
                  }
                }}
              />
              <Button variant='outline-primary' size='sm' onClick={() => {
                goToPage(activePageTmp)
              }}>Go</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

PaginationComponents.propTypes = {
  totNumItems: PropTypes.number.isRequired,
  activePageNum: PropTypes.number.isRequired,
  numItemsPerPage: PropTypes.number.isRequired,
  goToNextPage: PropTypes.func,
  goToPrevPage: PropTypes.func,
  goToFirstPage: PropTypes.func,
  goToLastPage: PropTypes.func,
  goToPage: PropTypes.func
}

const mapStateToProps = state => ({
  totNumItems: getTotalNumItems(state),
  activePageNum: getActivePageNum(state),
  numItemsPerPage: getNumItemsPerPage(state)
})

export default connect(mapStateToProps, {
  goToFirstPage,
  goToNextPage,
  goToPrevPage,
  goToLastPage,
  goToPage
})(PaginationComponents)
