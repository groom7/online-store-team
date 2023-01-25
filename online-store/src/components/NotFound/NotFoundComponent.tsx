import './NotFoundComponent.scss';
import shockedCat from '../../assets/images/shocked-cat.png';
import { Link } from 'react-router-dom'

function NotFoundComponent() {
  return (
    <div className='not-found-container'>
      <img src={shockedCat} className='shocked-cat-icon' alt="shocked-cat" />
      <span className='not-found-title'>404 The page you are looking for was not found.</span>
      <Link to='/' className='start-shopping-button button' data-testid='start-shopping-button'>Start shopping</Link>
    </div>
  )
}

export default NotFoundComponent