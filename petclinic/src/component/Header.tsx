import { NavLink } from "react-router-dom";
import { backend_url } from "../const/const";


const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" role="navigation">
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><span></span></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-navbar" style={{}}>
          <ul className="nav navbar-nav me-auto">

            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/" title="home page">
                <span className="fa fa-home"></span> <span>Home</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/owners/find" title="find owners">
                <span className="fa fa-search"></span> <span>Find owners</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/vets" title="veterinarians">
                <span className="fa fa-th-list"></span> <span>Veterinarians</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/oups" title="trigger a RuntimeException to see how it is handled">
                <span className="fa fa-exclamation-triangle"></span> <span>Error</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <a href={`http://${backend_url}/doAuth`} className="nav-link" title="login">
                <span className="fa fa-door-open"></span> <span>login</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header;