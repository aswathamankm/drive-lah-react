import  { Link } from 'react-router-dom';
import '../App.css'
function Nav(){

  return (
    <nav>
    <ul className='nav-link'>
    <Link to="/">
    <li>Home</li>
    </Link>
    <Link to="/adminlogin">
    <li>Admin</li>

    </Link>
    </ul>

    </nav>

  )

}
export default Nav;
