import { ingredientsActions } from "../constants/ingredients";
import { ingredientsReducer } from "./ingredients";

describe('test ingredients reducer', () => {
   it('should return initial state', () => {
      expect(ingredientsReducer(undefined, {})).toEqual(
         {
            ingredients: null,
            sortedIngredients: undefined,
            isLoading: true,
            fetchError: false,
         }
      )
   })
   it('should handle GET_INGREDIENTS_SUCCESS', () => {
      expect(ingredientsReducer({ ingredients: [] }, { type: ingredientsActions.GET_INGREDIENTS_SUCCESS, ingredients: [{ name: 'test' }] })).toEqual(
         {
            ingredients: [{ name: 'test' }],
            isLoading: false,
            fetchError: false,
         }
      )
   })
   it('should handle GET_INGREDIENTS_FAILED', () => {
      expect(ingredientsReducer({}, { type: ingredientsActions.GET_INGREDIENTS_FAILED, err: { err: 'err' } })).toEqual(
         {
            isLoading: false,
            fetchError: { err: 'err' },
         }
      )
   })
   it('should handle SET_SORTED_INGREDIENTS', () => {
      expect(ingredientsReducer({ sortedIngredients: [] }, { type: ingredientsActions.SET_SORTED_INGREDIENTS, ingredients: [{ name: 'test' }] })).toEqual(
         {
            sortedIngredients: [{ name: 'test' }]
         }
      )
   })
   it('should handle DECREASE_INGREDIENT_QTY', () => {
      expect(ingredientsReducer({ sortedIngredients: [{ name: 'test', qty: 2 }] }, { type: ingredientsActions.DECREASE_INGREDIENT_QTY, item: [{ name: 'test' }] })).toEqual(
         {
            sortedIngredients: [{ name: 'test', qty: 1 }]
         }
      )
   })
   it('should handle INCREASE_INGREDIENT_QTY', () => {
      expect(ingredientsReducer({ sortedIngredients: [{ name: 'test', qty: 2 }] }, { type: ingredientsActions.INCREASE_INGREDIENT_QTY, ingredient: [{ name: 'test' }] })).toEqual(
         {
            sortedIngredients: [{ name: 'test', qty: 3 }]
         }
      )
   })
   it('should handle INCREASE_BUN_QTY', () => {
      expect(ingredientsReducer({ sortedIngredients: [{ name: 'test', qty: 2 }] }, { type: ingredientsActions.INCREASE_BUN_QTY, ingredient: [{ name: 'test' }] })).toEqual(
         {
            sortedIngredients: [{ name: 'test', qty: 2 }]
         }
      )
   })
   it('should handle CLEAR_QTY', () => {
      expect(ingredientsReducer({ sortedIngredients: [{ name: 'test', qty: 2 }] }, { type: ingredientsActions.CLEAR_QTY })).toEqual(
         {
            sortedIngredients: [{ name: 'test', qty: undefined }]
         }
      )
   })
   it('should handle INGREDIENTS_FETCHING', () => {
      expect(ingredientsReducer({}, { type: ingredientsActions.INGREDIENTS_FETCHING })).toEqual(
         {
            isLoading: true,
            fetchError: false,
         }
      )
   })
})