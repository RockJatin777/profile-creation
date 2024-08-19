import React, { useState, useEffect } from 'react';

import Popup from 'reactjs-popup'
import { CiCirclePlus } from "react-icons/ci";

import './App.css';

function App() {
    const [profiles, setProfiles] = useState([]);
    const [profileData, setProfileData] = useState({
        name: '',
        age: '',
        location: '',
        profession: ''
    });

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        const response = await fetch('http://localhost:8000/api/profiles');
        const data = await response.json();
        setProfiles(data);
    };

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const createProfile = async (e) => {
      e.preventDefault();
      if (profileData.name && profileData.age && profileData.location && profileData.profession) {
        await fetch('http://localhost:8000/api/profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData),
      });
      setProfileData({ name: '', age: '', location: '', profession: '' });
      } else {
        alert('Please fill out all fields');
      }
      fetchProfiles();
      window.location.reload();
    };

    return (
        <article className='app-container'>
            <header className='header'>
              <h1>User Profiles</h1>
              <Popup
                modal
                  trigger={
                    <button type='button' className='create-btn'>
                      <CiCirclePlus size={25} color="#000" />
                      Create New Profile
                    </button>
                  }>
                    {close => (
                      <form className='popup-form' onSubmit={createProfile}>
                        <h2>Add new profile</h2>
                        <label for="name">Name:</label>
                        <input id='name' name="name" value={profileData.name} onChange={handleChange} placeholder="Name" required />
                        <label for="age">Age:</label>
                        <input id='age' name="age" type="number" value={profileData.age} onChange={handleChange} placeholder="Age" required />
                        <label for="location">Location:</label>
                        <input is='location' name="location" value={profileData.location} onChange={handleChange} placeholder="Location" required />
                        <label for="profession">Profession:</label>
                        <input is="profession" name="profession" value={profileData.profession} onChange={handleChange} placeholder="Profession" required />
                        <div className='btn-container'>
                          <button className='popup-create-btn' type="submit">Create Profile</button>
                          <button className='popup-create-btn' type="submit" onClick={() => close()}>Cancel</button>
                        </div>
                      </form>
                    )}
                </Popup>
            </header>
            <section className='table-section'>
              <table className='table'>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Location</th>
                  <th>Profession</th>
                </tr>
                  {profiles.map((profile, index) => (
                    <tr key={index}>
                      <td>{profile.name}</td>
                      <td>{profile.age}</td>
                      <td>{profile.location}</td>
                      <td>{profile.profession}</td>
                    </tr>
                  ))}
              </table>
            </section>
        </article>
    );
}

export default App;
