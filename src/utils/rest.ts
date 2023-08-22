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

function request<T>(url: string, options: RequestInit): Promise<T> {
  return new Promise((resolve) => {
    fetch(url, options).then((response) => {
      response.text().then((text) => {
        const responseData: T = text && JSON.parse(text);
        resolve(responseData);
      });
    });
  });
}
