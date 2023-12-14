import { AxiosError, AxiosResponse } from 'axios';
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

const handleResponseError = (response: AxiosResponse) => {
  const { status, data } = response;

  if (!data) {
    console.error(response);
    toast.error('An unexpected error occurred.');
    return;
  }

  switch (status) {
    case 400: 
      toast.error(data);
      break;
    case 401:
      toast.error(data);
      break;
    case 404:
      toast.error(data);
      break;
    case 409:
      toast.error(data);
      break;
    case 500:
      toast.error(data);
      break;
    default:
      console.error('Unhandled response error:', response);
      toast.error('An unexpected error occurred.');
  }
};

const handleRequestError = (error: any) => {
    console.error('Request error:', error);
    toast.error('Something went wrong.');
};

const handleClientError = (error: Error) => {
  toast.error(error.message);
};
