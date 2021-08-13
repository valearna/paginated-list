import React from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Header = ({ header }) => {
  return (
    <ListGroup>
      <ListGroupItem>
        <Container fluid>
          <Row>
            {[...header].map(head =>
              <Col sm={head[0]}><strong>{head[1]}</strong></Col>)}
          </Row>
        </Container>
      </ListGroupItem>
    </ListGroup>
  )
}

Header.propTypes = {
  header: PropTypes.arrayOf(PropTypes.shape({
    colWidth: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired
}

export default Header
