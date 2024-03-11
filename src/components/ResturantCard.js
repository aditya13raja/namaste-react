import { IMG_CDN_URL } from "../constants";

const ResturantCard = ({ name, cloudinaryImageId, cuisines, avgRating  }) => { // can use 'props' instead then we need to use props.resturant....
  //we are using array destructering {resturant}
  return (
    <div className='resturant-card'>
      <img src={IMG_CDN_URL + cloudinaryImageId} alt='food-image'/>
      <h2>{name}</h2>
      <h2>{cuisines.join(", ")}</h2>
      <h3>{avgRating} stars</h3>
    </div>    
  )
};

export default ResturantCard;