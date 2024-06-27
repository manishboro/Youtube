export const mockApi = (body, success = true, delay = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(body);
      } else {
        reject(new Error("Failed to fetch data"));
      }
    }, delay);
  });
