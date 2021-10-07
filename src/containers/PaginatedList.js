import React, { useEffect } from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import TotNumItems from '../components/TotNumItems';
import ArrowsAndNumbers from '../components/ArrowsAndNumbers';
import GotoPage from '../components/GotoPage';
import NumItemsPerPage from '../components/NumItemsPerPage';
import { setMaxNumPagesToDisplay, setNumItemsPerPage, setTotalNumItems } from '../redux/actions';

const PaginatedList = ({ WrappedComponent, fetchItemsFnc, header, showNumItemsPerPage, showTotalNumItems, numItemsPerPageProp, maxNumPagesToDisplayProp }) => {
  const dispatch = useDispatch();
  const activePageNum = useSelector((state) => state.activePageNum);
  const numItemsPerPage = useSelector((state) => state.numItemsPerPage);
  const totNumElements = useSelector((state) => state.totalNumItems);
  const count = (activePageNum - 1) * numItemsPerPage;
  const limit = numItemsPerPage;
  const query = useQuery(['items', { count, limit }], () => fetchItemsFnc(count, limit));
  if (query.isSuccess) {
    dispatch(setTotalNumItems(query.data.totNumItems));
  }

  useEffect(() => { dispatch(setNumItemsPerPage(numItemsPerPageProp)); }, [numItemsPerPageProp]);
  useEffect(() => { dispatch(setMaxNumPagesToDisplay(maxNumPagesToDisplayProp)); }, [maxNumPagesToDisplayProp]);

  return (
    <div>
      {query.isLoading
        ? <Spinner animation='grow'/>
        : <div>
          {totNumElements > 0
            ? <div>
              {showTotalNumItems ? <TotNumItems/> : null}
              {showNumItemsPerPage ? <div><NumItemsPerPage/><br/></div> : null}
              {header !== undefined
                ? <Header header={header}/>
                : null
              }
              {query.isSuccess
                ? <ListGroup>
                  {[...query.data.items].map((item, index) =>
                    <ListGroupItem key={index}>
                      <WrappedComponent item={item}/>
                    </ListGroupItem>)
                  }
                </ListGroup>
                : null
              }
              <br />
              <ArrowsAndNumbers />
              <GotoPage />
            </div>
            : null
          }
        </div>
      }
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
  showTotalNumItems: PropTypes.bool,
  numItemsPerPageProp: PropTypes.number,
  maxNumPagesToDisplayProp: PropTypes.number
};

PaginatedList.defaultProps = {
  showNumItemsPerPage: false,
  showTotalNumItems: true
};

export default PaginatedList;
