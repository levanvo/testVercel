import {legacy_createStore as createStore,combineReducers} from "redux";
import redux_categories from "./redux_categories";
import redux_posts from "./redux_posts";

const root=combineReducers({
    dataCategory:redux_categories,
    dataPost:redux_posts
});

const store=createStore(root);
export default store;