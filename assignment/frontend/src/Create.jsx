import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
    const [values, setValues] = useState({
        name: '',
        address: '',
        contact: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/restaurants', values)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <h2>Add Restaurant</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={(e) => setValues({ ...values, name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" onChange={(e) => setValues({ ...values, address: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label">Contact</label>
                    <input type="text" className="form-control" id="contact" onChange={(e) => setValues({ ...values, contact: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
};

export default Create;