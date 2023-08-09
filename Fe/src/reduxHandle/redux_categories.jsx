import { produce } from "immer";

const Initial = {
    dataCategories: [],
};

const redux_categories = (state = Initial, action) => {
    return produce(state, draff => {
        switch (action.type) {
            case "API_Category":
                draff.dataCategories = action.payload;
                return;
            case "add_Category":
                draff.dataCategories.push(action.payload);
                return;
            case "update_Category":
                draff.dataCategories = draff.dataCategories.map((items) => items.id == action.payload.id ? action.payload : items);
                return;
            case "remove_Category":
                draff.dataCategories = draff.dataCategories.filter((items) => items.id != action.payload);
                return;
            default:
                return state;
        };
    });
};;

export default redux_categories
