import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type === LOAD_PRODUCTS){
    return { ...state, all_products: [...action.payload], filter_products: [...action.payload], }
  }

  if(action.type === SET_GRIDVIEW){
    return {...state, grid_view: true}
  }

  if(action.type === SET_LISTVIEW){
    return {...state, grid_view: false}
  }

  if(action.type === UPDATE_SORT){
    return { ...state, sort: action.payload }
  }

  if(action.type === SORT_PRODUCTS){
    const {sort, filtered_products} = state;
    let tempProducts = [...filtered_products];
    if(sort === 'price-lowest'){
      console.log('price-lowest')
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price-highest'){
      console.log('price-highest')
      tempProducts = tempProducts.sort((a,b) => b.price - a.price)
    }
    if(sort === 'name-a'){
      console.log('name-a')
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localCompare(b.name)
      })
    }
    if (sort === 'name-z'){
      console.log('name-z')
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localCompare(a.name)
      })
    }

    return { ...state, filtered_products: tempProducts }
  }

  if(action.type === UPDATE_FILTERS){
    const {name, value} = action.payload
    return {...state, filters:{...state.filters, [name]: value}}
  }

  if(action.type === FILTER_PRODUCTS){
    console.log('filtering products');
    return {...state};
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer;
