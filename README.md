# paginated-list

> Add pagination to a list of React components

[![NPM](https://img.shields.io/npm/v/paginated-list.svg)](https://www.npmjs.com/package/paginated-list) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save paginated-list
```

## Usage

```jsx
import React from 'react';
import PropTypes from 'prop-types';

import withPaginatedList from 'paginated-list';

const Element = ({ item }) => {
  return (
    <span>{item}</span>
  );
};

Element.propTypes = {
  item: PropTypes.string.isRequired
};

const App = () => {
  const elements = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6', 'Test7', 'Test8'];

  const PaginatedList = withPaginatedList(Element, (offset, limit) => {
    return new Promise((resolve, reject) => {
      resolve({
        items: elements.slice(offset, offset + limit),
        totNumItems: elements.length
      });
    });
  }, 2, 5, true);
  return (
    <div>
      <PaginatedList />
    </div>
  );
};

export default App;
```

## License

MIT © [valearna](https://github.com/valearna)
