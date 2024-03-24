export function filterData(searchTxt, resturants) {
  const filterData =  resturants.filter((resturant) => {
    return resturant.info.name.toLowerCase().includes(searchTxt.toLowerCase())
  })

  return filterData
}
