import Taro from '@tarojs/taro';

export const fetch = (
  url: string,
  method: string = 'get',
  data: any = {},
  options?: any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const time = new Date().getTime();
    let lastOptions: any = {
      url,
      data,
      method,
      header: {
        'content-type': options?.contentType || 'application/json',
        'x-token': Taro.getStorageSync('x-token'),
        'Access-Key-Timestamp': time,
        'Access-Key-Id': 'gb',
      },
    };
    Taro.showNavigationBarLoading();
    Taro.request(lastOptions)
      .then((res) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `%c${url}`,
            'padding: 2px; color: #685c5c; background: #708f845c',
            ':',
            res
          );
        }

        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch(() => {
        reject('网络请求出错');
      })
      .finally(() => {
        Taro.hideNavigationBarLoading();
      });
  });
};
