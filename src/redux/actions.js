export const SET_NUM_ITEMS_PER_PAGE = 'SET_NUM_ITEMS_PER_PAGE';
export const SET_TOTAL_NUM_ITEMS = 'SET_TOTAL_NUM_ITEMS';
export const SET_MAX_NUM_PAGES_TO_DISPLAY = 'SET_MAX_NUM_PAGES_TO_DISPLAY';
export const GO_TO_NEXT_PAGE = 'GO_TO_NEXT_PAGE';
export const GO_TO_PREV_PAGE = 'GO_TO_PREV_PAGE';
export const GO_TO_FIRST_PAGE = 'GO_TO_FIRST_PAGE';
export const GO_TO_LAST_PAGE = 'GO_TO_LAST_PAGE';
export const GO_TO_PAGE = 'GO_TO_PAGE';

export const setNumItemsPerPage = numItemsPerPage => ({
  type: SET_NUM_ITEMS_PER_PAGE,
  payload: { numItemsPerPage }
});

export const setMaxNumPagesToDisplay = maxNumPagesToDisplay => ({
  type: SET_MAX_NUM_PAGES_TO_DISPLAY,
  payload: { maxNumPagesToDisplay }
});

export const setTotalNumItems = totalNumItems => ({
  type: SET_TOTAL_NUM_ITEMS,
  payload: { totalNumItems }
});

export const goToNextPage = () => ({
  type: GO_TO_NEXT_PAGE
});

export const goToPrevPage = () => ({
  type: GO_TO_PREV_PAGE
});

export const goToFirstPage = () => ({
  type: GO_TO_FIRST_PAGE
});

export const goToLastPage = () => ({
  type: GO_TO_LAST_PAGE
});

export const goToPage = pageNum => ({
  type: GO_TO_PAGE,
  payload: { pageNum }
});
