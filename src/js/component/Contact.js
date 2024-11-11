import React, {useState, useContext} from 'react'
import { Context } from "../store/appContext";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = ({contact}) => {
    const {store, actions} = useContext(Context) //ahora puedo acceder a todas las variables que estén en el store en el archivo flux

    const [showModal, setShowModal] = useState(false);
    const handleDelete = () => {
        actions.deleteContact(contact.id);
        setShowModal(false); //se oculta el modal después que eliminé el contacto
    }

    /* Función para que, si el contacto tiene de nombre Taylor Swift o Paul McCartney, aparezca su foto correspondiente.
    En caso de ser cualquier otro nombre, aparece una foto de contacto genérica */
    const getContactImage = (name) => {
        if (name === "Taylor Swift") { 
            return "https://static01.nyt.com/images/2022/10/24/arts/24taylor-notebook3/24taylor-notebook3-superJumbo.jpg"; 
        } else if (name === "Paul McCartney") {
            return "https://images-na.ssl-images-amazon.com/images/S/amzn-author-media-prod/4f2ub19sv183kq48899a3afjl1.jpg"; 
        } else { 
            return "https://itickets.zendesk.com/hc/article_attachments/360043591951/icon_neg-user.png";
        }}

  return (
    <>   
        <div className="card mb-2" style={{maxWidth: "600px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={getContactImage(contact.name)} className="img-fluid rounded-circle p-2"/>
                </div>
                <div className="col-md-8">
                    <div className="card-body text-start">
                        <h5 className="card-title">{contact.name}</h5>
                        <p className="card-text">🌐 {contact.address}</p>
                        <p className="card-text">📞 {contact.phone}</p>
                        <p className="card-text"><small className="text-body-secondary"> 📩 {contact.email}</small></p>
                    </div>
                    <div className="text-end mb-2" id='editAndDeleteButtons'>
                        <Link to={`/edit-contact/${contact.id}`}>
                            <button className='btn btn-outline-secondary me-2'>✏️</button>
                        </Link>
                        <button className='btn btn-outline-danger me-2' onClick={()=>{
                            setShowModal(true)
                        }}>Delete</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Para el modal: */}
        {showModal && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Deletion</h5>
                            <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete "{contact.name}" from your contact list?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default Contact