export enum ErrorType {
  Internal = 500,
  BadRequest = 400,
  NotFound = 404,
  Unauthorized = 401,
  Conflict = 409,
}

export class ApiError {
  //Message to print to screen
  msg: string | null;

  //Coder error details
  details: string;

  type: ErrorType;

  constructor(
    details: string,
    type: ErrorType = ErrorType.BadRequest,
    msg: string | null = null
  ) {
    this.msg = msg;
    this.type = type;
    this.details = details;
  }

  getResponse() {
    return new Response(
      JSON.stringify({
        msg: this.msg ?? this.getDefaultMessage(this.type),
        details: this.details,
      }),
      {
        status: this.type,
      }
    );
  }

  getDefaultMessage(type: ErrorType) {
    switch (type) {
      default:
        return "Something went wrong :(";
    }
  }
}
