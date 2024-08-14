import axios from 'axios';

//קבלת כל הקטגוריות
export const getAllCategory=()=>{
    return    axios.get('http://localhost:8080/api/category')
  }

  //הוספת קטגוריה
  export const addCategory= ({t})=>{
    return axios.post(` http://localhost:8080/api/category`, {Name:t})
   
   }

   