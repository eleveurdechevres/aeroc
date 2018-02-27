import * as React from 'react';
//import logo from './logo.svg';
import './app.css';
//import { GraphicComponent } from './pages/GraphicComponent.jsx';
import { DashBoard } from './pages/DashBoard.jsx';
export class App extends React.Component {

  render() {
    return (
      <div className="App">
      {/*}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <GraphicComponent />
      */}
        <DashBoard />
      </div>
    );
  }
}
