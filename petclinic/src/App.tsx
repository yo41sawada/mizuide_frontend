import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./component/Header";
import Logining from './component/Logining';
import springLogo from "./images/spring-pivotal-logo.png";
import Oups from './page/Oups';
import OwnersFind from './page/OwnersFind';
import Vets from './page/Vets';
import Welcome from "./page/Welcome";
import { user } from './type/user';


function App() {
  const [user, setUser] = useState<user>();
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container-fluid">
          <div className="container xd-container">
            <Routes>
              <Route path='/' element={<Welcome userName={user?.username}/>} />
              <Route path='/owners/find/*' element={<OwnersFind />} />
              <Route path='/vets' element={<Vets />} />
              <Route path='/oups' element={<Oups />} />
              <Route path='/login' element={<Logining setUser={setUser} />} />
            </Routes>
            <br />
            <br />
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <img src={springLogo} alt="Sponsored by Pivotal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
