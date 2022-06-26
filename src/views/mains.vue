<template>
  <div style="background-color: #f6f6f6;">
    <div class="navBig">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="5">
          <h1 style="line-height: 80px;">天天壁纸</h1>
        </el-col>
        <el-col :span="8" class="nav">
            <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            text-color="#ccc"
            active-text-color="#ffd04b">
            <el-menu-item index="1" style="font-size: 20px;margin-top:10px">最新图片</el-menu-item>
            <el-submenu index="2" style="margin-top:10px">
              <template slot="title" ><div style="font-size: 20px;">分类</div></template>
              <template v-for="item in classifyList">
                <el-menu-item :index="item.old_id" :key="item.old_id">{{item.category}}</el-menu-item>
              </template>
            </el-submenu>

          </el-menu>
        </el-col>
        <el-col :span="5">
          <div class="search">
            <el-input v-model="input" placeholder="请输入内容" ></el-input>
            <i class="el-icon-search" @click="sub"></i>
          </div>
        </el-col>
      </el-row>
    </div>
    <ul class="wrap">
      <li  v-for="item in newImgList" :key="item.id">
        <a href="javascript:void(0);" >
          <!-- <img :src="item.url" width="100%"> -->
          <el-image
          :key="item.url"
          :src="item.url"
          lazy
          width="100%"
          >
          </el-image>
          <div class="downloadImg" @click="downloadFile(item.url, `${item.category}.jpg`)"><i class="el-icon-download" style="font-size: 30px;color:#fff;"></i></div>
        </a>
      </li>
    </ul>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="q.pageno"
        :page-size="20"
        style="margin:2% 0 2% 0;float: right;"
        layout=" prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </div>
</template>

<script>
import '@/styles/nav.scss'
import axios from 'axios'
import { getClassify, getClassifyMsg, search, newImage } from '@/api/image'
export default {
  created() {
    if (this.newImgList.length === 0) this.newImageList()
    this.getClassifyList()
  },
  data() {
    return {
      activeIndex: '1',
      input: '',
      newImgList: [],
      classifyList: [],
      text: '最新',
      q: {
        pageno: 1,
        count: 20
      },
      total: 1,
      flag: true
    }
  },
  methods: {
    // 分类接口
    async getClassifyList() {
      try {
        const res = await getClassify()
        this.classifyList = res.data.data
        console.log('分类', this.classifyList)
      } catch (e) {
        console.dir(e)
      }
    },
    // 分类详情
    async  getClassifyMsgList() {
      try {
        const res = await getClassifyMsg(this.q)
        console.log('分类详情', res)
        this.q = {
          pageno: 1,
          count: 20,
          newImgList: res.data.data.list
        }
      } catch (e) {
        console.dir(e)
      }
    },
    // 搜索
    async  searchImage() {
      try {
        const res = await search(this.q)
        console.log('搜索接口', res)
        this.newImgList = res.data.data.list
        this.total = +res.data.data.total_count
      } catch (e) {
        console.dir(e)
      }
    },
    // 最新
    async  newImageList() {
      try {
        const res = await newImage(this.q)
        console.log('最新', res)
        this.newImgList = res.data.data.list
        this.total = +res.data.data.total_count
        // console.log(this.newImgList)
      } catch (e) {
        console.dir(e)
      }
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.q.pageno = val
      if (this.text === '最新') {
        this.newImageList()
      } else if (this.text === '分类') {
        this.getClassifyMsgList()
      } else if (this.text === '搜索') {
        this.searchImage()
        console.log(1111)
      }
    },
    // tab栏点击
    handleSelect(key, keyPath) {
      console.log('key', key, 'keyPath', keyPath)
      // 最新图片
      if (key === '1') {
        this.text = '最新'
        this.q = {
          pageno: 1,
          count: 20
        }
        this.newImageList()
      } else if (keyPath[0] === '2') {
        this.text = '分类'
        this.q = {
          pageno: 1,
          count: 20,
          cids: keyPath[1]
        }
        this.getClassifyMsgList()
      }
    },
    // 点击下载
    downloadFile(url, label) {
      axios.get(url, { responseType: 'blob' }).then(response => {
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = label
        link.click()
        URL.revokeObjectURL(link.href)
      }).catch(console.error)
    },
    // 搜索
    sub() {
      console.log(111)
      this.text = '搜索'
      this.q.content = this.input
      this.searchImage()
    }
  }
}
</script>

<style lang="css">
image{
  height: 10%;
}
body{
  padding: 0px 10% 0 10%;

}
.wrap{
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
}
.wrap li{
  position: relative;
  width: 690px;
  overflow: hidden;
}
/* 下拉 */
.classify{
  position: relative;
}
.classify .pullDown{
  position: absolute;
  top: 70px;
  left: 35%;
  width: 100px;
  height: 500px;
  background-color: pink;

}
.classify .pullDown div{
  display: block;
  line-height: 20px;
  height: 20px;
  font-size: 16px;
}
/* 隐藏小图标 */
.el-menu--horizontal>.el-submenu .el-submenu__icon-arrow {
    display: none;
}
/* 下载图片 */
.downloadImg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  background: rgba(0,0,0,.4);
  transform:translateY(-100%) ;
  transition: .5s;
  text-align: center;
}
.wrap li:hover .downloadImg{
  transform:translateY(0%) ;
}

</style>
