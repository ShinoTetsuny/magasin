import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            const { id } = JSON.parse(atob(token.split('.')[1]));

            try {
                const response = await axios.get(`http://localhost:5000/user/${id}`);
                setUser(response.data);
                setFormData({
                    username: response.data.username,
                    email: response.data.email,
                    role: response.data.role
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const { id } = JSON.parse(atob(token.split('.')[1]));
            await axios.put(`http://localhost:5000/user/${id}`, formData);
            setUser(formData);
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const { id } = JSON.parse(atob(token.split('.')[1]));
            await axios.delete(`http://localhost:5000/user/${id}`);
            localStorage.removeItem('token');
            window.location.href = '/login';
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Profile</h1>
            {isEditing ? (
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Role:</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <div>
                    {user && (
                        <div>
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                        </div>
                    )}
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => handleDelete()}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default Profile;