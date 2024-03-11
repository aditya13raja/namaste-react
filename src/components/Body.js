import ResturantCard from './ResturantCard'
import { useState, useEffect } from 'react'
import Shimmer from './Shimmer' 

function filterData(searchTxt, resturants) {
  const filterData =  resturants.filter((resturant) => {
    return resturant.info.name.toLowerCase().includes(searchTxt.toLowerCase()) 
  }) 

  return filterData 
}

const Body = () => {

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

  // not render component early
  if(!allResturants) return null;

  // if no resturnat is found in search
  if (filteredResturants.length === 0) return <h1>No resturnat found</h1>

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
            return <ResturantCard {...resturant.info}  key={resturant.info.id}/>
          })
        }
      </div> 
    </>   
  ) 
}

export default Body 
