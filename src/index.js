import React from 'react';
import PaginatedList from './containers/PaginatedList';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './redux/store';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

const withPaginatedList = (WrappedComponent, fetchItemsFnc, numItemsPerPage, maxNumPagesToDisplay, showNumItemsPerPage, showTotalNumItems, header) => {
  const queryClient = new QueryClient();

  return function () {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PaginatedList fetchItemsFnc={fetchItemsFnc} WrappedComponent={WrappedComponent} header={header} numItemsPerPageProp={numItemsPerPage} maxNumPagesToDisplayProp={maxNumPagesToDisplay} showNumItemsPerPage={showNumItemsPerPage} showTotalNumItems={showTotalNumItems}/>
        </QueryClientProvider>
      </Provider>
    );
  };
};

withPaginatedList.propTypes = {
  WrappedComponent: PropTypes.any.isRequired,
  fetchItemsFnc: PropTypes.func.isRequired,
  numItemsPerPage: PropTypes.number,
  maxNumPagesToDisplay: PropTypes.number,
  showNumItemsPerPage: PropTypes.bool,
  header: PropTypes.arrayOf(PropTypes.shape({
    colWidth: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired
};

withPaginatedList.defaultProps = {
  numItemsPerPage: 10,
  maxNumPagesToDisplay: 5,
  showNumItemsPerPage: false
};

export default withPaginatedList;
