import './Footer.scss'
import githubLogo from '../../assets/images/github-logo.png'

function Footer() {
  return (
    <footer>
      <div className='outer-wrapper'>
        <div className="github-block" data-testid='github-block'>
          <a className="image-link github-block__link" href="https://github.com/groom7">
            <img className="github-block__logo hoverOpacity" src={githubLogo} alt="github logo"/>
          </a>
        </div>
        <div className="github-block">
          <a className="image-link github-block__link" href="https://github.com/DanilBvc">
            <img className="github-block__logo hoverOpacity" src={githubLogo} alt="github logo" />
          </a>
        </div>
        <div className="rss-block">
          <a className="image-link rss-block__link" href="https://rs.school/js/">
            <img className="rss-block__logo hoverOpacity" src="https://rs.school/images/rs_school_js.svg" alt="rs.school logo" />
          </a>
        </div>
        <div className="developed-year">2023</div>
      </div>
    </footer>
  )
}

export default Footer