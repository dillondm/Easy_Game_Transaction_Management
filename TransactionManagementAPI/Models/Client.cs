namespace TransactionManagementAPI.Models
{
    public class Client
    {
        public int ClientID { get; set; }
        public required string ClientName { get; set; }
        public required string ClientSurname { get; set; }
        public decimal ClientBalance { get; set; }
    }
}
