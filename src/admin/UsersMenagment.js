import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { GeneralContext } from '../App';
import "./UsersMenagment.css";

export default function UsersMenagment() {
  const [allClients, setAllClients] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const {  setLoader , snackbar } = useContext(GeneralContext);

  useEffect(() => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/admin/clients?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
      credentials: 'include',
    }).then(res => res.json())
      .then((data) => {
        const filteredData = data.map((item) => {
          const { id, firstName, lastName, phone, email, business } = item;
          return { id, firstName, lastName, phone, email, business }; 
          // taking from each obj only the necessary details for the table
        });
        setAllClients(filteredData); 
      }).finally(()=> setLoader(false))
    }, [refresh]);
    

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'business', headerName: 'Business', flex: 1,
    renderCell: (params) => (
      <div>
      {params.row.business ? (
        <CheckBoxIcon
          onClick={(e) => {
            e.stopPropagation(); // prevent row selection
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
          style={{ cursor: 'pointer', color: 'red' }}
        />
      )}
    </div>
    ),
    },
    { field: 'delete' , headerName: 'Delete', flex: 1,
      renderCell: (params) => (
        <DeleteIcon
          onClick={() => handleDelete(params.row.id)} // You need to implement handleDelete
          style={{ cursor: 'pointer' }}
        />
      ),
    }
  ];

const handleBusiness = (client) => {
    setLoader(true);
    client.business = !client.business;
    const obj = {client};
    
    fetch(`https://api.shipap.co.il/admin/clients/${client.id}?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
      credentials: 'include',
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(client),
    })
    .then(() => {
      setRefresh([{}]);
    }).finally(()=>setLoader(false))
  };


  const handleDelete = (clientID)=> {
    setLoader(true);
    window.confirm(`are you sure you want to delte user ${clientID} ?`);
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
    <h3 className="sec-title">Here you can manage your clients, You can upgrade or delete them in the table below.</h3>
    </header>

    <section style={{ height: 'auto', width: '80vw', padding: '15px', margin:'0 auto' }}>
      <DataGrid
        rows={allClients}
        columns={columns}
        pageSize={5}
      />
    </section>
    <h4 className="description-title">
    If the CheckBox color is <span className="green">green</span>, then the user is business.
    <br />
     If it is <span className="red">red</span>, the user is not business.
    </h4>
    </>
  );
}
