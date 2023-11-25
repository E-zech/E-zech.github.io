import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { GeneralContext } from '../App';
import "./UsersMenagment.css";
import "./PopUpBtn.css";
import "./UsersMenagmentMQ.css";
import { useMediaQuery } from "@mui/material";

export default function UsersMenagment() {
  const [allClients, setAllClients] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const { setLoader , snackbar } = useContext(GeneralContext);
  const [isPopUp, setIsPopUp] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/admin/clients?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
      credentials: 'include',
    }).then(res => res.json())
      .then((data) => {
        const filteredData = data.map((item) => {
          const { id, firstName, lastName, phone, email, business } = item;
          return { id, firstName, lastName, phone, email, business }; 
        });
        setAllClients(filteredData); 
      }).finally(()=> setLoader(false))
    }, [refresh]);
    
    const columns = [
      { field: 'id', headerName: 'ID', flex: 1 },
      { field: 'firstName', headerName: 'First Name', flex: 1 },
      !isSmallScreen && { field: 'lastName', headerName: 'Last Name', flex: 1 },
      !isSmallScreen && { field: 'phone', headerName: 'Phone', flex: 1 },
      !isSmallScreen && { field: 'email', headerName: 'Email', flex: 1 },
      { field: 'business', headerName: 'Business', flex: 1,
        renderCell: (params) => (
          <div>
            {params.row.business ? (
              <CheckBoxIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleBusiness(params.row);
                }}
                style={{
                  cursor: 'pointer',
                  color: 'green',
                }}
              />
            ) : (
              <DisabledByDefaultIcon
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleBusiness(params.row);
                }}
                style={{ cursor: 'pointer', color: 'red' }}/>
            )}
          </div>
        ),
      },
      { field: 'delete', headerName: 'Delete', flex: 1,
        renderCell: (params) => (
          <DeleteIcon
            onClick={() => handleDelete(params.row.id)} 
            style={{ cursor: 'pointer' }}/>
        ),
      }
    ].filter(Boolean);

const handleBusiness = (client) => {
    setLoader(true);
    client.business = !client.business;
    const snackbarMessage = `${client.firstName} is now ${
      client.business ? "business" : "non-business"
    } client`;
    const obj = {client};
    
    fetch(`https://api.shipap.co.il/admin/clients/${client.id}?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
      credentials: 'include',
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(client),
    })
    .then(() => {
      setRefresh([{}]);
      snackbar(snackbarMessage);
    }).finally(()=>setLoader(false))
  };


  const handleDelete = (clientID)=> {
    setLoader(true);
    const confirm= window.confirm(`are you sure you want to delte user ${clientID} ?`);
    if(!confirm){
      setLoader(false);
      return;
    }
    fetch(`https://api.shipap.co.il/admin/clients/${clientID}?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
   credentials: 'include',
   method: 'DELETE',
})
.then(() => {
    setRefresh([{}]);
}).finally(()=>setLoader(false))
  };

  return (
    <>
    <header>
      <h1 className="main-title">User Table Management</h1>
 </header>

 {isPopUp && (
  <section className="pop-up-wrapper">
    <div className="pop-up">
      <h3 className="pop-up-title">Here you can manage your clients</h3>

      <ul className="pop-up-list">
        <li className="list-txt">
          You can upgrade or delete them by clicking on the CheckBox
        </li>
        <li className="list-txt">
          If the CheckBox color is <span className="green">green</span>, then the user is business.
        </li>
        <li className="list-txt">
          If it is <span className="red">red</span>, the user is not business.
        </li>
        <li className="list-txt">
          * In small size devices, some of the info will be hidden *
        </li>
      </ul>

      <button className="btn-pop-up" onClick={()=> setIsPopUp(false)}>❌</button>
    </div>
  </section>
 )}
 
    <section style={{ height: 'auto', width: '100%', padding: '25px 15px', margin:'0 auto' }}>
      <DataGrid
        rows={allClients}
        columns={columns}
        pageSize={5}/>
    </section>
    </>
  );
}
