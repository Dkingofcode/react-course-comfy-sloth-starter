import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context';

const initialState = {
    filtered_products: [],
    all_products: [],
    grid_view: false,
    sort: 'price-lowest',
    filters:{
      text: '',
      company: 'all',
      category: 'all',
      color: 'all',
      min_price: 0,
      max_price: 0,
      price: 0,
      shipping: false,
    }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
   const {products} = useProductsContext();

   useEffect(() => {
      dispatch({ type: LOAD_PRODUCTS, payload: products })
   }, [products])
 
   useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
   }, [products, state.sort, state.filters])

   const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
   }

   const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
   }


   const updatedSort = (e) => {
    // 
    const name = e.target.name
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
   }

   const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
   }

   const clearFilters = () => {

   }

  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, updatedSort, updateFilters, clearFilters, }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
