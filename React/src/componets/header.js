import { Menu } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';


const Header = () => {
  const UserName=useSelector(state=>state.user.Name)

  const navigate = useNavigate();
  const handleItemClick = (name) => navigate(`/${name}`)
const showName=`${UserName} שלום ל `
  return (
    
<Fragment>
  {!UserName?
  
    <Stack direction="row" spacing={2}>
    <Link to={'/login'}>   <Button variant="contained" > כניסה </Button></Link>
    <Link to={'/signup'}>   <Button variant="contained" > הרשמה </Button></Link>
  </Stack>:

    <Menu color={"crimson"} inverted widths={5} style={{ height: "60px", }}>
  <Menu.Item
        name= {showName}
       
      />

      <Menu.Item
        name='מתכונים'
        onClick={() => handleItemClick('recipes')}
      />
      <Menu.Item
        name='הוספת מתכון'

        onClick={() => handleItemClick('addRecipe')}
      />
      <Menu.Item
        name='רשימת קניות'

        onClick={() => handleItemClick('shopingList')}
      />
          <Menu.Item
        name='קצת עלינו'

        onClick={() => handleItemClick('homepage')}
      />


    </Menu>}
    </Fragment> 
  )
}



export default Header