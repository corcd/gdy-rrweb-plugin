/*
 * @Author: Whzcorcd
 * @Date: 2020-06-02 15:46:54
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-04 19:23:21
 * @Description: file content
 */

const rrweb = require('rrweb')
const dayjs = require('dayjs')
const Hash = require('object-hash')

export default class RRgdy {
  constructor(uin = 0, name = 'example', url = '', option) {
    const original = {
      speed: 1, // 回放倍速
      root: document.body, // 回放时使用的 HTML 元素
      loadTimeout: 0, // 加载异步样式表的超时时长
      skipInactive: false, // 是否快速跳过无用户操作的阶段
      showWarning: true, // 是否在回放过程中打印警告信息
      showDebug: false // 是否在回放过程中打印 debug 信息
    }
    const timestamp = dayjs().format('{YYYY} MM-DDTHH:mm:ss')

    this.events = []
    this.uin = uin
    this.name = name
    this.url = url
    this.option = Object.assign({}, original, option)
    this.startTime = 0
    this.endTime = 0
    this.session = ''

    this.init = this.init.bind(this)
    this.record = this.record.bind(this)
    this.stop = this.stop.bind(this)
    this.setSession = this.setSession.bind(this)
    this.minimize = this.minimize.bind(this)
    this.restore = this.restore.bind(this)
    this.export = this.export.bind(this)
    this.replay = this.replay.bind(this)

    //
    this.init()
  }

  init() {
    this.setSession()
  }

  record() {
    const _this = this
    rrweb.record({
      emit(event, checkout) {
        if (checkout) {
          _this.export(_this.url)
          _this.setSession()
        }
        const data = Object.assign({}, event, {
          uin: _this.uin,
          name: _this.name,
          session: _this.session
        })
        _this.events.push(data)
      },
      checkoutEveryNms: 1000 * 60 * 1 // 1 minutes
    })
  }

  stop() {
    rrweb.record({
      // nothing
    })
  }

  setSession() {
    if (this.startTime) this.endTime = dayjs().unix()
    const timestamp = dayjs().format('{YYYY} MM-DDTHH:mm:ss')
    this.session = Hash({ timestamp: timestamp })
    this.startTime = dayjs().unix()
  }

  minimize(source) {
    const pako = require('pako')
    return pako.deflate(JSON.stringify(source), { to: 'string' })
  }

  restore(binaryString) {
    const pako = require('pako')
    return JSON.parse(pako.inflate(binaryString, { to: 'string' }))
  }

  export(url) {
    console.log(this.events)
    const data = this.minimize(this.events)
    const params = {
      name: this.name,
      uin: this.uin,
      session: this.session,
      data: data,
      startTime: this.startTime,
      endTime: this.endTime
    }
    // 尝试使用 sendbeacon
    if (navigator.sendBeacon && data.length < 65000) {
      const status = navigator.sendBeacon(url, params)
      status && console.error(status)
      return
    }
    fetch(url, {
      body: params,
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors' // no-cors, cors, *same-origin
    })
      .then(response => {
        return response.json()
      })
      .catch(e => {
        console.error(e)
      })
  }

  replay() {
    const replayer = new rrweb.Replayer(this.events, this.option)
    replayer.play()
  }
}
