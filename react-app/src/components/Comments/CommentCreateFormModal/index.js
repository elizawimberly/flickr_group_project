import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CommentCreateForm from './CommentCreateForm';

function TagCreateFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add a Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CommentCreateForm onClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default TagCreateFormModal;
