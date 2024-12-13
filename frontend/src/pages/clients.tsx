import React from "react";
import Button from "@/components/Button";
import styles from "./clients.module.css";

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
    <div className={styles.vertical_fit}>
      <div className={styles.horizontal_fit}>
        <div className={styles.title}>Klienci</div>
        <div className={styles.client_btn}><Button onClick={() => window.location.href = "/clients/edit"}>Edytuj klienta</Button></div>
        <div className={styles.client_btn}><Button onClick={() => window.location.href = "/clients/add"}>Dodaj klienta</Button></div>
      </div>
      <ul>
      <div className={styles.grid_container_desc}>
                <div className={styles.client_data}>Imię</div>
                <div className={styles.client_data}>Nazwisko</div>
                <div className={styles.client_data}>E-mail</div>
                <div className={styles.client_data_end}>Nr. telefonu</div>
            </div>
        {clients.map((client) => (
            <div className={styles.grid_container}
            key={client.id}>
                <div className={styles.client_data}>{client.first_name}</div>
                <div className={styles.client_data}>{client.last_name}</div>
                <div className={styles.client_data}>{client.email}</div>
                <div className={styles.client_data_end}>{client.phone_number}</div>
            </div>
        ))}
      </ul>
    </div>
  );
};

export default Clients;