import React, { useState } from 'react'
import './home.css'
import Header from '../../components/header/header'
import ExploreMenu from '../../components/Explore-menu/explore-menu'
import FoodDisply from '../../components/FoodDisplay/FoodDisply'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {
  const [category,setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisply category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home