import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function UsersMenagment() {
  const [allClients, setAllClients] = useState([]);
  const [refresh, setRefresh] = useState([]);

  useEffect(() => {
    fetch(`https://api.shipap.co.il/admin/clients?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        // Filter only the fields you want to display
        const filteredData = data.map((item) => {
          const { id, firstName, lastName, phone, email, business } = item;
          return { id, firstName, lastName, phone, email, business };
        });
        setAllClients(filteredData);
      });
  }, [refresh]);

  // Define columns based on the filtered field names
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'business', headerName: 'Business', flex: 1,
    renderCell: (params) => (
      <CheckBoxIcon
        onClick={() => handleBusiness(params.row.id)} // You need to implement handleDelete
        style={{ cursor: 'pointer' }}
      />
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

  const handleBusiness = ()=> {

  };


  const handleDelete = (clientID)=> {
    window.confirm(`are you sure you want to delte user ${clientID} ?`);
    fetch(`https://api.shipap.co.il/admin/clients/${clientID}?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
   credentials: 'include',
   method: 'DELETE',
})
.then(() => {
    setRefresh([{}]);
});
  };

  return (
    <div style={{ height: 'auto', width: '80vw', padding: '15px', margin:'0 auto' }}>
      <DataGrid
        rows={allClients}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
}
