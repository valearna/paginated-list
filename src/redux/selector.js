export const getActivePageNum = store => store ? store.activePageNum : 0;
export const getNumItemsPerPage = store => store ? store.numItemsPerPage : 10;
export const getTotalNumItems = store => store ? store.totalNumItems : 0;
export const getMaxNumPagesToDisplay = store => store ? store.maxNumPagesToDisplay : 5;
