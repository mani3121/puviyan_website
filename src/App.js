import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';

function App() {
  useEffect(() => {
    ReactGA.initialize('G-10VPK7VVXK'); // Replace with your ID
    ReactGA.send('pageview');
  }, []);

  return (
    <div>
      <h1>Puviyan Website</h1>
    </div>
  );
}

export default App;