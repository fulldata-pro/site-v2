import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SearchType = 'people' | 'company' | 'vehicle' | 'phone' | 'bank'

interface SearchRequest {
  id: string
  type: SearchType
  query: string
  timestamp: Date
  status: 'pending' | 'processing' | 'completed' | 'failed'
}

interface SearchState {
  activeSearches: SearchRequest[]
  searchHistory: SearchRequest[]
  currentSearch: SearchRequest | null
  loading: boolean
  error: string | null
}

const initialState: SearchState = {
  activeSearches: [],
  searchHistory: [],
  currentSearch: null,
  loading: false,
  error: null,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startSearch: (state, action: PayloadAction<{ type: SearchType; query: string }>) => {
      const newSearch: SearchRequest = {
        id: Date.now().toString(),
        type: action.payload.type,
        query: action.payload.query,
        timestamp: new Date(),
        status: 'pending',
      }
      state.currentSearch = newSearch
      state.activeSearches.push(newSearch)
      state.loading = true
      state.error = null
    },
    updateSearchStatus: (state, action: PayloadAction<{ id: string; status: SearchRequest['status'] }>) => {
      const search = state.activeSearches.find(s => s.id === action.payload.id)
      if (search) {
        search.status = action.payload.status
      }
      if (state.currentSearch?.id === action.payload.id) {
        state.currentSearch.status = action.payload.status
      }
    },
    searchCompleted: (state, action: PayloadAction<string>) => {
      const searchIndex = state.activeSearches.findIndex(s => s.id === action.payload)
      if (searchIndex !== -1) {
        const completedSearch = state.activeSearches[searchIndex]
        completedSearch.status = 'completed'
        state.searchHistory.push(completedSearch)
        state.activeSearches.splice(searchIndex, 1)
      }
      state.loading = false
    },
    searchFailed: (state, action: PayloadAction<{ id: string; error: string }>) => {
      const search = state.activeSearches.find(s => s.id === action.payload.id)
      if (search) {
        search.status = 'failed'
      }
      state.error = action.payload.error
      state.loading = false
    },
    clearCurrentSearch: (state) => {
      state.currentSearch = null
      state.loading = false
      state.error = null
    },
  },
})

export const { 
  startSearch, 
  updateSearchStatus, 
  searchCompleted, 
  searchFailed,
  clearCurrentSearch 
} = searchSlice.actions

export default searchSlice.reducer