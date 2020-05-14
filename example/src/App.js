import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withPaginatedList from 'paginated-list'

class Element extends React.Component {
  static get propTypes() {
    return {
      element: PropTypes.any
    }
  }
  render() {
    return (
      <span>{this.props.element}</span>
    )
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      elements: ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6', 'Test7', 'Test8'],
      elemPerPage: 5
    }
  }

  render () {
    const PaginatedList = withPaginatedList(Element, (offset) => {
      return new Promise((resolve, reject) => {
        if (this.state.elements.length > offset) {
          resolve({
            elements: this.state.elements.slice(offset, offset + this.state.elemPerPage),
            totNumElements: this.state.elements.length
          })
        } else {
          resolve({elements: [], totNumElements: 0})
        }
      }
      )
    })
    return (
      <div>
        <PaginatedList elemPerPage={this.state.elemPerPage} setNumElemPerPageCallback={(num) => this.setState({elemPerPage: num})} showNumElemPerPageSelector />
      </div>
    )
  }
}
