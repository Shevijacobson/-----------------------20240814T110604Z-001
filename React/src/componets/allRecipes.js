import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import * as server from '../axios/Recipe'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


// עיצובים

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 300,
  [theme.breakpoints.down('sm')]: {
    width: '50% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));
//קומפוננטה
const FilterRecipe = ({ category, duration, difficultyChosen, myrecipe }) => {
  const [recipes, setRecipes] = React.useState();

  const userId = useSelector(state => state.user.Id);
  let rrr = [];
  // קריאת לשרת להעלות את כל המתכונים 
  React.useEffect(() => {
    rrr = server.getAllRecipes({ setRecipes })
  }, [])

  const navigate = useNavigate();
  const widthes = ["35%", "25%", "30%", "27%", "35%", "28%"];
  let index = 0;

  
  return (

    <>
      <p className='TitleRecipes' >מתכונים</p>
      <div className='recipes'>
        <Box className='boxRecipe'>

          {recipes ? recipes.map((image) =>

            (image.Difficulty == difficultyChosen || !difficultyChosen)
              &&
              (image.CategoryId == category || !category)
              &&
              (userId == image.UserId || !myrecipe)
              &&
              (duration >= image.Duration || !duration)

              ?

              <ImageButton
                focusRipple
                key={image.Name}
                style={{
                  
                  width: widthes[index + 1],
                }}
              >
                <ImageSrc style={{ backgroundImage: `url(${image.Img})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>

                  <Typography onClick={() => navigate(`/recipes/${image.Id}`)}
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image.Name}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>  {image.DifficultyChosen}
              </ImageButton>
              : null) : null}
        </Box></div></>
  );
}

export default FilterRecipe;
