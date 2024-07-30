CREATE PROCEDURE [dbo].[Employee_Delete]
	@param1 int = 0,
    @Id INT
AS
BEGIN
    DELETE FROM dbo.Login WHERE Id = @Id
END
