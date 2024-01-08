import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CRow,
    CFormCheck
} from '@coreui/react';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { fetchAdvetisers } from 'src/common/axiosCall';

const AdvertiserSelectPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAdvertisers, setFilteredAdvertisers] = useState([]);
    const [selectedAdvertisers, setSelectedAdvertisers] = useState({});

    const advertisers = [];

    const filterAdvertisers = (query) => {
        if (!query) {
            setFilteredAdvertisers(advertisers);
        } else {
            const filtered = advertisers.filter((advertiser) =>
                advertiser.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredAdvertisers(filtered);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedAdvertisers((prevSelected) => ({
            ...prevSelected,
            [id]: !prevSelected[id],
        }));
    };

    const handleSubmit = () => {
        const selectedIds = Object.keys(selectedAdvertisers).filter((id) => selectedAdvertisers[id]);
        console.log('Selected Advertiser IDs:', selectedIds);
    };

    useEffect(() => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkphbmFrYSBQIiwiZW1haWwiOiJqYW5ha2EucEBkaWdpdGFseGxhYnMuY29tIiwicm9sZSI6IkFETUlOIiwic3RhdHVzIjoxLCJpYXQiOjE2OTk1MDA4MDgsImV4cCI6MTY5OTUyMjQwOH0.B9yYnbFUuQ1M-Yr8vUkpvJ9aR5JRSoJM0E-qcQaZnZc"; // Replace with your API token
        fetchAdvetisers(token)
            .then((data) => {
                advertisers.length = 0;
                advertisers.push(...data[0]); // Assuming the advertiser names are in data[0]
                filterAdvertisers(searchQuery);
            })
            .catch((error) => {
                console.error('Error fetching advertisers:', error);
            });
    }, [searchQuery]);

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>Advertiser</h1>
                                    <input
                                        type="text"
                                        placeholder="Search Advertisers"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <br />
                                    <br />

                                    <div className="d-flex flex-wrap">
                                        {filteredAdvertisers.map((advertiser, index) => (
                                            <div className="w-50" key={index}>
                                                <CFormCheck
                                                    inline
                                                    id={`inlineCheckbox${index}`}
                                                    label={advertiser.name}
                                                    checked={selectedAdvertisers[advertiser.id] || false}
                                                    onChange={() => handleCheckboxChange(advertiser.id)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <br />
                                    <br />

                                    <div className="d-flex justify-content-between">
                                        <Link to="/register">
                                            <CButton color="primary">Previous</CButton>
                                        </Link>
                                        <CButton color="success" onClick={handleSubmit}>
                                            Submit
                                        </CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default AdvertiserSelectPage;
