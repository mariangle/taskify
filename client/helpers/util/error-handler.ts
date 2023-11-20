import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

// Generic function to delegate client and server errors

export const handleError = (err: unknown) => {
  // Errors from the server
  if (err instanceof AxiosError) { 
    const axiosError = err as AxiosError;
    if (axiosError.status === 500){
      // An internal server occured
      toast.error('An unexpected error occured from our end.');
    } else if (axiosError.response) {
    // Client-side checks are expected to cover all validations, 
    // but the server also performs validations as an additional layer of security
    toast.error(err.response?.data);
    } else if (axiosError.request) {
      // Likely the server isn't running
      toast.error('No response received from the server.');
    } 
  // Errors from the client
  } else if (err instanceof Error) {
    const error = err as Error;
    // Showing the error when attempting to perform task
    toast.error(error.message);
  } else {
    toast.error('An unexpected error occurred. See console for more details.');
    console.log(err);
  }
};

