import React, { Component } from "react";
import ContactCard from "./Components/ContactCard";
import Form from "./Components/Form";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      showModal: false,
      fname: "",
      familyName: "",
      phone: "",
      relation: "",
      email: "",
      formBtn: "اضافه کردن",
      currentContact: {},
    };
  }

  // Clear Inputs
  clearInputs = (btnText = "اضافه کردن") => {
    this.setState({ fname: "" });
    this.setState({ familyName: "" });
    this.setState({ phone: "" });
    this.setState({ relation: "" });
    this.setState({ email: "" });
    this.setState({ formBtn: btnText });
  };

  // Control Inputs

  handelChange = (e, validateFunction) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, validateFunction);
  };

  // ADD DELETE EDIT Functions
  addContact = (e) => {
    const { currentContact, contacts } = this.state;
    e.preventDefault();
    const { fname, familyName, phone, relation, email } = e.target.elements;
    if (this.state.formBtn === "اضافه کردن") {
      const newContact = {
        fname: fname.value,
        familyName: familyName.value,
        phone: phone.value,
        relation: relation.value,
        email: email.value,
        id: uuidv4(),
      };
      this.setState({ contacts: [...contacts, newContact] });
      this.clearInputs();
      toast.success("مخاطب اضافه شد", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (this.state.formBtn === "ویرایش") {
      const editedContact = {
        fname: fname.value,
        familyName: familyName.value,
        phone: phone.value,
        relation: relation.value,
        email: email.value,
        id: currentContact.id,
      };
      const editingContact = contacts.find(
        (contact) => contact.id === editedContact.id
      );
      const newContacts = contacts;
      newContacts.splice(contacts.indexOf(editingContact), 1, editedContact);
      this.setState({ contacts: newContacts }, () =>
        this.clearInputs("اضافه کردن")
      );
    }
  };

  DeleteCard = (id) => {
    const { contacts } = this.state;
    this.setState(
      {
        contacts: contacts.filter((contact) => contact.id !== id),
      },
      () => this.CloseModal()
    );
    toast.success("مخاطب پاک شد", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  EditContact = (id) => {
    const selectedContact = this.state.contacts.find(
      (contact) => contact.id === id
    );
    this.setState({ currentContact: selectedContact });
    const { fname, familyName, phone, relation, email } = selectedContact;
    this.setState({ formBtn: "ویرایش" });
    this.setState({ fname: fname });
    this.setState({ familyName: familyName });
    this.setState({ phone: phone });
    this.setState({ relation: relation });
    this.setState({ email: email });

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  // Modal Functions

  OpenModal = () => {
    this.setState({ showModal: true });
  };
  CloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      fname,
      familyName,
      phone,
      relation,
      email,
      contacts,
      showModal,
      formBtn,
    } = this.state;
    return (
      <div className="container">
        <Form
          contacts={contacts}
          addContact={this.addContact}
          fname={fname}
          familyName={familyName}
          phone={phone}
          relation={relation}
          email={email}
          handelChange={this.handelChange}
          formBtn={formBtn}
        />
        <div className="contactsBody">
          {contacts.map((contact, i) => (
            <ContactCard
              key={i}
              contact={contact}
              DeleteCard={this.DeleteCard}
              OpenModal={this.OpenModal}
              CloseModal={this.CloseModal}
              showModal={showModal}
              EditContact={this.EditContact}
            />
          ))}
        </div>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
