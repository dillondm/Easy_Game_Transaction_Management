// Controllers/ClientsController.cs
using TransactionManagementAPI.Data;
using TransactionManagementAPI.Models.DTOs;
using Microsoft.AspNetCore.Mvc;


namespace TransactionManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly ITransactionRepository _repository;

        public ClientsController(ITransactionRepository repository)
        {
            _repository = repository;
        }

        // GET: api/clients
        [HttpGet]
        public async Task<IActionResult> GetAllClients()
        {
            try
            {
                var clients = await _repository.GetAllClientsAsync();
                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Data = clients
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error retrieving clients: {ex.Message}"
                });
            }
        }

        // GET: api/clients/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient(int id)
        {
            try
            {
                var client = await _repository.GetClientByIdAsync(id);
                if (client == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Client not found"
                    });
                }

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Data = client
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error retrieving client: {ex.Message}"
                });
            }
        }

        // GET: api/clients/search?term=john
        [HttpGet("search")]
        public async Task<IActionResult> SearchClients([FromQuery] string term)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(term))
                {
                    var allClients = await _repository.GetAllClientsAsync();
                    return Ok(new ApiResponse<object>
                    {
                        Success = true,
                        Data = allClients
                    });
                }

                var clients = await _repository.SearchClientsAsync(term);
                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Data = clients
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error searching clients: {ex.Message}"
                });
            }
        }
    }
}