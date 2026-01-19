


CREATE TABLE TransactionType (
    TransactionTypeID INT PRIMARY KEY IDENTITY(1,1),
    TransactionTypeName NVARCHAR(50) NOT NULL
);


CREATE TABLE Client (
    ClientID INT PRIMARY KEY IDENTITY(1,1),
    ClientName NVARCHAR(100) NOT NULL,
    ClientSurname NVARCHAR(100) NOT NULL,
    ClientBalance DECIMAL(18,2) NOT NULL DEFAULT 0
);


CREATE TABLE [Transaction] (
    TransactionID INT PRIMARY KEY IDENTITY(1,1),
    ClientID INT NOT NULL,
    TransactionTypeID INT NOT NULL,
    TransactionAmount DECIMAL(18,2) NOT NULL,
    TransactionDate DATETIME NOT NULL DEFAULT GETDATE(),
    TransactionComment NVARCHAR(500),
    FOREIGN KEY (ClientID) REFERENCES Client(ClientID),
    FOREIGN KEY (TransactionTypeID) REFERENCES TransactionType(TransactionTypeID)
);





GO
CREATE PROCEDURE sp_GetClientTransactions
    @ClientID INT
AS
BEGIN
    SELECT 
        t.TransactionID,
        t.ClientID,
        t.TransactionTypeID,
        tt.TransactionTypeName,
        t.TransactionAmount,
        t.TransactionDate,
        t.TransactionComment
    FROM [Transaction] t
    INNER JOIN TransactionType tt ON t.TransactionTypeID = tt.TransactionTypeID
    WHERE t.ClientID = @ClientID
    ORDER BY t.TransactionDate DESC;
END
GO


CREATE PROCEDURE sp_AddTransaction
    @ClientID INT,
    @TransactionTypeID INT,
    @TransactionAmount DECIMAL(18,2),
    @TransactionComment NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    
    BEGIN TRY
        
        INSERT INTO [Transaction] (ClientID, TransactionTypeID, TransactionAmount, TransactionComment)
        VALUES (@ClientID, @TransactionTypeID, @TransactionAmount, @TransactionComment);
        
        
        IF @TransactionTypeID = 2
            UPDATE Client SET ClientBalance = ClientBalance + @TransactionAmount WHERE ClientID = @ClientID;
        ELSE IF @TransactionTypeID = 1 
            UPDATE Client SET ClientBalance = ClientBalance - @TransactionAmount WHERE ClientID = @ClientID;
        
        COMMIT TRANSACTION;
        
        
        SELECT ClientID, ClientName, ClientSurname, ClientBalance
        FROM Client WHERE ClientID = @ClientID;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO


CREATE PROCEDURE sp_UpdateTransactionComment
    @TransactionID INT,
    @TransactionComment NVARCHAR(500)
AS
BEGIN
    UPDATE [Transaction]
    SET TransactionComment = @TransactionComment
    WHERE TransactionID = @TransactionID;
END
GO