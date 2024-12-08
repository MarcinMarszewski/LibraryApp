import React from "react";

const Clients = () => {
    const [clients, setClients] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();

            if (Array.isArray(data)) {
                setClients(data);
            }
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <div>
      <h1>Clients</h1>
      <ul>
        {clients.map((client) => (
            <div key={client.id}>
                <div>{client.first_name}</div>
                <div>{client.last_name}</div>
                <div>{client.email}</div>
                <div>{client.phone_number}</div>
            </div>
        ))}
      </ul>
    </div>
  );
};

export default Clients;