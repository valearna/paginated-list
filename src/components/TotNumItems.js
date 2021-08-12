import React from 'react'
import PropTypes from 'prop-types'
import {Badge, Form} from 'react-bootstrap'
import {getTotalNumItems} from '../redux/selector'
import {connect} from 'react-redux'

const TotNumItems = ({totNumItems}) => {
  return (
    <div>
      <Form.Label>total number of items:</Form.Label> <Badge variant='secondary'>{totNumItems}</Badge>
    </div>
  )
}

TotNumItems.propTypes = {
  totNumItems: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  totNumItems: getTotalNumItems(state)
})

export default connect(mapStateToProps, {})(TotNumItems)
