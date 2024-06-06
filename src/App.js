import React from 'react';
import './App.css';
import ResponseTimeChecker from './components/ResponseTimeChecker';
import SVGGraphic from './components/SVGGraphic';
import TodoList from './components/TodoList';

import ContactForm from './components/ContactForm';
import TicTacToe from './components/TicTacToe';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Portfolio Projekt</h1>
      </header>
      <main>
        <div className="container">
          <div className="left">
            <ResponseTimeChecker />
            <TicTacToe />
          </div>
          <div className="center">
            <SVGGraphic />
            <ContactForm/>
          </div>
          <div className="right">
            <TodoList />
            
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;
