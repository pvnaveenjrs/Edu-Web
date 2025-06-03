import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

const InstitutionList = () => {
  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const res = await api.get('/institutions');
      setInstitutions(res.data);
    } catch (err) {
      setError('Failed to fetch institutions');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this institution?')) return;
    try {
      await api.delete(`/institutions/${id}`);
      setInstitutions(institutions.filter(inst => inst._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <h2>Institutions</h2>
      <Link to="/institutions/new">Add New Institution</Link>
      {error && <p className="error-msg">{error}</p>}
      <table className="institution-table">
        <thead>
          <tr>
            <th>Name</th><th>Address</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {institutions.map(inst => (
            <tr key={inst._id}>
              <td>{inst.name}</td>
              <td>{inst.address}</td>
              <td>{inst.email}</td>
              <td>{inst.phone}</td>
              <td>
                <Link to={`/institutions/${inst._id}`}>View</Link> |{' '}
                <Link to={`/institutions/edit/${inst._id}`}>Edit</Link> |{' '}
                <button onClick={() => handleDelete(inst._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstitutionList;
