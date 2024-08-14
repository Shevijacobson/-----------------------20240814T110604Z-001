import axios from 'axios';
import * as actionType from '../reducers/actionType'


//יוזר שהוסיף מתכון
export const usersAddRecipes=()=>{
    return(
        axios.post('http://localhost:8080/api/category')
        
    )
}
//הוספת משתמש
export const addUser=({data})=>{
  return dispatch=>{
  axios.post(`http://localhost:8080/api/user/sighin`, data)
  .then(x => {
    alert("נרשמת בהצלחה  אתה מועבר לעמוד הבית 😀")
    dispatch({ type: actionType.updateUser, user: x.data })
    
  })

  .catch((e) => alert(e.response.data))
}}

//בדיקה האם משתמש קיים 
export  const checkUser = ({setShowError,nameUser,password}) => {
    return  dispatch=>{
    axios.post(`http://localhost:8080/api/user/login`, { Username:nameUser ,Password: password })
      .then((x) => {
        dispatch({type:actionType.updateUser,user:x.data})
      
        }
      )
      .catch(() => setShowError(true))
  }}



 




