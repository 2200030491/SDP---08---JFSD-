import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        aadhaarnumber: '',
        gender: '',
        mobile: '',
        dateofbirth: '',
        email: '',
        password: '',
        state: ''
    });

    const [errors, setErrors] = useState({
        aadhaarnumber: '',
        mobile: '',
    });

    const [message, setMessage] = useState(''); // State for the message

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validate Aadhaar number
        if (name === 'aadhaarnumber') {
            if (!/^\d*$/.test(value)) {
                setErrors({ ...errors, aadhaarnumber: 'Aadhaar number must contain only digits.' });
            } else if (value.length > 12) {
                setErrors({ ...errors, aadhaarnumber: 'Aadhaar number must be exactly 12 digits.' });
            } else {
                setErrors({ ...errors, aadhaarnumber: '' });
            }
        }

        // Validate Mobile number
        if (name === 'mobile') {
            if (!/^\d*$/.test(value)) {
                setErrors({ ...errors, mobile: 'Mobile number must contain only digits.' });
            } else if (value.length > 10) {
                setErrors({ ...errors, mobile: 'Mobile number must be exactly 10 digits.' });
            } else {
                setErrors({ ...errors, mobile: '' });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation before submission
        if (errors.aadhaarnumber || errors.mobile) {
            setMessage('Please fix the validation errors before submitting the form.');
            return;
        }

        if (!formData.gender) {
            setMessage('Please select a gender.');
            return;
        }

        if (!formData.dateofbirth) {
            setMessage('Please enter your Date of Birth.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        if (formData.password.length < 6) {
            setMessage('Password must be at least 6 characters long.');
            return;
        }

        try {
            // Make POST request to backend
            const response = await axios.post('http://localhost:2020/citizen/register', formData);
            if (response.status === 200) {
                setMessage('Registration successful!');
                // Reset form data
                setFormData({
                    name: '',
                    aadhaarnumber: '',
                    gender: '',
                    mobile: '',
                    dateofbirth: '',
                    email: '',
                    password: '',
                    state: ''
                });
                setErrors({
                    aadhaarnumber: '',
                    mobile: '',
                });
            } else {
                setMessage(`Registration failed: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
            setMessage('An error occurred while submitting the form. Please try again later.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Citizen Registration</h2>
            {message && <p style={styles.message}>{message}</p>} {/* Display the message */}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Aadhaar Number</label>
                    <input
                        type="text"
                        name="aadhaarnumber"
                        value={formData.aadhaarnumber}
                        onChange={handleChange}
                        placeholder="Enter your Aadhaar no"
                        style={styles.input}
                        required
                    />
                    {errors.aadhaarnumber && <p style={styles.errorText}>{errors.aadhaarnumber}</p>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Mobile No</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter your mobile no"
                        style={styles.input}
                        required
                    />
                    {errors.mobile && <p style={styles.errorText}>{errors.mobile}</p>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Date Of Birth</label>
                    <input
                        type="date"
                        name="dateofbirth"
                        value={formData.dateofbirth}
                        onChange={handleChange}
                        placeholder="Enter your Date Of Birth"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Set Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter your State"
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Register</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: 'auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    message: {
        textAlign: 'center',
        color: '#6200ea',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '5px',
        display: 'block',
        color: '#555',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        boxSizing: 'border-box',
    },
    button: {
        backgroundColor: '#6200ea',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px',
        transition: 'background-color 0.3s',
    },
    errorText: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    },
};

export default Registration;
