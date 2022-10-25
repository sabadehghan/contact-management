import React from "react";
import "./index.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Modal from "../Modal";

class ContactCard extends React.Component {
  render() {
    const { id, fname, familyName, email, relation } = this.props.contact;
    const { showModal, OpenModal, CloseModal, DeleteCard, EditContact } =
      this.props;
    return (
      <>
        <div className="card">
          <div className="cardInfo">
            <div className="card-titles">
              <div className="card__icons">
                <div className="icon__link" onClick={() => OpenModal()}>
                  <FaTrashAlt size={30} />
                </div>
                <div className="icon__link">
                  <FaEdit size={30} onClick={() => EditContact(id)} />
                </div>
              </div>
              <p className="card__title">
                {fname} {familyName}
              </p>
            </div>
            <h4 className="card__title">{relation} </h4>
            <h4 className="card__title">{email} </h4>
            {showModal && (
              <Modal
                onClose={() => CloseModal()}
                DeleteCard={() => DeleteCard(id)}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
export default ContactCard;
