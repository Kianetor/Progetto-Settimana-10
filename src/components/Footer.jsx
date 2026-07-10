function Footer() {
  return (
    <footer className="footer">
      <p>
        Dati meteo forniti da{' '}
        <a href="https://openweathermap.org" target="_blank" rel="noreferrer">
          OpenWeatherMap
        </a>
      </p>
      <p>Progetto Epicode &middot; {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
