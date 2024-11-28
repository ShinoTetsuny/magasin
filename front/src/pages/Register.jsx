import axios from 'axios';
import { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        try {
            const { data } = await axios.post('http://localhost:5000/auth/register', { username, email, password });
            localStorage.setItem('token', data.token);

            window.location.href = '/home';
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;