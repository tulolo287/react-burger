import { API_URL } from "./consts";

export const getData = async (endpoint) => {
   try {
      const response = await fetch(API_URL + endpoint)
      const result = await checkResponse(response)
      return result.success ? result.data : false
   } catch (err) {
      console.log(err.message)
   }
};

export const postOrder = async (request, endpoint) => {
   try {
      const response = await fetch(API_URL + endpoint, {
         method: "POST",
         headers: {
            "Content-Type": "application/json;charset=utf-8",
         },
         body: JSON.stringify(request),
      });
      const result = await checkResponse(response)
      return result.success ? result : false
   } catch (err) {
      console.log(err.message);
   }
};

export const checkResponse = (res) => {
   return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
};