# paginated-list

> Add pagination to a list of React components

[![NPM](https://img.shields.io/npm/v/paginated-list.svg)](https://www.npmjs.com/package/paginated-list) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save paginated-list
```

## Usage

```jsx
import React, { Component } from 'react'
import withPaginatedList from 'paginated-list';

class Element extends React.Component {
  render() {
    return (
      <span>{this.props.element}</span>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6', 'Test7', 'Test8']
    }
  }


  render () {
    const PaginatedList = withPaginatedList(Element, (offset) => {
      return new Promise(((resolve, reject ) => {
          if (this.state.elements.length > offset) {
            resolve({
              elements: this.state.elements.slice(offset, offset + 5),
              totNumElements: this.state.elements.length
            });
          } else {
            resolve({elements: [], totNumElements: 0});
          }})
      )});
    return (
      <div>
        <PaginatedList elemPerPage={5} />
      </div>
    )
  }
}
```

## License

MIT © [valearna](https://github.com/valearna)
