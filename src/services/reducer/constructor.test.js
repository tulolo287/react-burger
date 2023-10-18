import { constructorActions } from "../constants/constructor"
import { constructorReducer } from "./constructor"

describe('constructor reducer', () => {
   it('should return initial state', () => {
      expect(constructorReducer(undefined, {})).toEqual(
         {
            constructorIngredients: [],
            bun: undefined,
            orderDetails: null,
         }
      )
   })
   it('should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR', () => {
      expect(constructorReducer({
         constructorIngredients: [{
            _id: "643d69a5c3f7b9001cfa093c",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0,
            qty: 2,
            key: "",
         },
         { name: 'test', key: '123' }]
      }, { type: constructorActions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR, ingredient: { name: 'test', key: '123' } })).toEqual(

         {
            constructorIngredients: [{
               _id: "643d69a5c3f7b9001cfa093c",
               name: "Краторная булка N-200i",
               type: "bun",
               proteins: 80,
               fat: 24,
               carbohydrates: 53,
               calories: 420,
               price: 1255,
               image: "https://code.s3.yandex.net/react/code/bun-02.png",
               image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
               image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
               __v: 0,
               qty: 2,
               key: "",
            },],
         }
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
      expect(constructorReducer({ constructorIngredients: [{ name: 'test1', qty: 1 }] }, { type: constructorActions.ADD_INGREDIENT_TO_CONSTRUCTOR, ingredient: { name: 'test2', qty: 1 } })).toEqual(
         {
            constructorIngredients: [
               { name: 'test1', qty: 1 },
               { name: 'test2', qty: 1 }
            ],
         }
      )
   })
   it('should handle ADD_BUN_TO_CONSTRUCTOR', () => {
      expect(constructorReducer({ bun: undefined }, { type: constructorActions.ADD_BUN_TO_CONSTRUCTOR, bun: { name: 'bun', type: 'bun' } })).toEqual(
         {
            bun: { name: 'bun', type: 'bun' },
         }
      )
   })
   it('should handle CLEAR_ORDER', () => {
      expect(constructorReducer({ constructorIngredients: [{ name: 'test' }] }, { type: constructorActions.CLEAR_ORDER })).toEqual(
         {
            constructorIngredients: [],
         }
      )
   })
})