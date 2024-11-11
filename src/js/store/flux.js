import { Navigate } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			info: "Información en Flux!",
			contact: {
				name: "",
				email: "",
				phone: "",
				address: ""
			},
			contacts: [] //para el setStore contacts
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			changeInfo: (text)=>{
				setStore({info: text})
			},

			getContacts: ()=>{
				fetch("https://playground.4geeks.com/contact/agendas/floracu20")
				.then((response)=>{
					return response.json()
				})
				.then((data)=>{
					console.log(data);
					setStore({contacts: data.contacts})
				})
				.catch((err)=>{err})
			},
			//añadir un nuevo contacto a la lista:
			addContact: (newContact)=>{
				return fetch("https://playground.4geeks.com/contact/agendas/floracu20/contacts", {
					method: "POST",
					body: JSON.stringify({
						name: newContact.name,
						phone: newContact.phone,
						email: newContact.email,
						address: newContact.address
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then((response)=>{
					if (!response.ok) { throw new Error("Failed to create contact"); }
					return response.json()
				})
				.then((data)=>{
					console.log("new contact: ", data);
					getActions().getContacts();
				})
				.catch((err)=>{err})
			},

			//editar contacto que se seleccione
			editContact: (editContact, Id) => {
				 return fetch("https://playground.4geeks.com/contact/agendas/floracu20/contacts/" + Id,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							name: editContact.name,
							phone: editContact.phone,
							email: editContact.email,
							address: editContact.address
						})
					}
					
				)
				.then((response) => {
					if (!response.ok) throw new Error("Failed to edit contact. Please, try again");
					return response.json();
				})
				.then((data) => {
					console.log("edited contact: ", data);
					getActions().getContacts();
				})
				.catch((error) => {
					console.error("Failed to edit contact", error);
					throw error;
				});

			},

			deleteContact: (contactId) => {
				const store = getStore();

				fetch (`https://playground.4geeks.com/contact/agendas/floracu20/contacts/${contactId}`, {
					method:"DELETE",
				})
					.then((response) => {
						if(!response.ok) {
							console.error("Failed to delete contact. Please, try again.", response.status, response.statusText);
												throw new Error ("Failed to delete contact");
						}
						return response;
					})
					.then (() => {
						const updatedContacts = store.contacts.filter(contact => contact.id !== contactId);
                        setStore({ contacts: updatedContacts});
						
						console.log ("Contact successfully deleted!");
					})
					.catch((error) => {
						console.error("error: ", error);
					})
				
			},

		}
	};
};

export default getState;
