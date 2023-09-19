import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

type ModalProps = {
  isOpen: boolean;
  toggle: () => void;
  title: string;
  body: string;
  footer?: JSX.Element;
};

const ExampleModal: React.FC<ModalProps> = ({
  isOpen,
  toggle,
  title,
  body,
  footer,
}) => {
  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </Modal>
  );
};

export default ExampleModal;
