
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SuperheroForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
    images: [],
  });

  useEffect(() => {
    if (id) {
      fetchSuperhero();
    }
  }, [id]);

  const fetchSuperhero = async () => {
    const response = await axios.get(`http://localhost:4000/api/superheroes/${id}`);
    const superhero = response.data;
    setFormData({
      nickname: superhero.nickname,
      real_name: superhero.real_name,
      origin_description: superhero.origin_description,
      superpowers: superhero.superpowers.join(', '),
      catch_phrase: superhero.catch_phrase,
      images: superhero.images.join(', '),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      superpowers: formData.superpowers.split(',').map(sp => sp.trim()),
      images: formData.images.split(',').map(img => img.trim()),
    };
    
    if (id) {
      await axios.put(`http://localhost:4000/api/superheroes/${id}`, data);
    } else {
      await axios.post('http://localhost:4000/api/superheroes', data);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nickname:</label>
        <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} required />
      </div>
      <div>
        <label>Real Name:</label>
        <input type="text" name="real_name" value={formData.real_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Origin Description:</label>
        <textarea name="origin_description" value={formData.origin_description} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Superpowers (comma separated):</label>
        <input type="text" name="superpowers" value={formData.superpowers} onChange={handleChange} required />
      </div>
      <div>
        <label>Catch Phrase:</label>
        <input type="text" name="catch_phrase" value={formData.catch_phrase} onChange={handleChange} />
      </div>
      <div>
        <label>Images (comma separated URLs):</label>
        <input type="text" name="images" value={formData.images} onChange={handleChange} />
      </div>
      <button type="submit">{id ? 'Update' : 'Create'} Superhero</button>
    </form>
  );
};

export default SuperheroForm;
