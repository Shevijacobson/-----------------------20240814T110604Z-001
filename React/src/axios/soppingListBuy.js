import axios from 'axios';




//קבלת כל רשימת הקניות
export const getAllItems=(useID)=>{
  console.log('axios',useID)
    return    axios.get(`http://localhost:8080/api/bay/${useID}`)

  }

//מחיקת מוצר מרשימ קניות
export const deleteProduct=(userId,productId )=>{
    return    axios.post(`http://localhost:8080/api/ bay /delete/${userId} /${productId}`)

  }

//הוספת פריט לרשימה
  export const addItemShop=( {itemToBuy})=>{
       return   axios.post(`http://localhost:8080/api/bay`,itemToBuy)

  }//עריכה פריט לרשימה
  export const editItem=( itemToBuy)=>{
    console.log(itemToBuy)
    return   axios.post(`http://localhost:8080/api/bay/edit`,itemToBuy)

}




//   //הורדת כמות מוצר
//   export const deleteProduct=()=>{
//     return    axios.get(`http://localhost:8080/api/bay/edit`,{})

//   }

//   //הוספת כמות מוצר
//   export const deleteProduct=(userId,productId )=>{
//     return    axios.get(`http://localhost:8080/api/bay/edit`)

  // }

