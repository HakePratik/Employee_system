import React, { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    setSubmitted(formData);
    setError('');
  };

  return (
    <div>
      <h2>User Form</h2>
      <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
      <input placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
      <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {submitted && (
        <div>
          <h3>Submitted Data:</h3>
          <p>Name: {submitted.name}</p>
          <p>Email: {submitted.email}</p>
        </div>
      )}
    </div>
  );
}

export default UserForm;
