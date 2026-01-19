import { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FaPlusCircle, FaCheckCircle } from 'react-icons/fa';

const TransactionForm = ({ client, transactionTypes, onAddTransaction }) => {
  const [formData, setFormData] = useState({
    transactionTypeID: '',
    transactionAmount: '',
    transactionComment: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.transactionTypeID || !formData.transactionAmount) {
      alert('Please fill in all required fields');
      return;
    }

    const transactionData = {
      clientID: client.clientID,
      transactionTypeID: parseInt(formData.transactionTypeID),
      transactionAmount: parseFloat(formData.transactionAmount),
      transactionComment: formData.transactionComment,
    };

    onAddTransaction(transactionData);

    // Reset form
    setFormData({
      transactionTypeID: '',
      transactionAmount: '',
      transactionComment: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="shadow-sm mb-3">
      <Card.Header className="bg-success text-white">
        <h5 className="mb-0">
          <FaPlusCircle className="me-2" />
          Add New Transaction
        </h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Transaction Type</Form.Label>
                <Form.Select
                  name="transactionTypeID"
                  value={formData.transactionTypeID}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  {transactionTypes.map((type) => (
                    <option key={type.transactionTypeID} value={type.transactionTypeID}>
                      {type.transactionTypeName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="transactionAmount"
                  value={formData.transactionAmount}
                  onChange={handleChange}
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  name="transactionComment"
                  value={formData.transactionComment}
                  onChange={handleChange}
                  placeholder="Transaction comment"
                  maxLength="500"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="success">
            <FaCheckCircle className="me-1" />
            Add Transaction
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TransactionForm;