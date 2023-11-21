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

const handleAxiosError = (error: AxiosError) => {
  const { response, request } = error;

  if (response) {
    handleResponseError(response);
  } else if (request) {
    handleRequestError(request);
  } else {
    console.error('Unhandled AxiosError:', error);
    toast.error('An unexpected Axios error occurred.');
  }
};

const handleResponseError = (response: any) => {
  const { status, data } = response;

  switch (status) {
    case 401:
      // Handle unauthorized access (e.g., user not logged in, expired or invalid token)
      toast.error('Unauthorized access. Please log in or check your credentials.');
      break;
    case 404:
      toast.error('Resource not found.');
      break;
    case 500:
      toast.error('Internal server error.');
      break;
    default:
      console.error('Unhandled response error:', response);
      toast.error('An unexpected error occurred.');
  }
};

const handleRequestError = (error: any) => {
  // TODO: Create API endpoint to check whether user is logged or not
  if (error.withCredentials  === false) {
    toast.error('Please log in or check your credentials.');
  } else {
    console.error('Request error:', error);
    toast.error('No response received from the server.');
  }
};

const handleClientError = (error: Error) => {
  toast.error(error.message);
};
