class ymError extends Error {
  private extraData = null;
  private code = null;
  getErrorName(): string {
    return this.constructor.name;
  }
  getExtraData() {
    return this.extraData;
  }
  getCode() {
    return this.code;
  }
  constructor(msg: string, extraData: any = null, code: number = null) {
    super(msg);
    this.extraData = extraData;
    this.code = code;
  }
}

class TypeRrmsError extends ymError {}
class MissingRequestError extends ymError {}
class DeniedRequestError extends ymError {}
class ExceptionalExecutionError extends ymError {}
class IllegalRrmsError extends ymError {}
class AuthError extends ymError {}
class NotExistDataError extends ymError {}
class DuplicateDataError extends ymError {}
class ParseError extends ymError {}
class IneffectiveActionError extends ymError {}
class UnpreparedClassError extends ymError {}
class FileSystemError extends ymError {}
class ImpossibleActionError extends ymError {}
class FatalError extends ymError {}
class InvalidNumberType extends ymError {}
class NPGTimeOut extends ymError {}
class NPGReject extends ymError {}
class NPWorkHours extends ymError {}
class HostNotSupporter extends ymError {}
class InvalidParameters extends ymError {}
class InvalidWSParameters extends ymError {}
class ErrorVisibleForClient extends ymError {}

export {
  TypeRrmsError,
  MissingRequestError,
  DeniedRequestError,
  ExceptionalExecutionError,
  IllegalRrmsError,
  AuthError,
  NotExistDataError,
  DuplicateDataError,
  ParseError,
  IneffectiveActionError,
  UnpreparedClassError,
  FileSystemError,
  ImpossibleActionError,
  FatalError,
  InvalidWSParameters,
  InvalidParameters,
  InvalidNumberType,
  NPGTimeOut,
  NPWorkHours,
  NPGReject,
  HostNotSupporter,
  ErrorVisibleForClient,
};
