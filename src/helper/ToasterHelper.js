import toast, { Toaster } from "react-hot-toast";

class ToasterClass {
  successToast(msg) {
    toast.success(msg);
  }
  errorToast(msg) {
    toast.error(msg);
  }
}

export const { errorToast, successToast } = new ToasterClass();
