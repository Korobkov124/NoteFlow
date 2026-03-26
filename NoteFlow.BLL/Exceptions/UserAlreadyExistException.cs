namespace NoteFlow.BLL.Exceptions;

public class UserAlreadyExistException : Exception
{
    public UserAlreadyExistException(string message) : base(message){ }
}