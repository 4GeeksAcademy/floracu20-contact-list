import React, {useContext} from 'react'
import { Context } from "../store/appContext";


const Info = () => {
  const {store, actions} = useContext(Context)
  return (
    <div className="container m-3 border border-success">
        <h1>Componente info</h1>
        <p>{store.info}</p>
    </div>
  )
}

export default Info