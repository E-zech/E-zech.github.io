import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

export default function UsersMenagment() {
  const [allClients, setAllClients] = useState([]);

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
  }, []);

  // Define columns based on the filtered field names
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'business', headerName: 'Business', flex: 1 },
  ];

  return (
    <div style={{ height: 'auto', width: '100%', padding: '15px' }}>
      <DataGrid
        rows={allClients}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
}
