import '../App.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <div className="welcome-header">
        <h1 className="welcome-title"><span className='cursive'>Welcome<br/></span> to DishDelights!</h1>
        <p className="explore-text">
          <Link to="/dishdelights" className="explore-button">Explore dishes</Link>
        </p>
      </div>
    </div>
  );
}