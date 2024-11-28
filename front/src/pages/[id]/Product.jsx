import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        owner: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        category: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/product/${id}`);
                setProduct(response.data);
                setFormData({
                    owner: response.data.owner,
                    name: response.data.name,
                    description: response.data.description,
                    price: response.data.price,
                    stock: response.data.stock,
                    category: response.data.category
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

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
            await axios.put(`http://localhost:5000/product/${id}`, formData);
            setProduct(formData);
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
            await axios.delete(`http://localhost:5000/product/${id}`);

            window.location.href = '/home';
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
            <h1>Product</h1>
            {isEditing ? (
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Owner:</label>
                        <input
                            type="text"
                            name="owner"
                            value={formData.owner}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Stock:</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <div>
                    {product && (
                        <div>
                            <p>Owner: {product.owner}</p>
                            <p>Name: {product.name}</p>
                            <p>Description: {product.description}</p>
                            <p>Price: {product.price}</p>
                            <p>Stock: {product.stock}</p>
                            <p>Category: {product.category}</p>
                        </div>
                    )}
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => handleDelete()}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default Product;