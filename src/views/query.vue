<template>
  <div class="query">
    <div class="header" ref="header">
      <weekMonth @onDate="onDate" />
    </div>
    <div :class="{ tabList: true, isAndroid: isAndroid }" ref="listsTop">
      <van-tabs
        v-model="active"
        sticky
        :offset-top="top"
        animated
        :ellipsis="false"
        title-active-color="#3396fa"
      >
        <van-tab
          v-for="(data, i) in tabList"
          :title="data.title"
          :disabled="data.disabled"
          :key="i"
          style="padding: 0 15px"
        >
          <van-pull-refresh
            v-model="data.isLoading"
            @refresh="onRefresh"
            style="height: 100%"
          >
            <van-list
              v-model="data.loading"
              :finished="data.finished"
              :immediate-check="false"
              :finished-text="data.finishedText"
              @load="onLoad"
            >
              <div class="tab-title">
                <li>
                  <span>检测结果</span
                  ><span>（{{ data.alcoholResult }}{{ data.total }}人）</span>
                </li>
                <li @click="showPicker = true">
                  <span>{{ data.alcoholResult }}</span
                  ><van-icon name="arrow-down" />
                </li>
              </div>

              <div
                class="tab-cont"
                v-for="(item, j) in data.list"
                :key="j"
                @click="headClick(item)"
              >
                <div class="list-top">
                  <div class="img">
                    <img :src="item.avatar" v-if="item.avatar" />
                    <img src="@/assets/images/icon_touxiang.png" v-else />
                  </div>
                  <div class="info">
                    <p>
                      <span>{{ item.userName }}</span
                      ><span>{{ item.deptName }}</span>
                    </p>
                    <van-icon name="arrow-down" />
                  </div>
                </div>
                <div class="list-bottom">
                  <div>
                    <li>
                      <span>检测次数：</span>
                      <span> 共检测{{ item.total }}次 </span>
                    </li>
                    <li>
                      <span>检测结果：</span>
                      <span>
                        正常{{ item.normalCount }}次，异常{{
                          item.abnormalCount
                        }}次
                      </span>
                    </li>
                  </div>
                  <img
                    src="@/assets/images/icon_yichang@2x.png"
                    v-if="item.abnormalCount"
                  />
                  <img src="@/assets/images/icon_zhengchang@2x.png" v-else />
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import weekMonth from "@/components/weekMonth";
import { mapState, mapMutations } from "vuex";
import {
  faceRecordStatisticsDetail,
  faceRecordStatisticsDetailDept,
} from "@/api/home";
export default {
  name: "query",
  data() {
    return {
      active: 0,
      weekType: false,
      monthType: true,
      showPicker: false,
      isAndroid: false,
      startDate: "", // 开始时间
      endDate: "", // 结束时间
      queryTime: new Date(), // 查询年月份
      type: 1, // 查询类型:1-按月，2-按周
      tabList: [],
      columns: ["全部", "正常", "异常"],
      top: 0,
      newScrollTop: "",
    };
  },

  components: { weekMonth },

  computed: { ...mapState("home", ["scrollTop", "fromTab"]) },
  watch: {
    // 监听当天激活状态数据更新
    active() {
      console.log("active---->", this.active);
      this.getTabList();
      this.getFaceRecordStatisticsDetail();
    },
  },
  created() {
    this.setTabList();
  },
  activated() {
    if (this.newScrollTop) {
      this.$nextTick(() => {
        // window.pageYOffset = this.newScrollTop;
        document.body.scrollTop = this.newScrollTop;
        document.documentElement.scrollTop = this.newScrollTop;
      });
      console.log("activated", this.newScrollTop);
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
    console.log("deactivated", this.newScrollTop);
  },
  mounted() {
    this.$nextTick(() => {
      this.top = this.$refs.header.offsetHeight;
      var u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        console.log("Android");
        this.isAndroid = false;
        this.top += 0.2;
      }
      console.log("top--->", this.top);
    });
    if (this.scrollTop) {
      this.$nextTick(() => {
        this.$refs.listsTop.scrollTop = this.scrollTop;
      });
    }
    console.log("mounted", this.scrollTop);
    window.addEventListener("scroll", this.handleScroll);
  },

  methods: {
    ...mapMutations("home", ["setScrollTop", "setmyRecord", "setFromTab"]),
    handleScroll() {
      console.log(
        document.documentElement.scrollTop,
        document.body.scrollTop,
        window.pageYOffset
      );
      let scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      console.log(scrollTop);
      this.newScrollTop = scrollTop;
    },
    onDate(item) {
      console.log("onDate", item);
      let startDate = "",
        endDate = "";
      if (item.type == 1) {
        startDate = this.$moment(item.monthStart).format("YYYY-MM-DD");
        endDate = this.$moment(item.monthEnd).format("YYYY-MM-DD");
      }
      if (item.type == 2) {
        startDate = this.$moment(item.startTime).format("YYYY-MM-DD");
        endDate = this.$moment(item.endTime).format("YYYY-MM-DD");
      }
      this.startDate = startDate;
      this.endDate = endDate;
      this.queryTime = this.$moment(startDate).format("YYYY-MM");
      this.getTabList();
      this.getFaceRecordStatisticsDetailDept();
      this.getFaceRecordStatisticsDetail();
    },
    getSCroll() {
      let scrollTop = this.$refs.listsTop.scrollTop;
      console.log("scrollTop--->", scrollTop);
      this.setScrollTop(scrollTop);
    },
    /* van-tabs导航栏点击事件 */
    onChange(name, title) {
      console.log("name, title", name, title);
      const tabList = this.tabList[this.active];
      tabList.list = [];
      this.getFaceRecordStatisticsDetail();
    },
    /* 下拉刷新 */
    onRefresh() {
      setTimeout(() => {
        const tabList = this.tabList[this.active];
        tabList.list = [];
        tabList.page = 1;
        tabList.finished = false;
        tabList.loading = true;
        this.getFaceRecordStatisticsDetail();
        this.$toast.success("刷新成功");
        tabList.isLoading = false;
      }, 600);
    },
    /* 上拉加载 */
    onLoad() {
      console.log("上拉加载");
      const tabList = this.tabList[this.active];
      setTimeout(() => {
        tabList.page++;
        this.getFaceRecordStatisticsDetail();
        console.log("tabList.page++-->", tabList.page);
      }, 600);
      console.log("上拉加载----11111111==");
    },
    onConfirm(val) {
      this.tabList[this.active].alcoholResult = val;
      this.getTabList();
      this.getFaceRecordStatisticsDetail();
      this.showPicker = false;
    },
    headClick(item) {
      console.log("查看个人详情", item);
      this.$router.push("/myHome");
      this.setmyRecord({ ...item, queryTime: this.queryTime });
      this.setFromTab({ active: this.active, tabList: this.tabList });
      this.getSCroll();
    },
    getFaceRecordStatisticsDetailDept() {
      let params = {
        startDate: this.startDate,
        endDate: this.endDate,
      };
      this.setTabList();
      this.$toast.loading({
        duration: 0,
        message: "加载中",
      });
      faceRecordStatisticsDetailDept(params)
        .then((res) => {
          this.$toast.clear();
          console.log("酒检统计详情部门列表", res);
          if (res.code == 0) {
            if (res.data.length) {
              this.tabList.splice(1, 1); // 如果有值则删除第二个禁用的对象
              res.data.forEach((e) => {
                let obj = {
                  title: e.deptName,
                  id: e.deptId,
                  page: 1,
                  pagesize: 10,
                  finished: false,
                  loading: true,
                  isLoading: false,
                  disabled: false,
                  finishedText: "",
                  list: [],
                  total: 0,
                  alcoholResult: "异常",
                };
                this.tabList.push(obj);
              });
            }
            console.log("tabList", this.tabList);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    getFaceRecordStatisticsDetail() {
      const tabList = this.tabList[this.active];
      let params = {
        pageSize: tabList.pagesize, // 每页显示条数
        pageNum: tabList.page, // 当前页数
        deptId: tabList.id, // 当前页数
        startDate: this.startDate,
        endDate: this.endDate,
      };
      if (tabList.alcoholResult == "正常") params.alcoholResult = 0;
      if (tabList.alcoholResult == "异常") params.alcoholResult = 1;
      console.log("params-->", params);
      this.$toast.loading({
        duration: 0,
        message: "加载中",
      });
      faceRecordStatisticsDetail(params)
        .then((res) => {
          console.log("酒检统计详情", res);
          this.$toast.clear();
          if (res.code == 0) {
            let list = res.data.list;
            tabList.total = res.data.total;
            if (list.length) {
              list.forEach((e) => {
                e.total = parseInt(e.normalCount + e.abnormalCount);
              });
            }
            tabList.list.push(...list);
            tabList.loading = false;
            if (list.length < tabList.pagesize) {
              tabList.finished = true;
            }
            if (tabList.list.length) {
              tabList.finishedText = "没有更多数据了";
            } else {
              tabList.finishedText = "暂无数据";
            }
          } else {
            tabList.finished = true;
            tabList.loading = false;
            tabList.finishedText = "暂无数据";
          }
          console.log("tabList", tabList);
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    setTabList() {
      this.tabList = [
        {
          title: "全部",
          id: "",
          page: 1,
          pagesize: 10,
          finished: false,
          loading: true,
          isLoading: false,
          finishedText: "",
          disabled: false,
          list: [],
          total: 0,
          alcoholResult: "异常",
        },
        {
          title: "",
          id: "",
          page: 1,
          pagesize: 10,
          finished: false,
          loading: true,
          isLoading: false,
          finishedText: "",
          disabled: true,
          list: [],
          total: 0,
          alcoholResult: "异常",
        },
      ];
    },
    //
    getTabList() {
      const tabList = this.tabList[this.active];
      tabList.list = [];
      tabList.page = 1;
      tabList.finished = false;
      tabList.loading = true;
      console.log("arr====1", tabList, "active--", this.active);
    },
  },
};
</script>
<style lang='less' scoped>
.query {
  background: #f6f7fc;
  // min-height: 100vh;
  // overflow: hidden;
  position: relative;
  .header {
    background: #f6f7fc;
    top: 0;
    position: fixed;
    padding: 12px 15px 0;
    width: 100%;
    z-index: 1000;
  }
}
.tabList {
  padding-top: 74px;
  // height: calc(100% - 74px);
  // height: 100%;
  // overflow-y: auto;
  // padding: 0 15px;
  background: #f6f7fc;
  .tab-title {
    padding: 16px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #cccccc;
    border-radius: 4px;
    li {
      &:first-child {
        span {
          &:last-child {
            color: #999999;
            font-size: 14px;
          }
        }
      }
      &:last-child {
        display: flex;
        align-items: center;
        span {
          color: #3396fa;
          font-size: 14px;
          margin-right: 8px;
        }
      }
    }
  }
  .tab-cont {
    background: #fff;
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 12px;
    .list-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      img {
        width: 32px;
        height: 32px;
        margin-right: 15px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        p {
          span {
            &:first-child {
              margin-right: 12px;
            }
          }
        }
      }
    }
    .list-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        li {
          &:first-child {
            margin-bottom: 12px;
          }
          span {
            font-size: 14px;
          }
          &:last-child {
            color: #999;
          }
        }
      }
      img {
        width: 53px;
        height: 53px;
      }
    }
  }
}
</style>