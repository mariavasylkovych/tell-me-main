import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { paginateReducer, announcementsReducer, posts, commentsReducer, userData } from "./reducer"

const rootReducer = combineReducers({paginateReducer, announcementsReducer, posts, commentsReducer, userData})

export const store = createStore(rootReducer, applyMiddleware(thunk))