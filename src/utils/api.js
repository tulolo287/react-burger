import { API_URL } from "./consts";

export const getData = async () => {
   try {
      const response = await fetch(`${API_URL}/ingredients`)
      const result = await checkResponse(response)
      return result.success ? result.data : false
   } catch (err) {
      console.log(err.message)
   }
};

export const postOrder = async (request) => {
   try {
      const response = await fetch(`${API_URL}/orders`, {
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