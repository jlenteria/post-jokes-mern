import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import setAuthToken from "./redux/utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/FooterLayout";
import LandingPage from "./components/layouts/landing/LandingPage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { logoutUser, setCurrentUser } from "./redux/actions/AuthAction";
import PrivateRoute from "./components/common/PrivateRoute";
import LatestLayout from "./components/layouts/profile/itemLayout/LatestLayout";
import TopLayout from "./components/layouts/profile/itemLayout/TopLayout";
import ProfileLayout from "./components/layouts/profile/itemLayout/ProfileLayout";
import SettingLayout from "./components/layouts/profile/itemLayout/SettingLayout";
import About from "./components/common/About";
import Contact from "./components/common/Contact";

//check for token;
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div id="body-content">
          <Switch>
            <Route exact component={LandingPage} path="/" />
            <Route exact component={Login} path="/login" />
            <Route exact component={Register} path="/register" />
            <Route exact component={LatestLayout} path="/latest" />
            <Route exact component={TopLayout} path="/top" />
            <Route exact component={About} path="/about-me" />
            <Route exact component={Contact} path="/contact-me" />
            <PrivateRoute exact component={ProfileLayout} path="/profile-me" />
            <PrivateRoute exact component={SettingLayout} path="/settings" />
          </Switch>
        </div>
      </BrowserRouter>
      <Footer />
    </Provider>
  );
};

export default App;
