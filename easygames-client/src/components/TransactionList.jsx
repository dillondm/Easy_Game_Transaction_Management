import { Card, Table, Button } from 'react-bootstrap';
import { FaListUl, FaPencil } from 'react-icons/fa6';

const TransactionList = ({ transactions, onEditComment }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-info text-white">
        <h5 className="mb-0">
          <FaListUl className="me-2" />
          Transaction History
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <Table hover striped>
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => {
                  const isCredit = transaction.transactionTypeName === 'Credit';
                  const typeClass = isCredit ? 'text-success' : 'text-danger';
                  const typeIcon = isCredit ? '↑' : '↓';

                  return (
                    <tr key={transaction.transactionID} className="transaction-row">
                      <td>{formatDate(transaction.transactionDate)}</td>
                      <td>
                        <span className={`fw-bold ${typeClass}`}>
                          {typeIcon} {transaction.transactionTypeName}
                        </span>
                      </td>
                      <td className={`fw-bold ${typeClass}`}>
                        R {parseFloat(transaction.transactionAmount).toFixed(2)}
                      </td>
                      <td>
                        {transaction.transactionComment || (
                          <em className="text-muted">No comment</em>
                        )}
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => onEditComment(transaction)}
                        >
                          <FaPencil className="me-1" />
                          Edit
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TransactionList;