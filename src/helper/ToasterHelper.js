import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

class ToasterClass {
  successToast(msg) {
    toast.success(msg);
  }
  errorToast(msg) {
    toast.error(msg);
  }
  async SessionAlertSwal() {
    const result = await Swal.fire({
      title: "Session Expired!",
      text: "Please login again to continue..",
      icon: "error",
      confirmButtonText: "Confirm",
      animation: false,
      allowOutsideClick: false,
      confirmButtonColor: "#000000",
    });
    return result.isConfirmed;
  }
}

export const { errorToast, successToast, SessionAlertSwal } =
  new ToasterClass();
