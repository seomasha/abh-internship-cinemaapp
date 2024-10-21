import ToastService from "./toastService";

class ErrorHandler {
  static handleError(error) {
    let errorMsg = "An unknown error occurred.";

    if (error.response) {
      errorMsg = error.response.data.message || errorMsg;
      console.error(`Error: ${error.response.status} - ${errorMsg}`)
      ToastService.error(`Error: ${error.response.status} - ${errorMsg}`);
    } else if (error.request) {
      errorMsg = "No response received back from the server.";
      ToastService.error("Error: No response received | ", error.request);
      console.error("Error: No response received | ", error.request)
    } else {
      errorMsg = error.message;
      ToastService.error("Error: ", error.message);
      console.error("Error: ", error.message)
    }
  }
}

export default ErrorHandler;
