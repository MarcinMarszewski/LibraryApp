import React from "react";
import styles from "./Input.module.css";

const Input = ({children, onChange, type, name} : any) =>{
    return (
        <div className={styles.main_div}>
            <div className={styles.label}>{children}</div>
            <input name={name} className={styles.input} type={type} onChange={onChange}/>
        </div>
    );
};

export default Input;