import './App.css';
import Home from './Components/Home';
import AddVehicle from './Components/AddVehicle';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UpdateVehicle from './Components/UpdateVehicle';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/addemp">
            <AddVehicle/>
          </Route>

          <Route path="/Update:id">
            <UpdateVehicle/>
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
