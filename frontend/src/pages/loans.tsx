import React from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import styles from "./loans.module.css";

const Loans = () => {
    const [loans, setLoans] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try{
            const response = await fetch('/api/loans');
            const data = await response.json();

            if(Array.isArray(data)){
                setLoans(data);
            }
        } catch(error) {
            console.error(error);
        }
    };

    const returnLoan = async (id: number) => {
        try{
            const response = await fetch('/api/loans/return', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({book_id: Number(id)}),
            });

            if(response.ok){
                fetchLoans();
            }
        } catch(error) {
            console.error(error);
        }
    };


    return (
        <div className={styles.vertical_fit}>
            <div className={styles.horizontal_fit}>
                <div className={styles.title}>Wypożyczenia</div>
                <div className={styles.loan_btn}><Button onClick={() => window.location.href = "/loans/add"}>Dodaj Wypożyczenie</Button></div>
            </div>
            <ul>
            <div className={styles.grid_container_desc}>
                        <div className={styles.grid_item}>Id książki</div>
                        <div className={styles.grid_item}>Tytuł</div>
                        <div className={styles.grid_item}>Imię</div>
                        <div className={styles.grid_item}>Nazwisko</div>
                        <div className={styles.grid_item}>Wypożyczono</div>
                        <div className={styles.grid_item}>Oddano</div>
                        <div className={styles.grid_item_last}>Operacje</div>
                    </div>
                {loans.map((loan) => (
                    <div key={loan.loan_id} className={styles.grid_container}>
                        <div className={styles.grid_item}>{loan.book_id}</div>
                        <div className={styles.grid_item}>{loan.title}</div>
                        <div className={styles.grid_item}>{loan.first_name}</div>
                        <div className={styles.grid_item}>{loan.last_name}</div>
                        <div className={styles.grid_item}>{loan.loan_date.slice(0,10)}</div>
                        <div className={styles.grid_item}>{loan.return_date !== null ?loan.return_date.slice(0,10):""}</div>
                        <div className={styles.grid_button}>{loan.return_date === null ?<Button onClick={() => returnLoan(loan.book_id)}>Zwróć</Button>:""}</div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Loans;