import ToastService from "./toastService";

class ErrorHandler {
  static handleError(error) {
    let errorMsg = "An unknown error occurred.";

    if (error.response) {
      errorMsg = `Error: ${error.response.status} - ${
        error.response.data.message || errorMsg
      }`;
    } else if (error.request) {
      errorMsg = `Error: No response received | ", ${error.request}`;
    } else {
      errorMsg = `Error: ${error.message}`;
    }

    console.error(`Error: ${error.response.status} - ${errorMsg}`);
    ToastService.error(`Error: ${error.response.status} - ${errorMsg}`);
  }
}

export default ErrorHandler;
