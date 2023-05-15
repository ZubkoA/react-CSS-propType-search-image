import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');
class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handlKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal componentWillMount');
    window.removeEventListener('keydown', this.handlKeyDown);
  }
  handlKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('Close this window');
      this.props.onClose();
    }
  };

  handleBackdrop = e => {
    console.log('target with onClick:', e.currentTarget);
    console.log('target:', e.target);

    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { url, tags } = this.props.modal;
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdrop}>
        <div className={css.Modal}>
          <img src={url} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
