import { toast } from "react-toastify";

const ToastService = {
  success: (message) => {
    toast.success(message);
  },

  error: (message) => {
    toast.error(message);
  },

  info: (message) => {
    toast.info(message);
  },

  warning: (message) => {
    toast.warn(message);
  },
};

export default ToastService;
