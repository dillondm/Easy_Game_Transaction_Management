import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa6';
import ClientList from './components/ClientList';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import EditCommentModal from './components/EditCommentModal';
import { apiService } from './services/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [clients, setClients] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [alert, setAlert] = useState(null);

 
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [clientsData, typesData] = await Promise.all([
        apiService.getAllClients(),
        apiService.getTransactionTypes(),
      ]);
      setClients(clientsData);
      setAllClients(clientsData);
      setTransactionTypes(typesData);
    } catch (error) {
      showAlert('Error loading data: ' + error.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectClient = async (client) => {
    setSelectedClient(client);
    try {
      const transactionsData = await apiService.getClientTransactions(client.clientID);
      setTransactions(transactionsData);
    } catch (error) {
      showAlert('Error loading transactions: ' + error.message, 'danger');
    }
  };

  const handleAddTransaction = async (transactionData) => {
    try {
      const response = await apiService.addTransaction(transactionData);
      
      if (response.success) {
        showAlert('Transaction added successfully!', 'success');
        
     
        const updatedClient = response.data;
        setSelectedClient(updatedClient);
        
   
        setClients(prevClients =>
          prevClients.map(c =>
            c.clientID === updatedClient.clientID ? updatedClient : c
          )
        );
        setAllClients(prevClients =>
          prevClients.map(c =>
            c.clientID === updatedClient.clientID ? updatedClient : c
          )
        );
        
        
        const transactionsData = await apiService.getClientTransactions(updatedClient.clientID);
        setTransactions(transactionsData);
      }
    } catch (error) {
      showAlert('Error adding transaction: ' + error.message, 'danger');
    }
  };

  const handleEditComment = (transaction) => {
    setEditingTransaction(transaction);
    setShowEditModal(true);
  };

  const handleSaveComment = async (commentData) => {
    try {
      const response = await apiService.updateComment(commentData);
      
      if (response.success) {
        showAlert('Comment updated successfully!', 'success');
        
        // Reload transactions
        const transactionsData = await apiService.getClientTransactions(selectedClient.clientID);
        setTransactions(transactionsData);
      }
    } catch (error) {
      showAlert('Error updating comment: ' + error.message, 'danger');
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      if (!searchTerm.trim()) {
        setClients(allClients);
        return;
      }
      const searchResults = await apiService.searchClients(searchTerm);
      setClients(searchResults);
    } catch (error) {
      showAlert('Error searching clients: ' + error.message, 'danger');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <div className="app-wrapper">
      {/* Header */}
      <div className="app-header">
        <Container fluid>
          <h2 className="mb-0 text-white">
            <i className="bi bi-bank2 me-2"></i>
            EasyGames Transaction Manager
          </h2>
        </Container>
      </div>

      {/* Alert */}
      {alert && (
        <div className="alert-container">
          <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <Container fluid className="mt-4 pb-4">
        <Row>
          {/* Client List */}
          <Col md={4}>
            <ClientList
              clients={clients}
              selectedClient={selectedClient}
              onSelectClient={handleSelectClient}
              onSearch={handleSearch}
            />
          </Col>

          {/* Transaction Panel */}
          <Col md={8}>
            {selectedClient ? (
              <>
                {/* Client Info Card */}
                <Card className="shadow-sm mb-3 bg-light">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <h4 className="mb-0">
                          {selectedClient.clientName} {selectedClient.clientSurname}
                        </h4>
                      </Col>
                      <Col md={6} className="text-end">
                        <h5 className="mb-0">
                          Current Balance:{' '}
                          <span className="text-success fw-bold">
                            R {parseFloat(selectedClient.clientBalance).toFixed(2)}
                          </span>
                        </h5>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Add Transaction Form */}
                <TransactionForm
                  client={selectedClient}
                  transactionTypes={transactionTypes}
                  onAddTransaction={handleAddTransaction}
                />

                {/* Transaction List */}
                <TransactionList
                  transactions={transactions}
                  onEditComment={handleEditComment}
                />
              </>
            ) : (
              <Card className="shadow-sm">
                <Card.Body className="text-center py-5">
                  <FaArrowLeft size={64} className="text-muted mb-3" />
                  <h4 className="text-muted">Select a client to view transactions</h4>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      {/* Edit Comment Modal */}
      <EditCommentModal
        show={showEditModal}
        transaction={editingTransaction}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveComment}
      />
    </div>
  );
}

export default App;
