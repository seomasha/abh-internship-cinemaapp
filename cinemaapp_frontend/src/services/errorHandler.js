import ToastService from "./toastService";

class ErrorHandler {
  static handleError(error) {
    let errorMsg = "An unknown error occurred.";

    if (error.response) {
      const statusCode = error.response.status;
      const serverMessage = error.response.data.message;

      switch (statusCode) {
        case 409:
          errorMsg = serverMessage || "This email is already registered.";
          break;
        case 400:
          errorMsg =
            serverMessage || "Invalid request. Please check your input.";
          break;
        case 500:
          errorMsg = "Server error. Please try again later.";
          break;
        default:
          errorMsg = `Error: ${serverMessage || "An error occurred."}`;
      }
    } else if (error.request) {
      errorMsg = "Error: No response from the server. Please try again.";
    } else {
      errorMsg = `Error: ${error.message}`;
    }

    console.error(errorMsg);
    ToastService.error(errorMsg);

    return errorMsg;
  }
}

export default ErrorHandler;
