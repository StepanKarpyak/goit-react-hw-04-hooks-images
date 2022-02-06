import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalContainer, ModalSection } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClosed, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClosed();
    }
    }
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClosed]);

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClosed();
  }
}

  return createPortal(
    <ModalContainer onClick={handleOverlayClick}>
      <ModalSection>{children}</ModalSection>
    </ModalContainer>,
    modalRoot,
  );
}

export default Modal;

Modal.propTypes = {
  onClosed: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};