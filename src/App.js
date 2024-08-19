import React, { useState, useEffect } from 'react'; // Import React, useState for state management, and useEffect for side effects
import Popup from 'reactjs-popup'; // Import Popup component for creating modals
import { CiCirclePlus } from "react-icons/ci"; // Import an icon from react-icons library

import './App.css'; // Import custom CSS for styling

function App() {
    const [profiles, setProfiles] = useState([]); // State to store the list of profiles
    const [profileData, setProfileData] = useState({ // State to store the form data for a new profile
        name: '',
        age: '',
        location: '',
        profession: ''
    });

    useEffect(() => {
        fetchProfiles(); // Fetch profiles when the component is first rendered
    }, []);

    // Function to fetch profiles from the server
    const fetchProfiles = async () => {
        const response = await fetch('http://localhost:8000/api/profiles'); // Fetch data from the API
        const data = await response.json(); // Parse the response as JSON
        setProfiles(data); // Update the profiles state with the fetched data
    };

    // Function to handle input changes in the form
    const handleChange = (e) => {
        setProfileData({
            ...profileData, // Copy the existing profileData
            [e.target.name]: e.target.value, // Update the specific field that changed
        });
    };

    // Function to create a new profile
    const createProfile = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (profileData.name && profileData.age && profileData.location && profileData.profession) {
            // If all fields are filled, send the profile data to the server
            await fetch('http://localhost:8000/api/profiles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, // Set headers to indicate JSON data
                body: JSON.stringify(profileData), // Convert profile data to JSON string
            });
            // Reset the form fields after submission
            setProfileData({ name: '', age: '', location: '', profession: '' });
        } else {
            alert('Please fill out all fields'); // Alert the user if any field is empty
        }
        fetchProfiles(); // Fetch the updated list of profiles
        window.location.reload(); // Reload the page to reflect the changes
    };

    return (
        <article className='app-container'>
            <header className='header'>
                <h1>User Profiles</h1>
                <Popup
                    modal
                    trigger={
                        <button type='button' className='create-btn'>
                            <CiCirclePlus size={25} color="#000" /> {/* Display the plus icon */}
                            Create New Profile
                        </button>
                    }>
                    {close => (
                        <form className='popup-form' onSubmit={createProfile}>
                            <h2>Add new profile</h2>
                            <label htmlFor="name">Name:</label>
                            <input id='name' name="name" value={profileData.name} onChange={handleChange} placeholder="Name" required />
                            <label htmlFor="age">Age:</label>
                            <input id='age' name="age" type="number" value={profileData.age} onChange={handleChange} placeholder="Age" required />
                            <label htmlFor="location">Location:</label>
                            <input id='location' name="location" value={profileData.location} onChange={handleChange} placeholder="Location" required />
                            <label htmlFor="profession">Profession:</label>
                            <input id="profession" name="profession" value={profileData.profession} onChange={handleChange} placeholder="Profession" required />
                            <div className='btn-container'>
                                <button className='popup-create-btn' type="submit">Create Profile</button> {/* Submit button to create a new profile */}
                                <button className='popup-create-btn' type="button" onClick={() => close()}>Cancel</button> {/* Button to close the popup without submitting */}
                            </div>
                        </form>
                    )}
                </Popup>
            </header>
            <section className='table-section'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Location</th>
                            <th>Profession</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map((profile, index) => (
                            <tr key={index}>
                                <td>{profile.name}</td>
                                <td>{profile.age}</td>
                                <td>{profile.location}</td>
                                <td>{profile.profession}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </article>
    );
}

export default App;

