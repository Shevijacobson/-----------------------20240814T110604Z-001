import React from 'react'
import { useParams } from 'react-router';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useSelector } from 'react-redux';
import * as server from '../axios/Recipe'
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import * as serverBuy from '../axios/soppingListBuy';
import { useDispatch } from 'react-redux';
import * as actionType from '../reducers/actionType'


const CurrentRecipe = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const dispatch = useDispatch();

 
  const UserId = useSelector(state => state.user.Id)
  const [recipes, setRecipes] = React.useState();
  let allItems = []
  const navigate = useNavigate();
  const params = useParams()
  React.useEffect(() => {
  
    server.getAllRecipes({ setRecipes })
  }, [])

 
  //הןספה/מחיקה מצרך למערך
  let itemToBuy = {}

  const addItemToShop = (event, x) => {
    if (event.target.checked) {
      itemToBuy = {
        Name: x.Name,
        Count: x.Count,
        UserId: UserId
      }

      if (itemToBuy) {
        console.log(itemToBuy)
        serverBuy.addItemShop({ itemToBuy })
          .then(x => console.log(x))
          .catch(E => console.log(E))
      }
    }
    else {
//עדכון רשימת הקניות

      serverBuy.getAllItems(UserId)
        .then(index => {
          allItems = index.data
          allItems.map(item => {
            if (item.Name == x.Name)
             { item.Count = x.Count * -1 
            serverBuy.editItem( item)
              .then(x => console.log(x.data))
              .catch(x => console.log(x))
            }
          }
          )

        })
    }
  }

  //פונקציה שמוחקת ומעבירה לעמוד הבית
  const DeletRecipe = (id) => {
    server.DeletRecipe({ id })
      .then((x) => {
        alert(`המתכון נמחק בהצלחה ✅ הינך מועבר למתכונים`)
        navigate("/recipes")
        console.log(x.data)
      })
      .catch((E) => { return (E.response) })

  }

  const editRecipe=(x)=>{
 
    dispatch({type:actionType.UPDATERECIPE,currentRecipe:x})
   navigate("/editRecipe")
   
  }



  return (
    <>

      {recipes ? <>

        <div className='currentRecipe'>
          <b>
            <p className='nameRecipe' >  {recipes[params.id - 1].Name}<span className='description-recipe'>/{recipes[params.id - 1].Description}</span>
            </p>
          </b>

          <div className='about-recipe' >
            <IconButton style={{ backgroundColor: "#d1d6d663" }}><NorthEastIcon /></IconButton>
            <span> רמת קושי:  {recipes[params.id - 1].Difficulty}</span>




            <IconButton style={{ backgroundColor: "#d1d6d663" }}><AccessTimeIcon /></IconButton>
            <span>  זמן הכנה: {recipes[params.id - 1].Duration} דקות</span>
            {UserId == recipes[params.id - 1].UserId ? <>
              <IconButton style={{ backgroundColor: "#d1d6d663" }} onClick={()=>editRecipe(recipes[params.id - 1])}><ModeEditOutlineOutlinedIcon /></IconButton>
              <span> עריכת המתכון </span>
              <IconButton style={{ backgroundColor: "#d1d6d663" }} onClick={() => DeletRecipe(params.id)} ><DeleteOutlinedIcon /></IconButton>
              <span> מחיקת המתכון </span> </> : null}

          </div>
          <br />
          <div className='img'>
            <img src={recipes[params.id - 1].Img} alt='' ></img>
          </div>
          <p></p>

          <p className='recipe'>מצרכים</p>
          <ul className='listProducts'>{recipes[params.id - 1].Ingrident.map((x) => <div><li><Checkbox onChange={(event) => addItemToShop(event, x)} {...label} /> {x.Count} {x.Type} {x.Name}  </li></div>)}</ul>
          <p className='recipe'>הוראות הכנה</p>
          <ul >{recipes[params.id - 1].Instructions.map((x) => <div><li>{x}</li></div>)}</ul>
        </div>

      </> : null}
    </>
  )
}

export default CurrentRecipe
