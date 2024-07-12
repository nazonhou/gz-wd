import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const useRequest = (options: RequestOptions) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});
  const [abortController, setAbortController] = useState<AbortController>();
  const headers = {
    ...options.headers,
  };

  useEffect(
    () => () => abortController && abortController?.abort(),
    [abortController],
  );

  async function send({
    data,
    onfinally,
    onSuccess,
    url,
  }: {
    data?: any;
    onfinally?: () => void;
    onSuccess?: () => void;
    url: string;
  }) {
    //* Reinitialise states
    const controller = new AbortController();
    setAbortController(controller);
    setResponse(undefined);
    setErrorMessage('');
    setValidationErrors({});

    const requestConfig: AxiosRequestConfig = {
      ...options,
      url,
      headers,
      signal: controller.signal,
    };
    if (data) {
      requestConfig['data'] = data;
    }
    try {
      const response = await axios
        .create({
          baseURL:
            import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_API_PREFIX,
        })
        .request(requestConfig);
      setResponse(response);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 422 &&
          Array.isArray(error.response.data?.errors)
        ) {
          const errors: Record<string, string[]> = {};
          error.response.data?.errors.forEach(
            (item: { path: string; msg: string }) => {
              if (item.path in errors) {
                errors[item.path].push(item.msg);
                return;
              }
              errors[item.path] = [item.msg];
            },
          );
          setValidationErrors(errors);
        } else if (error.response?.data && 'error' in error?.response?.data) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage(
            'Unable to process this operation. Please retry later',
          );
          console.log(error.response?.status);
          console.error(error.response);
          // Do something with this error...
        }
      } else {
        setErrorMessage('Unable to process this operation. Please retry later');
        console.error(error);
      }
    }
    if (onfinally) {
      onfinally();
    }
  }

  return { response, errorMessage, validationErrors, send };
};
interface RequestOptions {
  method:
    | 'get'
    | 'delete'
    | 'head'
    | 'options'
    | 'post'
    | 'put'
    | 'patch'
    | 'getUri';
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export default useRequest;
