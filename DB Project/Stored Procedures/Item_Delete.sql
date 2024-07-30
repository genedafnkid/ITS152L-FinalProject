CREATE PROCEDURE dbo.Item_Delete
    @Id INT
AS
BEGIN
    DELETE FROM dbo.Item WHERE Id = @Id
END
