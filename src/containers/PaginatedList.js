import React, { useEffect } from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { getActivePageNum, getNumItemsPerPage } from '../redux/selector'
import { setMaxNumPagesToDisplay, setNumItemsPerPage, setTotalNumItems } from '../redux/actions';
import TotNumItems from '../components/TotNumItems';
import ArrowsAndNumbers from '../components/ArrowsAndNumbers';
import GotoPage from '../components/GotoPage';
import NumItemsPerPage from '../components/NumItemsPerPage';

const PaginatedList = ({ WrappedComponent, fetchItemsFnc, header, showNumItemsPerPage, numItemsPerPageProp, maxNumPagesToDisplayProp, numItemsPerPage, activePageNum, setTotalNumItems, setNumItemsPerPage, setMaxNumPagesToDisplay }) => {
  const count = (activePageNum - 1) * numItemsPerPage;
  const limit = numItemsPerPage;
  const query = useQuery(['items', { count, limit }], () => fetchItemsFnc(count, limit));
  if (query.isSuccess) {
    setTotalNumItems(query.data.totNumItems);
  }

  useEffect(() => { setNumItemsPerPage(numItemsPerPageProp); }, [numItemsPerPageProp]);
  useEffect(() => { setMaxNumPagesToDisplay(maxNumPagesToDisplayProp); }, [maxNumPagesToDisplayProp]);

  return (
    <div>
      {query.isLoading
        ? <Spinner animation='grow' />
        : <div>
          <TotNumItems />
          {showNumItemsPerPage ? <div><NumItemsPerPage /><br/></div> : null}
          {header !== undefined
            ? <Header header={header} />
            : null
          }
          {query.isSuccess
            ? <ListGroup>
              {[...query.data.items].map((item, index) =>
                <ListGroupItem key={index}>
                  <WrappedComponent item={item} />
                </ListGroupItem>)
              }
            </ListGroup>
            : null
          }
        </div>
      }
      <br />
      <ArrowsAndNumbers />
      <GotoPage />
    </div>
  );
};

PaginatedList.propTypes = {
  WrappedComponent: PropTypes.any.isRequired,
  fetchItemsFnc: PropTypes.func.isRequired,
  header: PropTypes.arrayOf(PropTypes.shape({
    colWidth: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })),
  showNumItemsPerPage: PropTypes.bool,
  numItemsPerPageProp: PropTypes.number,
  numItemsPerPage: PropTypes.number.isRequired,
  maxNumPagesToDisplayProp: PropTypes.number,
  activePageNum: PropTypes.number,
  setTotalNumItems: PropTypes.func,
  setNumItemsPerPage: PropTypes.func,
  setMaxNumPagesToDisplay: PropTypes.func
};

PaginatedList.defaultProps = {
  showNumItemsPerPage: false
};

const mapStateToProps = state => ({
  activePageNum: getActivePageNum(state),
  numItemsPerPage: getNumItemsPerPage(state)
});

export default connect(mapStateToProps, {
  setTotalNumItems,
  setNumItemsPerPage,
  setMaxNumPagesToDisplay
})(PaginatedList);
