import { produce } from "immer";

const Initial = {
    dataPosts: [],
};
const redux_posts = (state = Initial, action) => {
    return produce(state, draff => {
        switch (action.type) {
            case "API_Post":
                draff.dataPosts = action.payload;
                return;
            case "add_Post":
                draff.dataPosts.push(action.payload);
                return;
            case "update_Post":
                draff.dataPosts = draff.dataPosts.map((items) => items._id == action.payload._id ? action.payload : items);
                return;
            case "remove_Post":
                draff.dataPosts = draff.dataPosts.filter((items) => items._id != action.payload);
                return;
            default:
                return state;
        };
    });
}

export default redux_posts
