import ResturantCard from './ResturantCard'
import { useState, useEffect } from 'react'
import Shimmer from './Shimmer'
import { Link } from 'react-router-dom'
import { filterData } from '../utils/helper'
import useOnline from '../utils/useOnline'

const Body = ({user}) => {

  const [allResturants, setAllResturants] = useState([])
  const [searchTxt, setSearchTxt] = useState("")
  const [filteredResturants, setFilteredResturants] = useState([])

  useEffect(() => {
    console.log("useEffect rendered")
    getResturants()
  },[])

  async function getResturants() {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=31.00480&lng=75.94630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    const json = await data.json()
    console.log(json)

    setAllResturants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setFilteredResturants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)

  }

  const isOnline = useOnline();

  // if (!isOnline) {
  //   return <h1>Offline, please check internet connection!!</h1>
  // }

  // not render component early
  if(!allResturants) return null;

  // if no resturnat is found in search
  if (filteredResturants.length === 0) return <Shimmer />

  // Adding condition to add SHIMMER UI while loading...
  return  (allResturants.length === 0) ? (
  <Shimmer/>
  ) : (
    <>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search'
          value={searchTxt}
          className='search-input'
          onChange={(e) => {
            setSearchTxt(e.target.value)
          }}
        />

        <button
          className='search-btn'
          onClick={() => {
            const data = filterData(searchTxt, allResturants)

            setFilteredResturants(data)
          }}
        >Search</button>
      </div>

      <div className='resturant-list'>
        {
          filteredResturants.map((resturant) => {
            console.log(resturant.info.id)
            return (
              <Link to={"/resturant/" + resturant.info.id}>
                <ResturantCard {...resturant.info}  key={resturant.info.id} user={user}/>
              </Link>
            )
          })
        }
      </div>
    </>
  )
}

export default Body
