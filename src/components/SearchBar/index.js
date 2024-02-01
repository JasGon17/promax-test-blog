'use client'
import { SearchBarSchema } from '@/utils/SerchBarSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './SearchBar.module.css'
import PropTypes from 'prop-types'
import { LuRefreshCw } from "react-icons/lu";

export const SearchBar = ({dataBlogs, handleListBlog}) =>{
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(SearchBarSchema),
        mode: 'onChange',
        criteriaMode: 'all'
      })
    const registerTypeSearch = register('typeSearch')
    const registernameSearch = register('nameSearch')

    const handleRefresh = () =>{
        reset()       
        handleListBlog(dataBlogs)
    }

    const onSubmit = ({typeSearch, nameSearch}) =>{
        const listBlog = dataBlogs?.filter(item => item[typeSearch].includes(nameSearch))
        handleListBlog(listBlog)
    }
    
    return(
        <form className={styles.SearchBar__Container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.SearchBar__ContInputTypeSearch}>
                <p className={styles.SearchBar__TitleTypeSearch}>
                    Buscar por:
                </p>
                <div className={styles.SearchBar__InputCont__RadioButton}>
                    <label className={styles.SearchBar__LabelTypeSearch} htmlFor="searchTitle">
                        Titulo
                        <input 
                        id='searchTitle' 
                        type='radio' 
                        value='title' 
                        {...registerTypeSearch}/>
                    </label>
                    <label className={styles.SearchBar__LabelTypeSearch} htmlFor="searchAuthor">
                        Autor
                        <input 
                        id='searchAuthor' 
                        type='radio' 
                        value='author' 
                        {...registerTypeSearch}/>
                    </label>
                    <label className={styles.SearchBar__LabelTypeSearch} htmlFor="searchContent">
                        Contenido
                        <input 
                        id='searchContent'
                        type='radio' 
                        value='content' 
                        {...registerTypeSearch}/>
                    </label>
                    { errors?.typeSearch &&
                        <span className={styles.SearchBar__ErrorMessageRadioButton}>
                            {errors?.typeSearch?.message}
                        </span>
                    }
                </div>
            </div>
            <div className={styles.SearchBar__ContInputNameSearch}>
                <label className={styles.SearchBar__LabelNameSearch} htmlFor="search">
                    Ingresa palabras clave
                    <div className={styles.SearchBar__ContInputRefresh}>
                        <input
                        className={styles.SearchBar__InputNameSearch}
                        id='search' 
                        type='text' 
                        {...registernameSearch}/>
                        <button 
                        className={styles.SearchBar__ResetButton} 
                        type='button'
                        onClick={()=>{handleRefresh()}}>
                            <LuRefreshCw/>
                        </button>
                    </div>
                    { errors?.nameSearch &&
                    <span className={styles.SearchBar__ErrorMessage}>
                        {errors?.nameSearch?.message}
                    </span>
                    }
                </label>
                <button className={styles.SearchBar__ButtonSubmit} type='submit'>
                    Buscar
                </button>
            </div>
        </form>
    )
}

SearchBar.propTypes= {
    dataBlogs: PropTypes.array
}