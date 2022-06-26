import request from '@/utils/request'

/**
 * 分类接口
 * @param {object} no
 * @returns 请求的结果：promise 对象
 */
export function getClassify() {
  return request({
    url: '/intf/getCategory',
    method: 'get'
  })
}

/**
 * 分类详情
 * @param {object} data
 * @returns 请求的结果：promise 对象
 */
export function getClassifyMsg(data) {
  return request({
    url: '/intf/GetListByCategory',
    method: 'get',
    params: {
      cids: data.cids, // 分类id
      pageno: data.pageno, // 分页
      count: data.count // 加载数量
    }
  })
}

/**
 * 搜索接口
 * @param {object} data
 * @returns 请求的结果：promise 对象
 */
export function search(data) {
  return request({
    url: '/intf/search',
    method: 'get',
    params: {
      content: data.content, // 关键字
      pageno: data.pageno, // 分页
      count: data.count // 加载数量
    }
  })
}

/**
 * 最新接口
 * @param {object} data
 * @returns 请求的结果：promise 对象
 */
export function newImage(data) {
  return request({
    url: '/intf/newestList',
    method: 'get',
    params: {
      pageno: data.pageno, // 分页
      count: data.count // 加载数量
    }
  })
}
