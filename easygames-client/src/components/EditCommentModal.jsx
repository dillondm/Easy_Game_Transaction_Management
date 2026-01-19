import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditCommentModal = ({ show, transaction, onClose, onSave }) => {
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (transaction) {
      setComment(transaction.transactionComment || '');
    }
  }, [transaction]);

  const handleSave = () => {
    onSave({
      transactionID: transaction.transactionID,
      transactionComment: comment,
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Transaction Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength="500"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCommentModal;