import { useEffect, useState } from "react";
import './style.css';
export default function UsersMenagment() {
  const [allClients, setAllClients] = useState([]);

  useEffect(() => {
    fetch(`https://api.shipap.co.il/admin/clients?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setAllClients(data);
      });
  }, []);

  return (
    <>
      <div>
        <h3 className="tempTitle">ניהול משתמשים (רק למנהל)</h3>
      </div>
      {allClients.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(allClients[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allClients.map((client, index) => (
              <tr key={index}>
                {Object.values(client).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
