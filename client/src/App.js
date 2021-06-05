import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
//라우팅 관련 처리
function App() {
  return (
    <Router>
      <div>
        

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/login" component={LandingPage} />
            <LoginPage />
          </Route> */}
          {/* 라우트 설정할때 exact를 쓰는 이유는 주어진 경로와 정확히 일치해야 설정한 component를 보여준다. */}
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/" component={Auth(LandingPage, null)} />

        </Switch>
      </div>
    </Router>
  );
}


export default App;
