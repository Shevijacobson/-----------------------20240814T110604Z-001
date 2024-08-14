
import axios from 'axios';
//מחיקת מתכון
export const DeletRecipe = ({ idRecipe }) => {
    return axios.post(`http://localhost:8080/api/recipe/delete/${idRecipe}`)
}


//קבלת כל המתכונים
export const getAllRecipes = ({ setRecipes }) => {

    return axios.get('http://localhost:8080/api/recipe')
        .then(x => {
            setRecipes(x.data)
        })
        .catch((E) => alert(E))
}

//הוספת מתכון
export const addRecipe = ({ data }) => {

    return axios.post(` http://localhost:8080/api/recipe`, data)
}

//עריכת מתכון
export const editRecipe = ({ data }) => {

    return axios.post(`http://localhost:8080/api/recipe/edit`, data)
}

