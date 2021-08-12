import React from 'react'
import PaginatedList from './containers/PaginatedList'
import {QueryClient, QueryClientProvider} from 'react-query'
import store from './redux/store'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'

const withPaginatedList = (WrappedComponent, fetchItems, header) => {
  const queryClient = new QueryClient()

  return function () {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PaginatedList fetchItems={fetchItems} WrappedComponent={WrappedComponent} header={header} />
        </QueryClientProvider>
      </Provider>
    )
  }
}

withPaginatedList.propTypes = {
  WrappedComponent: PropTypes.any.isRequired,
  fetchItems: PropTypes.func.isRequired,
  header: PropTypes.arrayOf(PropTypes.shape({
    colWidth: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired
}

export default withPaginatedList
