namespace TransactionManagementAPI.Models
{
    public class Transaction
    {
        public int TransactionID { get; set; }
        public int ClientID { get; set; }
        public int TransactionTypeID { get; set; }
        public required string TransactionTypeName { get; set; }

        public decimal TransactionAmount { get; set; }

        public DateTime TransactionDate { get; set; }

        public string? TransactionComment { get; set; }
    }
}
