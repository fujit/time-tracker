export const wrapper = <T>(task: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    task
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((json: T) => {
              resolve(json)
            })
            .catch((error) => {
              reject(error)
            })
        } else {
          reject(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const fetchPost = <T>(input: RequestInfo, init?: RequestInit): Promise<T> =>
  wrapper(
    fetch(input, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      ...init,
    })
  )

export const fetchGet = <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  return wrapper(fetch(input, init))
}
