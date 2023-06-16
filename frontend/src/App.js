import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from 'react-router-dom';
import SpotList from './components/SpotList';
import SpotShow from "./components/SpotShow";
import ManageSpots from "./components/ManageSpots";
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpotForm";
import ManageReviews from "./components/ManageReviews"
import ManageBookings from "./components/ManageBookings";
import SpotSearch from "./components/SpotSearch";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  //render component in app.js, import into app.js
//route, path

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path={'/spots/new'}>
        <CreateSpotForm />
        </Route>
        <Route exact path={'/spots/current'}>
        <ManageSpots />
        </Route>
        <Route exact path={'/reviews/current'}>
        <ManageReviews />
        </Route>
        <Route exact path={'/bookings/current'}>
        <ManageBookings />
        </Route>
        <Route exact path={'/spots/query'}>
        <SpotSearch />
        </Route>
        <Route exact path={'/spots/:spotId/edit'}>
        <EditSpotForm />
        </Route>
        <Route exact path={'/spots/:spotId'}>
        <SpotShow />
        </Route>
        <Route exact path={'/'}>
        <SpotList />
        </Route>
        </Switch>}
    </>
  );
}

export default App;
