namespace TransactionManagementAPI.Models.DTOs
{
    public class AddTransactionDto
    {
        public int ClientID { get; set; }

        public int TransactionTypeID { get; set; }

        public decimal TransactionAmount { get; set; }

        public string? TransactionComment { get; set; }


    }
}
