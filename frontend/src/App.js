
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuperheroList from './components/SuperheroList';
import SuperheroDetails from './components/SuperheroDetails';
import SuperheroForm from './components/SuperheroForm';

function App() {
  return (
    <Router>
      <div> 
        <h1>Superhero Database</h1>
        <Routes>
          <Route path="/" element={<SuperheroList />} />
          <Route path="/superheroes/:id" element={<SuperheroDetails />} />
          <Route path="/create" element={<SuperheroForm />} />
          <Route path="/edit/:id" element={<SuperheroForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
