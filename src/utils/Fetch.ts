export const fetchPost = (input: RequestInfo, init?: RequestInit) => {
  fetch(input, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    ...init,
  }).catch((err) => {
    console.error(err)
  })
}
