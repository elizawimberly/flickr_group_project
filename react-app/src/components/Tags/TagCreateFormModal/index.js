import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import TagCreateForm from './TagCreateForm';

function TagCreateFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}  className="modal-button">Add a Tag</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <TagCreateForm onClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default TagCreateFormModal;
