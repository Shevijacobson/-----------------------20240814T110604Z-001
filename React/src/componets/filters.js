import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import * as server from '../axios/categories'
import FilterRecipe from './allRecipes';



export default function Filter() {
  const [category, setcategory] = React.useState();
  const [categoryArr, setCategoryArr] = React.useState([]);
  const [difficultyChosen, setDifficultyChosen] = React.useState(null);
  const [duration, setDuration] = React.useState();
  const [myrecipe, setmyrecipe] = React.useState(null);

  const ThisUserId=useSelector(state=>state.user.Id)

  // קריאת לשרת להעלת כל הקטרויות 
  React.useEffect(() => {
       server.getAllCategory()
       .then(x=>
        setCategoryArr(x.data))
       .catch(E=>console.log(E))
   }, [])



  return (
<div>
<div className='filter' >
{/* מסנן לפי  קטגוריות */}
      <div>
        <FormControl sx={{ minWidth: 180}}>
          <InputLabel id="demo-simple-select-autowidth-label">קטגוריות</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={category}
            onChange={(event)=> setcategory(event.target.value)}
          
            label="category"
          >
            <MenuItem value="" sx={{ minWidth: 180 }}>
              <em>ללא</em>
            </MenuItem>

            {categoryArr.map(item =>
              <MenuItem value={item.Id}>{item.Name}</MenuItem>)
            }
          </Select>
        </FormControl>
      </div>


{/* מסנן לפי דרגת קושי  */}
      <div>
        <FormControl sx={{  minWidth: 180}}>
          <InputLabel id="demo-simple-select-autowidth-label">רמת קושי</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={difficultyChosen}
            onChange={(event)=> setDifficultyChosen(event.target.value)}
          
          >
               <MenuItem value="" sx={{ minWidth: 180 }}>
              <em>ללא </em>
            </MenuItem>
            <MenuItem value="1" sx={{ minWidth: 180 }}>
              <em>1</em>
            </MenuItem>

            <MenuItem value="2" sx={{ minWidth: 180 }}>
              <em>2</em>
            </MenuItem>

            <MenuItem value="3" sx={{ minWidth: 180 }}>
              <em>3</em>
            </MenuItem>
          </Select>
        </FormControl>
      </div>


{/* מסנן לפי זמן הכנה */}
      <div>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="demo-simple-select-autowidth-label">זמן הכנה</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={duration}
            onChange={(e)=> setDuration (e.target.value)}
        
          >
              <MenuItem value="" sx={{ minWidth: 180 }}>
              <em>ללא הגבלת זמן </em>
            </MenuItem>
            <MenuItem value="10" sx={{ minWidth: 180 }}>
              <em>עד 10 דקות</em>
            </MenuItem>
            <MenuItem value="30" sx={{ minWidth: 180 }}>
              <em>עד 30 דקות</em>
            </MenuItem>
            <MenuItem value="60" sx={{ minWidth: 180 }}>
              <em>עד 60 דקות</em>
            </MenuItem>
     
          
          </Select>
        </FormControl>
      </div>


{/* מסנם לפי מתכונים שלי */}
      <div>
        <FormControl sx={{  minWidth: 180}}>
          <InputLabel id="demo-simple-select-autowidth-label">המתכונים שלי  </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={myrecipe}
            onChange={(e)=> setmyrecipe(e.target.value)}
            
          >
            <MenuItem value="" sx={{ minWidth: 180 }}>
              <em>ללא </em>
            </MenuItem>
              <MenuItem value={ThisUserId} sx={{ minWidth: 180 }}>
              <em> המתכונים שלי</em>
            </MenuItem>
            <MenuItem value="" sx={{ minWidth: 180 }}>
              <em> כל המתכונים </em>
            </MenuItem>    
          </Select>
        </FormControl>
      </div>

      </div>
   <FilterRecipe category={category} duration={duration} difficultyChosen={difficultyChosen} myrecipe={myrecipe}></FilterRecipe>


  </div>
  );
}








