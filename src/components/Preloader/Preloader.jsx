import React from 'react';
import style from './preloader.module.css';
import PreloaderIcon from '../../assets/images/preloader.svg';

const Preloader = (props) => {
    return (
        <div>
            <img className={style.preloader} src={PreloaderIcon} alt='preloader'/>
        </div>
    )
}

export default Preloader;