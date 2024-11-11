import React, {useContext} from 'react'
import {Context} from '../store/appContext';

const Change = () => {
  const {store, actions} = useContext(Context)
  return (
    <div className="container mt-3">
        <h1>Componente change</h1>
        <button className="btn btn-danger" onClick={()=>{
          actions.changeInfo("Estoy cambiando")
        }}>Cambiar info</button>
    </div>
  )
}

export default Change