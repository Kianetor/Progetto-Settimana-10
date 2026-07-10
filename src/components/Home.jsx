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

      <div className="home-features">
        <div className="feature-card">
          <span className="feature-icon">🌡️</span>
          <h3>Meteo in tempo reale</h3>
          <p>Temperatura, umidità, vento e condizioni aggiornate al momento.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📅</span>
          <h3>Previsioni a 5 giorni</h3>
          <p>Scopri in anticipo il meteo dei prossimi giorni, giorno per giorno.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🌍</span>
          <h3>Qualsiasi città</h3>
          <p>Cerca una città in tutto il mondo e trova subito i risultati.</p>
        </div>
      </div>
    </section>
  )
}

export default Home
