import { useState } from 'react';
import { Form, ListGroup, Card, Badge } from 'react-bootstrap';
import { FaUsers, FaMagnifyingGlass } from "react-icons/fa6";




const ClientList = ({ clients, selectedClient, onSelectClient, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <Card className="shadow-sm h-100">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">
          <FaUsers className="me-2" />
          Client Management
        </h5>
      </Card.Header>
      <Card.Body>
        {/* Search Box */}
        <Form.Group className="mb-3">
          <Form.Label>Search Clients</Form.Label>
          <div className="input-group">
            <span className="input-group-text bg-light">
              <FaMagnifyingGlass />
            </span>
            <Form.Control
              type="text"
              placeholder="Search by name or surname..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </Form.Group>

        {/* Client List */}
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <ListGroup>
            {clients.length === 0 ? (
              <ListGroup.Item className="text-center text-muted">
                No clients found
              </ListGroup.Item>
            ) : (
              clients.map((client) => (
                <ListGroup.Item
                  key={client.clientID}
                  action
                  active={selectedClient?.clientID === client.clientID}
                  onClick={() => onSelectClient(client)}
                  className="d-flex justify-content-between align-items-center client-item"
                >
                  <h6 className="mb-0">
                    {client.clientName} {client.clientSurname}
                  </h6>
                  <Badge bg="success" className="balance-badge">
                    R {parseFloat(client.clientBalance).toFixed(2)}
                  </Badge>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClientList;