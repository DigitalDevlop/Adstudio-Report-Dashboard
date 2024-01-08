import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormCheck,
    CRow,
} from '@coreui/react';
import { Link,useLocation } from 'react-router-dom';
import { fetchPublishers } from 'src/common/axiosCall';
import axios from 'axios';
const TOKEN = process.env.REACT_APP_TOKEN

const PublisherSelectPage = () => {
    const location = useLocation();
    const [allFormData, setAllFormData] = useState(location.state);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPublishers, setFilteredPublishers] = useState([]);
    const [selectedPublishers, setSelectedPublishers] = useState([]);
    const [publisherData, setpublisherData] = useState([]);

    useEffect(() => {
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkphbmFrYSBQIiwiZW1haWwiOiJqYW5ha2EucEBkaWdpdGFseGxhYnMuY29tIiwicm9sZSI6IkFETUlOIiwic3RhdHVzIjoxLCJpYXQiOjE3MDE5MTk5NTksImV4cCI6MTcwMTk0MTU1OX0.zB-G4z-ySrxbrgPI7VVYrnrzDrt6BBelcFk6oBPa1pM";
        const token = TOKEN;
        fetchPublishers(token)
            .then((data) => {
                setpublisherData(data);
              
            })
            .catch((error) => {
                console.error('Error fetching publishers:', error);
            });
    }, [searchQuery]);

    useEffect(() => {
        filterPublishers(searchQuery);
    }, [publisherData, searchQuery]);

    const filterPublishers = (query) => {
        if (!query) {
            setFilteredPublishers(publisherData);
        } else {
            const filtered = publisherData.filter((publisher) =>
                publisher.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPublishers(filtered);
        }
    };
    

   

    const handleCheckboxChange = (id) => {
        setSelectedPublishers((prevSelected) => ({
            ...prevSelected,
            [id]: !prevSelected[id],
        }));
    };


    const handleSubmit =async () => {
        const selectedIds = Object.keys(selectedPublishers).filter((id) => selectedPublishers[id]);

        setAllFormData((allFormData) => ({
            ...allFormData,
            publisher: selectedIds,
        }));



       
        
        console.log('Combined Data:', allFormData);

        console.log('Combined Data:', allFormData.allFormData);

                const data = {
                    ...allFormData.allFormData,publisher:selectedIds
                }


                console.log("############3",data);
                const response = await axios.post('http://localhost:3000/api/user/create', {data: data});
        if (response.status === 200) {
          console.log('Server response:', response);
          // Handle success
        } else {
          console.error('Server responded with status:', response.status);
          console.error('Response data:', response.data);
          // Handle errors here
        }
        console.log('Selected Publishers IDs:', selectedIds);

      
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>Publisher</h1>
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="Search Publishers"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <br />
                                    <br />
                                    <div className="d-flex flex-wrap">
                                        {filteredPublishers.map((publisher, index) => (
                                            <div className="w-50" key={index}>
                                                <CFormCheck
                                                    inline
                                                    id={`inlineCheckbox${index}`}
                                                    label={publisher.name}
                                                    checked={selectedPublishers[publisher.id] || false}
                                                    onChange={() => handleCheckboxChange(publisher.id)}
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

export default PublisherSelectPage;
