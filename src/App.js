import React, { Component } from 'react';
import './App.css';
import Chat from './Chat/Chat'
import Sidebar from './Sidebar/Sidebar';
class App extends Component {
  render() {
    return (
      <div className="App">
     <div className="App_Body">
         <Sidebar />
         <Chat />
     </div>

      </div>
    );
  }
}

export default App;
