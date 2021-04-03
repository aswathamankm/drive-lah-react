
import './App.css';
import Nav from './pages/Nav';
import Home from './pages/Home';
import AdminLogin from './pages/Adminlogin';
import Admin from './pages/Admin';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
    <div className="App">
    <Nav/>
    <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/adminlogin' component={AdminLogin} />
    <Route exact path='/adminpage' component={Admin} />

    </Switch>
    </div>
    </Router>

  );
}

export default App;
