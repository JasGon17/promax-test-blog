import React from 'react'
import styles from './CardModal.module.css'
import PropTypes from 'prop-types'
import { LuCheckCircle } from 'react-icons/lu'
import { MdOutlineReportGmailerrorred } from 'react-icons/md'

export const CardModal = ({display, message, handleModal}) =>{
    const messages = {
        succes: 'Tu artículo se ha publicado correctamente.',
        error: 'Hubo un error al publicar tu artículo, intenta más tarde.'
    }
    const iconMessage = {
        succes: <LuCheckCircle className={styles.CardModal__IconModal}/>,
        error: <MdOutlineReportGmailerrorred className={styles.CardModal__IconModal}/>
    }
    return(
        <div className={display ? styles.CardModal__Container : styles.CardModal__ContainerOff}>
            {iconMessage[message]}
            <p className={styles.CardModal__TextModal}>
                {messages[message]}
            </p>
            <button 
            className={styles.CardModal__Button}
            onClick={()=>{handleModal()}} 
            type='button'>
                Continuar
            </button>
        </div>
    )
}
CardModal.propTypes = {
    display: PropTypes.bool.isRequired,
    message: PropTypes.string
}