import { ingredientsActions } from "../constants/ingredients";
import { ingredientsReducer, initialState } from "./ingredients";

const testIngredient =
{
   _id: "643d69a5c3f7b9001cfa094a",
   name: "Сыр с астероидной плесенью",
   type: "main",
   proteins: 84,
   fat: 48,
   carbohydrates: 420,
   calories: 3377,
   price: 4142,
   image: "https://code.s3.yandex.net/react/code/cheese.png",
   image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
   image_large: "https://code.s3.yandex.net/react/code/cheese-large.png",
   qty: 1,
   __v: 0
}


describe('test ingredients reducer', () => {
   it('should return initial state', () => {
      expect(ingredientsReducer(undefined, {})).toEqual(
         initialState
      )
   })
   it('should handle GET_INGREDIENTS_SUCCESS', () => {
      expect(ingredientsReducer(initialState, { type: ingredientsActions.GET_INGREDIENTS_SUCCESS, ingredients: [testIngredient] })).toEqual(
         {
            ...initialState, ingredients: [testIngredient],
            isLoading: false,
            fetchError: false,
         }
      )
   })
   it('should handle GET_INGREDIENTS_FAILED', () => {
      expect(ingredientsReducer(initialState, { type: ingredientsActions.GET_INGREDIENTS_FAILED, err: { err: 'err' } })).toEqual(
         {
            ...initialState, isLoading: false,
            fetchError: { err: 'err' },
         }
      )
   })
   it('should handle SET_SORTED_INGREDIENTS', () => {
      expect(ingredientsReducer(initialState, { type: ingredientsActions.SET_SORTED_INGREDIENTS, ingredients: [testIngredient] })).toEqual(
         {
            ...initialState, sortedIngredients: [testIngredient]
         }
      )
   })
   it('should handle DECREASE_INGREDIENT_QTY', () => {
      expect(ingredientsReducer({ sortedIngredients: [testIngredient] }, { type: ingredientsActions.DECREASE_INGREDIENT_QTY, item: testIngredient })).toEqual(
         {
            sortedIngredients: [{ ...testIngredient, qty: undefined }]
         }
      )
   })
   it('should handle INCREASE_INGREDIENT_QTY', () => {
      expect(ingredientsReducer({ sortedIngredients: [testIngredient] }, { type: ingredientsActions.INCREASE_INGREDIENT_QTY, ingredient: testIngredient })).toEqual(
         {
            sortedIngredients: [{ ...testIngredient, qty: 2 }]
         }
      )
   })
   it('should handle INCREASE_BUN_QTY', () => {
      expect(ingredientsReducer({ sortedIngredients: [testIngredient] }, { type: ingredientsActions.INCREASE_BUN_QTY, ingredient: testIngredient })).toEqual(
         {
            sortedIngredients: [{ ...testIngredient, qty: 2 }]
         }
      )
   })
   it('should handle CLEAR_QTY', () => {
      expect(ingredientsReducer({ sortedIngredients: [testIngredient] }, { type: ingredientsActions.CLEAR_QTY })).toEqual(
         {
            sortedIngredients: [{ ...testIngredient, qty: undefined }]
         }
      )
   })
   it('should handle INGREDIENTS_FETCHING', () => {
      expect(ingredientsReducer(initialState, { type: ingredientsActions.INGREDIENTS_FETCHING })).toEqual(
         {
            ...initialState, isLoading: true,
            fetchError: false,
         }
      )
   })
})