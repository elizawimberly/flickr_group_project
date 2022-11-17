import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CommentDeleteConfirmation from './CommentDelete';

function CommentDeleteModal({comment}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i class="fa-solid fa-trash" onClick={() => setShowModal(true)}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CommentDeleteConfirmation onClose={() => setShowModal(false)} comment={comment} />
        </Modal>
      )}
    </>
  );
}

export default CommentDeleteModal;
