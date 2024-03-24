import { useState, useEffect } from "react"

const useResturant = (resId) => {

  const [resturantMenu, setResturantMenu] = useState(null)

  useEffect(() => {
    getResturantInfo()
  }, [])

  async function getResturantInfo() {
    const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&lat=31.00480&lng=75.94630&restaurantId=` + resId)

    const json = await data.json();
    // console.log(json.data.cards[0].card.card.info.name)

    // setResturant(json?.data?.cards[0]?.card?.card?.info)

    setResturantMenu(json.data)

    console.log(json.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards)
  }

  return resturantMenu;

}

export default useResturant
