import logo from './logo.svg';
import './App.css';
import React, {useEffect} from 'react';
import {
	subscribeToChat,
	initiateSocketConnection,
	disconnectSocket,
} from "./socketio.service";
function App() {
  useEffect(() => {
    initiateSocketConnection();
    subscribeToChat((err, data) => {
      console.log(data);
    });
    return () => {
      disconnectSocket();
    }
  }, []);
  return (
    <div className="App">
    <p>notification</p>
    </div>
  );
}

export default App;
