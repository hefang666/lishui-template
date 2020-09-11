import request from '../utils/request';

export const get = (url, data = {}) =>
  request({
    url,
    method: 'get',
    params: data
  });

export const post = (url, data = {}) =>
  request({
    url,
    method: 'post',
    data
  });

export const deletes = (url, data = {}) =>
  request({
    url,
    method: 'delete',
    params: data
  });
