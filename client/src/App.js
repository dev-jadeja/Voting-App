import React, {Fragment} from 'react';
import NavigationBar from "./components/Layout/NavigationBar/NavigationBar";
import Landing from "./components/Layout/Landing/Landing";

const App = () => {
  return (
    <Fragment>
      <NavigationBar />
      <Landing />
    </Fragment>
  );
}

export default App;
