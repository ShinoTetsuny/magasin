import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        owner: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        category: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        if (token) {
            const { id } = JSON.parse(atob(token.split('.')[1]));
            setFormData((prevFormData) => ({
                ...prevFormData,
                owner: id // Adjust this according to your token structure
            }));
        }   
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/product', formData);
            alert(response.data.message);
        } catch (err) {
            alert(err.response.data.error);
        }
    };

    return (
        <div>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div>
                    <label>Stock:</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} required />
                </div>
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProduct;