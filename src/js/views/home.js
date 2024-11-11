import React, {useContext} from "react";
import {Context} from "../store/appContext"
//import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import {Link} from "react-router-dom";
import Contact from "../component/Contact";
import Info from "../component/Info";
import Change from "../component/Change";


export const Home = () => {
	const {store, actions} = useContext(Context)
	return (
	<div className="text-center mt-5">
		<h1>My contact list:</h1>
		<br/>
		<div className="container align-items-center" style={{width: "50%"}}>
			{Array.isArray(store.contacts) && store.contacts.length > 0 ? (
				store.contacts.map((contact, index) => (
				<Contact key={index} contact={contact} />
				))
			) : (
				<h6 className="text-center" style={{color: "GrayText"}}>
					Your contact list is empty, add a new contact!
				</h6>
			)}
			{/* <Change/>
			{store.contacts.map((value)=>{
				return <>
					<h4>{value.name}</h4>
				</>
			})} */}
		</div>		
		<Link to="/new-contact">
			<button className="btn btn-success">Add contact</button>
		</Link>

	</div>)
};
