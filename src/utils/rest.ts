export function post<T, Y>(url: string, data: T): Promise<Y> {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export function get<T, Y>(url: string, data: T): Promise<Y> {
  const params = new URLSearchParams(data as URLSearchParams);

  return request(`${url}?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function request<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (data.errorMessage) {
    // eslint-disable-next-line no-console
    console.log('[errorMessage]', data.errorMessage);
  }
  if (data.errorType) {
    // eslint-disable-next-line no-console
    console.log('[errorType]', data.errorType);
  }
  if (data.trace) {
    // eslint-disable-next-line no-console
    console.log('[trace]', data.trace);
  }
  return data as T;
}
