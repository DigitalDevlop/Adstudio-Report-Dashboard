import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CRow,
    CFormCheck
} from '@coreui/react';
import { Link } from 'react-router-dom';
import { fetchPublishers } from 'src/common/axiosCall';

function InternalselectPage(){

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPublishers, setFilteredPublishers] = useState([]);
    const publishers = [];

    const filterPublishers = (query) => {
        if (!query) {
            setFilteredPublishers(publishers);
        } else {
            const filtered = publishers.filter((publisher) =>
                publisher.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPublishers(filtered);
        }
    };

    useEffect(() => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkphbmFrYSBQIiwiZW1haWwiOiJqYW5ha2EucEBkaWdpdGFseGxhYnMuY29tIiwicm9sZSI6IkFETUlOIiwic3RhdHVzIjoxLCJpYXQiOjE2OTg4MDg2MDEsImV4cCI6MTY5ODgzMDIwMX0.N8gIALRwF7Utze1uJyporXIa-KFy3DWZfy7zDMDh-L8";
        fetchPublishers(token) // Call the fetchPublishers function
            .then((data) => {
                // Assuming the response from the API is an array of publisher names
                // Update the publishers state with the fetched data
                publishers.length = 0; // Clear the publishers array
                publishers.push(...data); // Add the fetched data to the array
                filterPublishers(searchQuery); // Trigger filtering with the fetched data
            })
            .catch((error) => {
                // Handle API call error
                console.error('Error fetching publishers:', error);
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
                                    <h1>Internal</h1>
                                    <br />
                                    {/*  gfhfhfhffgf */}
                                    
                                    <br />
                                    <div className="d-flex justify-content-between">
                                        <Link to="/register">
                                            <CButton color="primary">
                                                Previous
                                            </CButton>
                                        </Link>
                                        <CButton color="success">Submit</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
}

export default InternalselectPage