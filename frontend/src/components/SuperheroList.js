
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SuperheroList = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSuperheroes();
  }, [page]);

  const fetchSuperheroes = async () => {
    const response = await axios.get(`http://localhost:4000/api/superheroes?page=${page}`);
    setSuperheroes(response.data);
  };

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <Link to="/create">Add Superhero</Link>
      <ul>
        {superheroes.map(hero => (
          <li key={hero._id}>
            <Link to={`/superheroes/${hero._id}`}>
              {hero.nickname} <img src={hero.image} alt={hero.nickname} width="50" />
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default SuperheroList;
