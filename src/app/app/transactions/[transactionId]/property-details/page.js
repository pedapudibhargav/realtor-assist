'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter for extracting transactionId
import ArrowDownCircle from 'bootstrap-icons/icons/arrow-down-circle.svg';
import { GetTransactionById, UpdateTransactionById } from '@/services/transactionService';
import { Card, CardBody } from 'react-bootstrap';

export default function PropertyDetails() {
    const [formData, setFormData] = useState({
        mlsNumber: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        dateListed: '',
    });
    const { transactionId } = useParams();
    const [errors, setErrors] = useState({});
    const router = useRouter(); // Initialize useRouter
    const [transaction, setTransaction] = React.useState(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            if (!transactionId) {
                router.push('./app/transactions');
                return;
            }
            const fetchedTransaction = await GetTransactionById(transactionId);
            if (!fetchedTransaction) {
                router.push('./app/transactions');
            } else {
                setTransaction(fetchedTransaction);
            }
        };
        fetchTransaction();
    }, []);

    useEffect(() => {
        if (transaction?.property_details) {
            setFormData({
                ...formData,
                ...transaction.property_details,
            });
        }
    }, [transaction]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        // if (!formData.mlsNumber) newErrors.mlsNumber = 'MLS number is required.';
        if (!formData.address) newErrors.address = 'Address is required.';
        if (!formData.city) newErrors.city = 'City is required.';
        if (!formData.state) newErrors.state = 'State is required.';
        if (!formData.zipCode) newErrors.zipCode = 'Zip code is required.';
        if (!formData.price) newErrors.price = 'Price is required.';
        if (!formData.bedrooms) newErrors.bedrooms = 'Number of bedrooms is required.';
        if (!formData.bathrooms) newErrors.bathrooms = 'Number of bathrooms is required.';
        if (!formData.dateListed) newErrors.dateListed = 'Date listed is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const payload = { transaction, property_details: formData };
            console
            UpdateTransactionById(transactionId, payload);
            console.log(JSON.stringify(formData, null, 2));
        }
    };

    const handleSyncFromMLS = async () => {
        try {
            const response = await fetch(`https://api.example.com/mls/${formData.mlsNumber}`);
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    ...formData,
                    address: data.address || '',
                    city: data.city || '',
                    state: data.state || '',
                    zipCode: data.zipCode || '',
                    price: data.price || '',
                    bedrooms: data.bedrooms || '',
                    bathrooms: data.bathrooms || '',
                    dateListed: data.dateListed || '',
                });
            } else {
                console.error('Failed to fetch MLS data');
            }
        } catch (error) {
            console.error('Error fetching MLS data:', error);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <Card className="bg-dark text-white border-dark">
                        <CardBody>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className={`form-control ${errors.mlsNumber ? 'is-invalid' : ''}`}
                                    placeholder="Enter MLS number with # (will be available soon.... Enter data manually for now)"
                                    aria-label="MLS number with #"
                                    aria-describedby="import from MLS"
                                    name="mlsNumber"
                                    value={formData.mlsNumber}
                                    onChange={handleChange}
                                />
                                <button className="btn btn-primary" disabled type="button" id="btn-sync-from-mls" onClick={handleSyncFromMLS}>
                                    <img src={ArrowDownCircle} alt="Sync from MLS" width="16" height="16" style={{ filter: 'invert(100%)' }} /> Sync from MLS
                                </button>
                                {errors.mlsNumber && <div className="invalid-feedback">{errors.mlsNumber}</div>}
                            </div>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>Property Location</h4>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                                placeholder="Address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                            />
                                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                                placeholder="City"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                            />
                                            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                                placeholder="State"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                            />
                                            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                                                placeholder="Zip Code"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                            />
                                            {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>Property Details</h4>
                                        <div className="mb-3">
                                            <input
                                                type="number"
                                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                                placeholder="Price"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                            />
                                            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                                            <select
                                                id="bedrooms"
                                                className={`form-select ${errors.bedrooms ? 'is-invalid' : ''}`}
                                                name="bedrooms"
                                                value={formData.bedrooms}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Bedrooms</option>
                                                {[...Array(10).keys()].map((num) => (
                                                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                                                ))}
                                            </select>
                                            {errors.bedrooms && <div className="invalid-feedback">{errors.bedrooms}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
                                            <select
                                                id="bathrooms"
                                                className={`form-select ${errors.bathrooms ? 'is-invalid' : ''}`}
                                                name="bathrooms"
                                                value={formData.bathrooms}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Bathrooms</option>
                                                {[...Array(10).keys()].map((num) => (
                                                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                                                ))}
                                            </select>
                                            {errors.bathrooms && <div className="invalid-feedback">{errors.bathrooms}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="dateListed" className="form-label">Date Listed on Market</label>
                                            <input
                                                type="date"
                                                id="dateListed"
                                                className={`form-control ${errors.dateListed ? 'is-invalid' : ''}`}
                                                name="dateListed"
                                                value={formData.dateListed}
                                                onChange={handleChange}
                                            />
                                            {errors.dateListed && <div className="invalid-feedback">{errors.dateListed}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <button type="submit" className="btn btn-success">Update Property Details</button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>

    );
}
