import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlKeyDown);
  }
  handlKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdrop = e => {
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

Modal.propType = {
  modal: PropTypes.objectOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default Modal;
