using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using TransactionManagementAPI.Models;
using TransactionManagementAPI.Models.DTOs;


namespace TransactionManagementAPI.Data
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly string _connectionString;

        public TransactionRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new ArgumentNullException("Connection string not found");
        }

        private IDbConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }

        public async Task<IEnumerable<Client>> GetAllClientsAsync()
        {
            using var connection = CreateConnection();
            var sql = "SELECT * FROM Client ORDER BY ClientSurname, ClientName";
            return await connection.QueryAsync<Client>(sql);
        }

        public async Task<Client?> GetClientByIdAsync(int clientId)
        {
            using var connection = CreateConnection();
            var sql = "SELECT * FROM Client WHERE ClientID = @ClientID";
            return await connection.QueryFirstOrDefaultAsync<Client>(sql, new { ClientID = clientId });
        }

        public async Task<IEnumerable<TransactionType>> GetTransactionTypesAsync()
        {
            using var connection = CreateConnection();
            var sql = "SELECT * FROM TransactionType";
            return await connection.QueryAsync<TransactionType>(sql);
        }

        public async Task<IEnumerable<Transaction>> GetClientTransactionsAsync(int clientId)
        {
            using var connection = CreateConnection();
            return await connection.QueryAsync<Transaction>(
                "sp_GetClientTransactions",
                new { ClientID = clientId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<Client?> AddTransactionAsync(AddTransactionDto dto)
        {
            using var connection = CreateConnection();

         
            var result = await connection.QueryFirstOrDefaultAsync<Client>(
                "sp_AddTransaction",
                new
                {
                    ClientID = dto.ClientID,
                    TransactionTypeID = dto.TransactionTypeID,
                    TransactionAmount = dto.TransactionAmount,
                    TransactionComment = dto.TransactionComment
                },
                commandType: CommandType.StoredProcedure
            );

            return result;
        }

        public async Task UpdateTransactionCommentAsync(UpdateCommentDto dto)
        {
            using var connection = CreateConnection();
            await connection.ExecuteAsync(
                "sp_UpdateTransactionComment",
                new
                {
                    TransactionID = dto.TransactionID,
                    TransactionComment = dto.TransactionComment
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Client>> SearchClientsAsync(string searchTerm)
        {
            using var connection = CreateConnection();
            var sql = @"SELECT * FROM Client 
                       WHERE ClientName LIKE @SearchTerm 
                       OR ClientSurname LIKE @SearchTerm 
                       ORDER BY ClientSurname, ClientName";
            return await connection.QueryAsync<Client>(sql, new { SearchTerm = $"%{searchTerm}%" });
        }
    }
}

