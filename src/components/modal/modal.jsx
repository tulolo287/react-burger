import React from "react";
import styles from './modal.module.css'
import { createPortal } from 'react-dom';
import OrderDetails from "../order-details/order-details.jsx"

const Modal = ({modalHandler}) => {
    return (<>
    
    {createPortal(<>
<div onClick={modalHandler} className={styles.modal_bg}></div>
<div className={styles.modal_content}><OrderDetails/></div>
</>, 
    document.body
    
    )
}
</>)
}
export default Modal