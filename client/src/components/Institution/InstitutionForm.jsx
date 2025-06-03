import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const InstitutionForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.get(`/institutions/${id}`).then(res => setForm(res.data)).catch(() => setError('Failed to fetch institution'));
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (isEdit) {
        await api.put(`/institutions/${id}`, form);
      } else {
        await api.post('/institutions', form);
      }
      navigate('/institutions');
    } catch (err) {
      setError('Save failed');
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit' : 'Add'} Institution</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default InstitutionForm;
