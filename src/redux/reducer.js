import {createReducer} from '@reduxjs/toolkit'

const initialState = {
  activePageNum: 0,
  numItemsPerPage: 10,
  totalNumItems: 0,
  goToPageFormValid: false
}

export default createReducer(initialState, {
  SET_ACTIVE_PAGE_NUM: (state, action) => {
    state.activePageNum = action.payload.activePageNum
  },
  SET_NUM_ITEMS_PER_PAGE: (state, action) => {
    state.numItemsPerPage = action.payload.numItemsPerPage
  },
  SET_TOTAL_NUM_ITEMS: (state, action) => {
    state.totalNumItems = action.payload.totalNumItems
  },
  GO_TO_NEXT_PAGE: (state, action) => {
    if (state.activePageNum < Math.ceil(state.totNumItems / state.numItemsPerPage)) {
      state.activePageNum = state.activePageNum + 1
    }
  },
  GO_TO_PREV_PAGE: (state, action) => {
    if (state.activePageNum > 1) {
      state.activePageNum = state.activePageNum - 1
    }
  },
  GO_TO_FIRST_PAGE: (state, action) => {
    state.activePageNum = 0
  },
  GO_TO_LAST_PAGE: (state, action) => {
    state.activePageNum = Math.ceil(state.totalNumItems / state.numItemsPerPage)
  },
  GO_TO_PAGE: (state, action) => {
    let pageNum = action.payload.pageNum
    if (pageNum !== null && pageNum !== '') {
      if (action.payload.pageNum >= 0 && action.payload.pageNum <= Math.ceil(state.totalNumItems / state.numItemsPerPage)) {
        state.activePageNum = action.payload.pageNum
      }
    }
  }
})
