import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { ingredients } from '../../utils/data';
import { ingredientsActions } from '../constants/ingredients';
import { getIngredients } from "./ingredients";

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe('getIngredients action', () => {
    it('should get ingredients', () => {
        const store = mockStore({});
        const expectedActions = [
            { type: ingredientsActions.INGREDIENTS_FETCHING },
            { type: ingredientsActions.GET_INGREDIENTS_SUCCESS, ingredients: ingredients.data },
        ];

        return store.dispatch(getIngredients())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});