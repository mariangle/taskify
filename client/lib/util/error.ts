/* eslint-disable no-console */
import { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const handleResponseError = (response: AxiosResponse) => {
  console.error('Unhandled response error:', response);
  toast.error('Oops. Something went wrong.');
};

const handleRequestError = (error: any) => {
  console.error('Request error:', error);
  toast.error('Something went wrong.');
};

const handleAxiosError = (error: AxiosError) => {
  const { response, request } = error;

  if (response) {
    handleResponseError(response);
  } else if (request) {
    handleRequestError(request);
  } else {
    console.error('Unhandled AxiosError:', error);
    toast.error('An unhandled error occured.');
  }
};

const handleClientError = (error: Error) => {
  toast.error(error.message);
};

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    handleAxiosError(error);
  } else if (error instanceof Error) {
    handleClientError(error);
  } else {
    console.log('Unhandled error:', error);
    toast.error('An unexpected error occurred.');
  }
};
