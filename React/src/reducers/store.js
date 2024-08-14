import { applyMiddleware, createStore } from 'redux';
import Thunk from 'redux-thunk'
import redux from './redux'
export const store = createStore(redux, applyMiddleware(Thunk));