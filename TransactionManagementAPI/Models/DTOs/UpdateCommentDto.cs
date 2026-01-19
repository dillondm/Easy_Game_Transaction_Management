namespace TransactionManagementAPI.Models.DTOs
{
    public class UpdateCommentDto
    {
        public int TransactionID { get; set; }
        public string? TransactionComment { get; set; }
    }
}
