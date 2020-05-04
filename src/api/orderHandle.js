import request from '@/utils/request'

export function orderPass(param) {
  return handleOrder('/api/order/orderPass', param)
}
export function orderNoPass(param) {
  return notAllowOrder('/api/order/orderNotPass', param)
}
export function orderDown(param) {
  return notAllowOrder('/api/order/orderDown', param)
}

export function imgUpload(url, fd) {
  return request({
    url,
    method: 'post',
    data: fd
  })
}

export function handleOrder(url, ids) {
  return request({
    url,
    method: 'post',
    data: {
      homeAdId: ids
    }
  })
}
export function notAllowOrder(url, param) {
  return request({
    url,
    method: 'post',
    data: param
  })
}

// getTableList(){}
