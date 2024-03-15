import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='header'>
      <Link to='/'>
        <img src='https://bcassetcdn.com/public/blog/wp-content/uploads/2019/07/18094833/the-red-cafe.png' alt='logo' height={150}/>
      </Link>

      <ul className='nav-list'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        <li>Cart</li>
      </ul>   
    </div>
   
  )
};

export default Header;
