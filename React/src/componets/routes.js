import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Sign from './sign'
import Login from './login'
import Filter from './filters'
import UpdateRecipe from './addAndEditRecipe'
import CurrentRecipe from './currentRecipe'
import ShopingList from './soppingList'

const Rout = () => {
  return (
    <>

      <Routes>
        <Route path='/signup' element={<Sign />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/recipes' element={<Filter />} ></Route>
        <Route path='/recipes/:id' element={<CurrentRecipe />} ></Route>
        <Route path='/addRecipe' element={<UpdateRecipe />}></Route>
        <Route path='/editRecipe' element={<UpdateRecipe />}></Route>
        <Route path='/shopingList' element={<ShopingList />}></Route>

      </Routes>
    </>
  )
}

export default Rout
