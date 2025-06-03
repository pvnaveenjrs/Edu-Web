import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useParams, Link } from 'react-router-dom';

const InstitutionView = () => {
  const { id } = useParams();
  const [institution, setInstitution] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/institutions/${id}`)
      .then(res => setInstitution(res.data))
      .catch(() => setError('Failed to load institution'));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!institution) return <p>Loading...</p>;

  return (
    <div>
      <h2>{institution.name}</h2>
      <p><strong>Address:</strong> {institution.address}</p>
      <p><strong>Email:</strong> {institution.email}</p>
      <p><strong>Phone:</strong> {institution.phone}</p>
      <Link to="/institutions">Back to list</Link>
    </div>
  );
};

export default InstitutionView;
