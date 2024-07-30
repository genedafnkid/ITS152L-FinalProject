CREATE PROCEDURE dbo.Item_Update
    @Id INT,
    @Name NVARCHAR(50),
    @Code NVARCHAR(10),
    @Brand NVARCHAR(50),
    @UnitPrice DECIMAL(10, 2)
AS
BEGIN
    UPDATE dbo.Item
    SET 
        productName = @Name,
        Code = @Code,
        Brand = @Brand,
        UnitPrice = @UnitPrice
    WHERE Id = @Id;
END
