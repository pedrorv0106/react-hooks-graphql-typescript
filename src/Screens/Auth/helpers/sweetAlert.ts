import Swal from 'sweetalert2';

export const singleError = (err: any) => {
  Swal.fire({
    icon: 'error',
    text: err,
  });
};

export const singleWarning = (warn: any) => {
  Swal.fire({
    icon: 'warning',
    text: warn,
  });
};

export const singleInfo = (info: any) => {
  Swal.fire({
    icon: 'info',
    text: info,
  });
};

export const singleSuccess = (message: any, seconds: number = 2) => {
  Swal.fire({
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: seconds * 1000,
  });
};

export const successMessage = async (title: string, message: string) =>
  Swal.fire({
    icon: 'success',
    title,
    text: message,
    showConfirmButton: true,
  });
