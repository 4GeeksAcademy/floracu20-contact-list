import React, { useState, useContext, useEffect } from 'react'
import {Link, useParams, useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";

const EditContact = () => {
    const { store, actions } = useContext(Context); 
    const { contactId } = useParams(); //acá obtengo el id desde la url
    const navigate = useNavigate();
    const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
    const [message, setMessage] = useState(null);

    useEffect(() => {
      //debug
      console.log("store.contacts:", store.contacts);
      console.log("contactId from URL:", contactId);


        const selectedContact = store.contacts.find(c => c.id === contactId); //encuentro el contacto con el id
    
        if (selectedContact) {
          setContact(selectedContact);  //setteo con el seleccionado
        }
      }, [store.contacts, contactId]);

    const handleInputChange = (e) => {
        setContact({
          ...contact,
          [e.target.name]: e.target.value 
        }); 
      };

    const handleEditContact = (e) => {
        e.preventDefault(); //para prevenir que se refresque la página
        console.log('Trying to edit contact:', contact); 
        actions.editContact(contact, contactId)
            .then(() => { //mensajes
                setMessage({ type: "success", text: "Contact edited successfully!" });
                navigate("/"); //redirige al home
            })
            .catch((err) => {
                console.error('Error editing contact:', err);
                setMessage({ type: "error", text: "Failed to edit contact. Please, try again." });
            });
      };

    console.log(contactId);
    
    return (
        <div className="container mt-3" style={{width: "50%"}}>
            <h1 className='text-center'>Edit contact</h1>

            {message && ( <div className={`alert alert-${message.type}`} role="alert"> {message.text} </div> )}

            {contact ? (
                <>
                    <h6>Full name</h6>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Write your contact's full name here"
                        name="name"
                        value={contact.name}
                        onChange={handleInputChange}
                    />
                    <br/>

                    <h6>Email</h6>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="example@email.com"
                        name="email"
                        value={contact.email}
                        onChange={handleInputChange}
                    />
                    <br/>

                    <h6>Phone</h6>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Write your contact's phone number here"
                        name="phone"
                        value={contact.phone}
                        onChange={handleInputChange}
                    />
                    <br/>

                    <h6>Address</h6>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Write your contact's address here"
                        name="address"
                        value={contact.address}
                        onChange={handleInputChange}
                    />
                    <br/>

                    {/* BOTÓN: */}
                    <button className="btn btn-success" style={{width: "100%"}} onClick={handleEditContact}>Edit contact</button>
                    <br/>
                    <Link to="/">
                        Discard changes and go back to contacts
                    </Link>
                </>
            ) : (
                <p>Loading...</p>  // mientras carga.
            )}
            {/* <p>Información del contacto con ID: {contactId}</p> */}
        </div>
    )
}

export default EditContact