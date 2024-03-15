import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IMG_CDN_URL } from "../constants"

const ResturantMenu = () => {
  // const params = useParams();
  // const { id } = params;
  // or just destructure on fly
  const { resId } = useParams()

  const [resturant, setResturant] = useState({})

  const [resturantMenu, setResturantMenu] = useState({})

  useEffect(() => {
    getResturantInfo()
  }, [])

  async function getResturantInfo() {
    const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&lat=31.00480&lng=75.94630&restaurantId=` + resId)
     
    const json = await data.json();
    // console.log(json.data.cards[0].card.card.info.name)

    setResturant(json?.data?.cards[0]?.card?.card?.info) 
    
    setResturantMenu(json.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards)

    console.log(json.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards)
  }

  return (resturant === 0) ? <Shimmer /> : (
    <div className="resturant-detail">
      <div className="resturant-info"> 
        <h1>Resturnat id: { resId }</h1>
        <h2>{resturant.name}</h2>
        <img src={IMG_CDN_URL + resturant.cloudinaryImageId}/>
        <h3>{resturant.city}</h3>
        <h3>{resturant.areaName}</h3>
        <h3>{resturant.avgRating} stars</h3>
        <h3>{resturant.costForTwoMessage}</h3>
      </div>


      <div className="menu-items">
        <h2>Menu</h2> 
        <ul>
          {console.log(Object.values(resturantMenu))}
          {Object.values(resturantMenu).map((menuCard) => {
            return <li key={menuCard?.card?.info?.id}>
              {menuCard?.card?.info?.name}
                <img src={IMG_CDN_URL + menuCard.card.info.imageId} height={150}/>
              </li>
          })}

        </ul>
      </div>
    </div>
  )
} 

export default ResturantMenu