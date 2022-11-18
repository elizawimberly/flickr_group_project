import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import TagDeleteConfirmation from './TagDeleteConfirmation';

function TagDeleteModal({tag}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i class="fa-solid fa-trash" onClick={() => setShowModal(true)}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <TagDeleteConfirmation onClose={() => setShowModal(false)} tag={tag}/>
        </Modal>
      )}
    </>
  );
}

export default TagDeleteModal;
