using Microsoft.AspNetCore.Mvc;
using TransactionManagementAPI.Data;
using TransactionManagementAPI.Models.DTOs;

namespace EasyGamesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionRepository _repository;

        public TransactionsController(ITransactionRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("types")]
        public async Task<IActionResult> GetTransactionTypes()
        {
            try
            {
                var types = await _repository.GetTransactionTypesAsync();
                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Data = types
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error retrieving transaction types: {ex.Message}"
                });
            }
        }


        [HttpGet("client/{clientId}")]
        public async Task<IActionResult> GetClientTransactions(int clientId)
        {
            try
            {
                var transactions = await _repository.GetClientTransactionsAsync(clientId);
                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Data = transactions
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error retrieving transactions: {ex.Message}"
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody] AddTransactionDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Invalid transaction data"
                    });
                }

                var updatedClient = await _repository.AddTransactionAsync(dto);

                if (updatedClient == null)
                {
                    return StatusCode(500, new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Failed to add transaction"
                    });
                }

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "Transaction added successfully",
                    Data = updatedClient
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error adding transaction: {ex.Message}"
                });
            }
        }

      
        [HttpPut("comment")]
        public async Task<IActionResult> UpdateComment([FromBody] UpdateCommentDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Invalid data"
                    });
                }

                await _repository.UpdateTransactionCommentAsync(dto);

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "Comment updated successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error updating comment: {ex.Message}"
                });
            }
        }
    }
}
