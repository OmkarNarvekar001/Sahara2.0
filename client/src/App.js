import './App.css';
import{BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from './Home';
import Profile from './Profile';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NearMe from './NearMe';
import Explore from './Explore';
import ProfileEdit from './ProfileEdit';
import Store from './context/Store';
import NewsList1 from './NewsList1'
import Donations from './Donations'

function App() {
  return (
    <Store>
      <Router>
      <div className="app">
      <Switch>

        <Route path="/nearme">
          <NearMe/>
        </Route>

        <Route path="/explore">
          <Explore/>
        </Route>

        <Route path="/donations">
          <Donations/>
        </Route>

        <Route path="/news">
          <NewsList1/>
        </Route>

        <Route path="/signup">
          <SignUp/>
        </Route>

        <Route path="/signin">
          <SignIn/>
        </Route>
        <Route path="/profile/edit" exact component={ProfileEdit}/>
        <Route path="/profile/:id" exact component={Profile}/>
        
        <Route path="/">
          <Home/>
        </Route>
        
      </Switch>
    </div>
    </Router>
    </Store>
  );
}

export default App;
