CREATE PROCEDURE [dbo].[List_Employees]
AS
begin
	set nocount on;

	SELECT [l].[Id], [l].[Username], [l].FirstName, [l].[LastName]
	FROM dbo.Login l
end
