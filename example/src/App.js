import React, { Component } from 'react'

import withPaginatedList from 'paginated-list';

class Element extends React.Component {
  render() {
    return (
      <span>{this.props.text}</span>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: ['Test1, Test2', 'Test3, Test4', 'Test5, Test6', 'Test7, Test8']
    }
  }


  render () {
    const PaginatedList = withPaginatedList(Element, (offset, count) => {
      if (this.props.elements.length > offset + count) {
        return this.props.elements.slice(offset, offset + count);
      } else {
        return []
      }
    });
    return (
      <div>
        <PaginatedList />
      </div>
    )
  }
}
