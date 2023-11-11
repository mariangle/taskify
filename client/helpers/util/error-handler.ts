import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

// general function to handle errors

export const handleError = (err: unknown) => {
  if (err instanceof AxiosError) { // errors from the server
    const axiosError = err as AxiosError;
    if (axiosError.response) {
      toast.error(err.response?.data);
    } else if (axiosError.request) {
      toast.error('No response received from the server.');
    } 
  } else if (err instanceof Error) { // errors thrown from client validation
    const error = err as Error;
    toast.error(error.message);
  } else {
    toast.error('An unexpected error occurred. See console for more details.');
    console.log(err);
  }
};

