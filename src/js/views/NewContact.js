import React, { useState, useContext } from 'react'
import {Link} from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const NewContact = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [contact, setContact] = useState({ name: "", email: "", phone: "", address: ""});
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value 
    }); 
  };

  const handleNewContact = () => {
    actions.addContact(contact)
      .then(() => { //mensajes
        setMessage({ type: "success", text: "Contact created successfully!" });
        navigate("/"); //redirige al home
      })
      .catch(() => {
        setMessage({ type: "error", text: "Failed to create contact. Please, try again." });
      });
  };
  
  return (
    <div className="container mt-3" style={{width: "50%"}}>
        <h1 className='text-center'>Add a new contact</h1>

        {message && ( <div className={`alert alert-${message.type}`} role="alert"> {message.text} </div>)}

        <h6>Full name</h6>
        <input type="text"
         className="form-control"
         placeholder="Write your contact's full name here"
         name="name"
         value={contact.name} 
         onChange={handleInputChange}
        />
        <br/>
        <h6>Email</h6>
        <input type="text"
         className="form-control" 
         placeholder="example@email.com"
         name="email" 
         value={contact.email} 
         onChange={handleInputChange}
        />
        <br/>
        <h6>Phone</h6>
        <input type="text"
         className="form-control" 
         placeholder="Write your contact's phone number here"
         name="phone" value={contact.phone} 
         onChange={handleInputChange}
        />
        <br/>
        <h6>Address</h6>
        <input type="text"
         className="form-control" 
         placeholder="Write your contact's address here"
         name="address" 
         value={contact.address} 
         onChange={handleInputChange}
        />
        <br/>

        {/* BOTONES: */}
        <button className="btn btn-success" style={{width: "100%"}} onClick={handleNewContact}>Create contact</button>
        <br/>
        <Link to="/">
          Go back to contacts
        </Link>
    </div>
  )
}

export default NewContact