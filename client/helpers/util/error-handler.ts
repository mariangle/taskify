import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    handleAxiosError(error);
  } else if (error instanceof Error) {
    handleClientError(error);
  } else {
    console.error('Unhandled error:', error);
    toast.error('An unexpected error occurred.');
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

const handleRequestError = (request: any) => {
  console.error('Request error:', request);
  toast.error('No response received from the server.');
};

const handleClientError = (error: Error) => {
  toast.error(error.message);
};
