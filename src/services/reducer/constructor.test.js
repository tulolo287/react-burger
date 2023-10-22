import { constructorActions } from "../constants/constructor"
import { constructorReducer, initialState } from "./constructor"

const testConstructorIngredient =
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


describe('constructor reducer', () => {
   it('should return initial state', () => {
      expect(constructorReducer(undefined, {})).toEqual(
         initialState
      )
   })
   it('should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR', () => {
      expect(constructorReducer({
         constructorIngredients: [testConstructorIngredient]
      }, { type: constructorActions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR, ingredient: testConstructorIngredient })).toEqual(
         { constructorIngredients: [] }
      )
   })

   it('should handle CHANGE_CONSTRUCTOR_INGREDIENT', () => {
      expect(constructorReducer({ constructorIngredients: [{ name: 'test1' }, { name: 'test2' }] }, { type: constructorActions.CHANGE_CONSTRUCTOR_INGREDIENT, ingredient: { hoverIndex: 0, dragIndex: 1 } })).toEqual(
         {
            constructorIngredients: [
               { name: 'test2' },
               { name: 'test1' }
            ],
         }
      )
   })
   it('should handle ADD_INGREDIENT_TO_CONSTRUCTOR', () => {
      expect(constructorReducer(initialState, { type: constructorActions.ADD_INGREDIENT_TO_CONSTRUCTOR, ingredient: testConstructorIngredient })).toEqual(
         {
            ...initialState, constructorIngredients: [
               testConstructorIngredient
            ],
         }
      )
   })
   it('should handle ADD_BUN_TO_CONSTRUCTOR', () => {
      expect(constructorReducer(initialState, { type: constructorActions.ADD_BUN_TO_CONSTRUCTOR, bun: testConstructorIngredient })).toEqual(
         {
            ...initialState, bun: testConstructorIngredient,
         }
      )
   })
   it('should handle CLEAR_ORDER', () => {
      expect(constructorReducer({}, { type: constructorActions.CLEAR_ORDER })).toEqual(
         {
            ...initialState
         }
      )
   })
})