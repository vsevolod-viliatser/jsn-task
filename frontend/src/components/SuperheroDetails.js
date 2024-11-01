
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const SuperheroDetails = () => {
  const { id } = useParams();
  const [superhero, setSuperhero] = useState(null);

  useEffect(() => {
    fetchSuperhero();
  }, []);

  const fetchSuperhero = async () => {
    const response = await axios.get(`http://localhost:4000/api/superheroes/${id}`);
    setSuperhero(response.data);
  };

  if (!superhero) return <div>Loading...</div>;

  return (
    <div>
      <h2>{superhero.nickname}</h2>
      <p><strong>Real Name:</strong> {superhero.real_name}</p>
      <p><strong>Origin:</strong> {superhero.origin_description}</p>
      <p><strong>Superpowers:</strong> {superhero.superpowers.join(', ')}</p>
      <p><strong>Catchphrase:</strong> {superhero.catch_phrase}</p>
      <h3>Images:</h3>
      {superhero.images.map((image, index) => (
        <img key={index} src={image} alt={`${superhero.nickname} image`} width="100" />
      ))}
      <Link to={`/edit/${superhero._id}`}>Edit</Link>
    </div>
  );
};

export default SuperheroDetails;
