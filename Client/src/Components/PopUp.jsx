import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Modal, Button } from "react-bootstrap";

const TaskCompletedPopup = ({ show, message, onClose }) => {
  const { name } = useSelector((state) => state.user);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Hii {name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskCompletedPopup;
