import React, { useState } from 'react';

function ProfileForm({ onCreate }) {
    const [form, setForm] = useState({
        name: '',
        age: '',
        location: '',
        profession: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.name && form.age && form.location && form.profession) {
            onCreate(form);
            setForm({ name: '', age: '', location: '', profession: '' });
        } else {
            alert('Please fill out all fields');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
            <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" required />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
            <input name="profession" value={form.profession} onChange={handleChange} placeholder="Profession" required />
            <button type="submit">Create Profile</button>
        </form>
    );
}

export default ProfileForm;
