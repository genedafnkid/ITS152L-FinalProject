CREATE PROCEDURE [dbo].[Login_Register]
	@userName nvarchar(16),
	@firstName nvarchar(16),
	@lastName nvarchar(16),
	@password nvarchar(16)
AS
begin
	set nocount on; 

	INSERT INTO dbo.Login
	(UserName, FirstName, LastName, Password)
	VALUES (@userName, @firstName, @lastName, @password)
END