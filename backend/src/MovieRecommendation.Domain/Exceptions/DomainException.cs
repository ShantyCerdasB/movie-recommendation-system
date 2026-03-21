namespace MovieRecommendation.Domain.Exceptions;

/// <summary>
/// Base class for all exceptions that originate in the domain layer.
/// Catching this type handles any domain-specific error regardless of its concrete kind.
/// </summary>
public abstract class DomainException : Exception
{
    /// <summary>
    /// Initializes a new instance of the <see cref="DomainException"/> class
    /// with a specified error message.
    /// </summary>
    /// <param name="message">A human-readable description of the error.</param>
    protected DomainException(string message)
        : base(message)
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="DomainException"/> class
    /// with a specified error message and a reference to the inner exception.
    /// </summary>
    /// <param name="message">A human-readable description of the error.</param>
    /// <param name="innerException">
    /// The exception that is the cause of the current exception, or <c>null</c>
    /// if no inner exception is specified.
    /// </param>
    protected DomainException(string message, Exception innerException)
        : base(message, innerException)
    {
    }
}
