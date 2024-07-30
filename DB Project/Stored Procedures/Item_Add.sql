CREATE PROCEDURE [dbo].[Item_Add]
	@Name NVARCHAR(50),
    @Code NVARCHAR(10),
    @Brand NVARCHAR(50),
    @UnitPrice DECIMAL(10, 2)
AS
begin
    set nocount on;

    INSERT INTO dbo.Item (productName, Code, Brand, UnitPrice) VALUES (@Name, @Code, @Brand, @UnitPrice)
end
