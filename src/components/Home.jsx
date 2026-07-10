import { Link } from 'react-router-dom'
import skyBg from '../assets/n_meteo.jpg'

function Home() {
  return (
    <section className="home">
      <Link to="/cerca" className="home-hero" style={{ backgroundImage: `url(${skyBg})` }}>
        <h2>Scopri il meteo di ogni città!</h2>
        <p>
          Cerca una città e scopri temperatura, umidità, vento e condizioni
          attuali, in tempo reale.
        </p>
      </Link>
    </section>
  )
}

export default Home
