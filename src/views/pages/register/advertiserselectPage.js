// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { enableRipple } from '@syncfusion/ej2-base';
// import {
//     CButton,
//     CCard,
//     CCardBody,
//     CCol,
//     CContainer,
//     CForm,
//     CRow,
//     CFormCheck
// } from '@coreui/react';
// import 'react-checkbox-tree/lib/react-checkbox-tree.css';
// import { fetchAdvetisers } from 'src/common/axiosCall';
// import { fetchAdvetisersCampaigns } from 'src/common/axiosCall';

// const AdvertiserSelectPage = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredAdvertisers, setFilteredAdvertisers] = useState([]);
//     const [selectedAdvertisers, setSelectedAdvertisers] = useState({});
//     const [advertiserData, setAdvertiserData] = useState([]);

//     useEffect(() => {
//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkphbmFrYSBQIiwiZW1haWwiOiJqYW5ha2EucEBkaWdpdGFseGxhYnMuY29tIiwicm9sZSI6IkFETUlOIiwic3RhdHVzIjoxLCJpYXQiOjE3MDA1MzgzODYsImV4cCI6MTcwMDU1OTk4Nn0.D2Z6lyL8hyMqwJKG-sIGgrtuR3o3pYngvHTRtPYyAZ8";
//         fetchAdvetisers(token)
//             .then((data) => {
//                 setAdvertiserData(data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching advertisers:', error);
//             });
//     }, []); // Run only once on mount

//     useEffect(() => {
//         filterAdvertisers(searchQuery);
//     }, [advertiserData, searchQuery]);

//     const filterAdvertisers = (query) => {
//         if (!query) {
//             setFilteredAdvertisers(advertiserData);
//         } else {
//             const filtered = advertiserData.filter((advertiser) =>
//                 advertiser.name.toLowerCase().includes(query.toLowerCase())
//             );
//             setFilteredAdvertisers(filtered);
//         }
//     };

//     const handleCheckboxChange = (id) => {
//         setSelectedAdvertisers((prevSelected) => ({
//             ...prevSelected,
//             [id]: !prevSelected[id],
//         }));
//     };

//     const handleSubmit = () => {
//         const selectedIds = Object.keys(selectedAdvertisers).filter((id) => selectedAdvertisers[id]);
//         console.log('Selected Advertiser IDs:', selectedIds);
//     };

//     return (
//         <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
//             <CContainer>
//                 <CRow className="justify-content-center">
//                     <CCol md={9} lg={7} xl={6}>
//                         <CCard className="mx-4">
//                             <CCardBody className="p-4">
//                                 <CForm>
//                                     <h1>Advertiser</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="Search Advertisers"
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                     />
//                                     <br />
//                                     <br />
//                                     <div className="d-flex flex-wrap">
//                                         {filteredAdvertisers.map((advertiser, index) => (
//                                             <div className="w-50" key={index}>
//                                                 <CFormCheck
//                                                     inline
//                                                     id={`inlineCheckbox${index}`}
//                                                     label={advertiser.name}
//                                                     checked={selectedAdvertisers[advertiser.id] || false}
//                                                     onChange={() => handleCheckboxChange(advertiser.id)}
//                                                 />
//                                                 {/* Add a console log to check advertiser details */}
//                                                 {/* {console.log('Ad details:', advertiser.name)} */}
//                                             </div>
//                                         ))}
//                                     </div>

//                                     <br />
//                                     <br />

//                                     <div className="d-flex justify-content-between">
//                                         <Link to="/register">
//                                             <CButton color="primary">Previous</CButton>
//                                         </Link>
//                                         <CButton color="success" onClick={handleSubmit}>
//                                             Submit
//                                         </CButton>
//                                     </div>
//                                 </CForm>
//                             </CCardBody>
//                         </CCard>
//                     </CCol>
//                 </CRow>
//             </CContainer>
//         </div>
//     );
// };

// export default AdvertiserSelectPage;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import CheckboxTree from 'react-checkbox-tree';
// import { fetchAdvetisers, fetchAdvetisersCampaigns } from 'src/common/axiosCall';

// const AdvertiserSelectPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [treeData, setTreeData] = useState([]);
//   const [selectedNodes, setSelectedNodes] = useState([]);
//   const [expanded, setExpanded] = useState([]);
//   const [advertiserData, setAdvertiserData] = useState([]);
//   const [advertiserCampaigns, setAdvertiserCampaigns] = useState({});

//   useEffect(() => {
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkphbmFrYSBQIiwiZW1haWwiOiJqYW5ha2EucEBkaWdpdGFseGxhYnMuY29tIiwicm9sZSI6IkFETUlOIiwic3RhdHVzIjoxLCJpYXQiOjE3MDA3OTc4NDMsImV4cCI6MTcwMDgxOTQ0M30.f_e1oLr_4CQiI3QTv030AGUEMCWCM95PWT_jd5T_9pM';

//     Promise.all([fetchAdvetisers(token), fetchAdvetisersCampaigns(token)])
//       .then(([advertisersData, advertiserCampaignsData]) => {
//         console.log('advertiserCampaignsData:', advertiserCampaignsData);
//         setAdvertiserData(advertisersData);
//         setAdvertiserCampaigns(advertiserCampaignsData);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     const formattedTreeData = advertiserData.map((advertiser) => {
//       const campaigns = advertiserCampaigns[advertiser.id] || [];
//       return {
//         advertiser: advertiser.id,
//         campaigns: Array.isArray(campaigns) ? campaigns.map((val) => val.Campaign_id) : [],
//       };
//     });

//     setTreeData(
//       advertiserData.filter((advertiser) => advertiser.name.toLowerCase().includes(searchQuery.toLowerCase())).map((advertiser) => ({
//           value: advertiser.name+'_'+advertiser.id,
//           id: advertiser.id,
//           label: advertiser.name,
//           children: advertiserCampaigns
//             ? advertiserCampaigns
//                 .filter((val) => val.Advertiser_id === advertiser.id)
//                 .map((val) => ({
//                   value: val.Campaign_id || '',
//                   label: val.Campaign_name || '',
//                 }))
//             : [],
//         }))
//     );
//   }, [advertiserData, advertiserCampaigns, searchQuery]);

//   const handleCheckboxChange = (checked) => {
//     setSelectedNodes(checked);
//     console.log('Selected Nodes:', checked);
//   };

//   const handleSubmit = () => {

//     console.log('Selected Nodes:',expanded,selectedNodes);
//     // console.log(expanded)
//     // Your submit logic here
//   };

// // const handleSubmit = () => {

// //     const selectedCampaigns = selectedNodes.map((node) => {
// //       const [advertiserId, campaignId] = node.split('_');
// //       return {
// //         advertiserId: parseInt(advertiserId, 10),
// //         campaignId: parseInt(campaignId, 10),
// //       };
// //     });

// //     const selectedAdvertisers = Array.from(new Set(selectedCampaigns.map((campaign) => campaign.advertiserId)));

// //     console.log('Selected Advertisers:', selectedAdvertisers);
// //     console.log('Selected Campaigns:', selectedCampaigns);

// //   };
//   const onCheck = (checked,targetNode) =>{
//     setSelectedNodes(checked)
//   }

//   const tggle = (index){
//      setToggleStatus((pr) => !pr)
//   }

//   return (
//     <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-9 col-lg-7 col-xl-6">
//             <div className="card mx-4">
//               <div className="card-body p-4">
//                 <h1>Advertiser</h1>
//                 <input
//                   type="text"
//                   placeholder="Search Advertisers"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <br />
//                 <br />s
//                 <CheckboxTree
//                   nodes={treeData}
//                   checked={selectedNodes}
//                   expanded={expanded}
//                   onCheck={onCheck}
//                   onExpand={expanded => setExpanded(expanded)}
//                 />

//                 <br />
//                 <br />

//                 <div className="d-flex justify-content-between">
//                   <Link to="/register">
//                     <button className="btn btn-primary">Previous</button>
//                   </Link>
//                   <button className="btn btn-success" onClick={handleSubmit}>
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdvertiserSelectPage;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchAdvetisers, fetchAdvetisersCampaigns } from 'src/common/axiosCall';
import axios from 'axios';
import { CSpinner } from '@coreui/react';
const TOKEN = process.env.REACT_APP_TOKEN


const AdvertiserSelectPage = () => {
    const location = useLocation();
    const [allFormData, setAllFormData] = useState(location.state);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [expandedAdvertisers, setExpandedAdvertisers] = useState([]);
    const [advertiserData, setAdvertiserData] = useState([]);
    const [advertiserCampaignsData, setAdvertiserCampaignsData] = useState([]);
    const [selectedAdvertiserNames, setSelectedAdvertiserNames] = useState([]);
    useEffect(() => {
        setLoading(true);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkphbmFrYSBQIiwiZW1haWwiOiJqYW5ha2EucEBkaWdpdGFseGxhYnMuY29tIiwicm9sZSI6IkFETUlOIiwic3RhdHVzIjoxLCJpYXQiOjE3MDE5MjkzMDQsImV4cCI6MTcwMTk1MDkwNH0.-S40VDZgwoCG_ne4drCnNjmQJXyhucCz2u_ZcIaLff8'
        const token = TOKEN;
        Promise.all([fetchAdvetisers(token), fetchAdvetisersCampaigns(token)])
            .then(([advertisersData, advertiserCampaignsData]) => {
                setAdvertiserData(advertisersData);
                setAdvertiserCampaignsData(advertiserCampaignsData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [allFormData]);

    const handleExpandToggle = (advertiserId) => {
        setExpandedAdvertisers((prevExpanded) =>
            prevExpanded.includes(advertiserId)
                ? prevExpanded.filter((id) => id !== advertiserId)
                : [...prevExpanded, advertiserId]
        );
    };

    const handleCheckboxChange = (id) => { // Change the parameter to be the ID directly
        setSelectedNodes((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((prevId) => prevId !== id)
                : [...prevSelected, id]
        );
    };

    const handleAdvertiserCheckboxChange = (advertiserId, advertiserName) => {
        setSelectedAdvertiserNames((prevSelectedNames) =>
            selectedNodes.includes(advertiserId)
                ? prevSelectedNames.filter((name) => name !== advertiserName)
                : [...prevSelectedNames, advertiserName]
        );

        handleCheckboxChange(advertiserId); // Call handleCheckboxChange with the advertiser ID
    };

    const handleSubmit = async () => {


        const selectedData = advertiserData
            .filter((advertiser) =>
                selectedNodes.includes(advertiser.id)
            )
            .map((advertiser) => {
                const selectedCampaigns = advertiserCampaignsData
                    .filter((campaign) => campaign.Advertiser_id === advertiser.id && selectedNodes.includes(campaign.Campaign_id))
                    .map((campaign) => campaign.Campaign_id);

                return {
                    advertiser: advertiser.id,
                    campaign: selectedCampaigns,
                };
            });

        console.log('Selected Data:', selectedData);
        // Add your logic for submitting the selected data


        // Combine selectedData and allFormData into a single object
        console.log("ALL FORM DATA", allFormData);
        setAllFormData((prevAllFormData) => {
            prevAllFormData.advertiser = selectedData
            return prevAllFormData;
        })
        console.log("ALL FORM DATA UPDATED", allFormData);
        // setAllFormData((prevAllFormData) => ({
        //     ...prevAllFormData
        // }));



        console.log('Combined Data:', allFormData.allFormData);

        const data = {
            ...allFormData.allFormData, advertiser: selectedData
        }
        console.log("############3", data);
        const response = await axios.post('http://localhost:3000/api/user/create', { data: data });

        if (response.status === 200) {
            console.log('Server response:', response);
            // Handle success
        } else {
            console.error('Server responded with status:', response.status);
            console.error('Response data:', response.data);
            // Handle errors here
        }



    };


    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-7 col-xl-6">
                        <div className="card mx-4">
                            <div className="card-body p-4">

                                <h1>Advertiser</h1>

                                <input
                                    type="text"
                                    placeholder="Search Advertisers"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <br />
                                <br />


                                {
                                    advertiserData

                                        .filter((advertiser) =>
                                            advertiser.name.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                        .map((advertiser) => (
                                            <div key={advertiser.id}>
                                                <span onClick={() => handleExpandToggle(advertiser.id)}> @ </span>
                                                <input
                                                    type='checkbox'
                                                    checked={selectedNodes.includes(advertiser.id)} // Change to use ID directly
                                                    onChange={() => handleCheckboxChange(advertiser.id)} // Change to use ID directly
                                                />
                                                <label>{advertiser.name}</label>
                                                {expandedAdvertisers.includes(advertiser.id) &&
                                                    advertiserCampaignsData
                                                        .filter((campaign) => campaign.Advertiser_id === advertiser.id)
                                                        .map((campaign) => (
                                                            <div
                                                                key={campaign.Campaign_id}
                                                                style={{ marginLeft: '30px' }}
                                                            >
                                                                <span> </span>
                                                                <input

                                                                    type='checkbox'
                                                                    checked={selectedNodes.includes(campaign.Campaign_id)} // Change to use ID directly
                                                                    onChange={() => handleCheckboxChange(campaign.Campaign_id)} // Change to use ID directly
                                                                />
                                                                <label>
                                                                    {campaign.Campaign_name}
                                                                </label>
                                                            </div>
                                                        ))}
                                                <br />
                                            </div>
                                        ))}

                                <CSpinner color="primary" />
                                <br />
                                <br />

                                <div className="d-flex justify-content-between">
                                    <Link to="/register">
                                        <button className="btn btn-primary">Previous</button>
                                    </Link>
                                    <button className="btn btn-success" onClick={handleSubmit}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertiserSelectPage;






