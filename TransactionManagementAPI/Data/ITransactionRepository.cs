using TransactionManagementAPI.Models;
using TransactionManagementAPI.Models.DTOs;

namespace TransactionManagementAPI.Data
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<Client>> GetAllClientsAsync();
        Task<Client?> GetClientByIdAsync(int clientId);
        Task<IEnumerable<TransactionType>> GetTransactionTypesAsync();
        Task<IEnumerable<Transaction>> GetClientTransactionsAsync(int clientId);
        Task<Client?> AddTransactionAsync(AddTransactionDto dto);
        Task UpdateTransactionCommentAsync(UpdateCommentDto dto);
        Task<IEnumerable<Client>> SearchClientsAsync(string searchTerm);
    }
}
