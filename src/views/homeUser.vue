<template>
  <div class="home">
    <div class="header">
      <div class="header-cont">
        <div class="img">
          <img :src="userInfo.avatar" />
        </div>
        <div class="info">
          <li>{{ userInfo.userName }}</li>
          <li>
            <p>{{ userInfo.deptName }}</p>
            <!-- <p><span>全部</span><van-icon name="arrow-down" /></p> -->
          </li>
        </div>
      </div>
      <div class="query">
        <li>
            <normalException @onType="onType" />
        </li>
        <li class="month" @click="showPicker = true">
          <p>{{ userInfo.month }}</p>
          <van-icon name="arrow-down" />
        </li>
      </div>
    </div>
    <div class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          :finished-text="finishedText"
          @load="onLoad"
        >
          <div class="lists" v-for="(item, i) in lists" :key="i">
            <div class="list-left">
              <li>
                <span>设备位置：</span>
                <span v-if="item.deviceLocationName">{{ item.deviceLocationName }}</span>
                <span v-else>- -</span>
              </li>
              <li>
                <span>刷脸时间：</span>
                <span v-if="item.recognizeTime">{{ item.recognizeTime | dayjs }}</span>
                <span v-else>- -</span>
              </li>
              <li class="left-result">
                <span>记录结果：</span>
                <span>{{ item.type ? item.type==1?"正常":"异常" : "- -" }}</span>
              </li>
            </div>
            <img
              v-if="item.type == 1"
              src="@/assets/images/icon_zhengchang@2x.png"
            />
            <img v-else src="@/assets/images/icon_yichang@2x.png" />
          </div>
        </van-list>
      </van-pull-refresh>
      <!-- <template v-if="lists.length"> </template>
      <van-empty description="暂无数据" v-else /> -->
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import normalException from "@/components/normalException";
import { myFaceRecord } from "@/api/homeUser";
export default {
  name: "homeUser",
  data() {
    return {
      showPicker: false,
      currentDate: new Date(),
      userInfo: {
        avatar: require("@/assets/images/icon_touxiang.png"),
        deptName: "- -", // 部门
        userName: "- -", // 姓名
        userId: "", // 用户id
        ddUserId: "", // 钉钉id
        normalCount: 0, // 正常次数
        abnormalCount: 0, // 异常次数
        month: this.$moment().format("YYYY-MM"),
      },
      page: 1, // 页数
      rows: 10, // 每页显示条数
      lists: [], // 列表数据
      loading: true, //
      finished: false, //
      isLoading: false, // 下拉刷新状态
      finishedText: "", //
      type: null, // 查询类型:-1 异常，1 正常,null 全部
    };
  },

  components: {normalException},

  computed: {},

  created() {
    let user = this.$ls.get("USER");
    console.log(this.$ls.get("USER"));
    if (user && user.data) {
      let { name, userId, deptName, avatar,ddUserId } = user.data.userInfo;
      this.userInfo.userId = userId;
      this.userInfo.ddUserId = ddUserId;
      this.userInfo.userName = name ? name : "- -";
      this.userInfo.deptName = deptName ? deptName : "- -";
      if (avatar) this.userInfo.avatar = avatar;
        this.$dd.setMenu(
          [
            {
              id: "1",
              text: "更多",
            },
          ],
          (data) => {
            if (data.id == 1) this.$dd.share({ type: 0 });
          }
        );
    }
    console.log(this.userInfo);
    this.getSwipingFaceInOutAccess();
  },

  methods: {
    onType(item) {
      console.log("onType", item);
      console.log("type-->", item.type);
      this.lists = [];
      this.page = 1;
      this.finished = false;
      this.loading = true;
      this.type = item.type;
      this.getSwipingFaceInOutAccess();
    },
    onConfirm(val) {
      console.log(val);
      let month = this.$moment(val).format("YYYY-MM");
      this.userInfo.month = month;
      this.showPicker = false;
      this.lists = [];
      this.page = 1;
      this.finished = false;
      this.loading = true;
      this.getSwipingFaceInOutAccess();
    },

    /* 下拉刷新列表 */
    onRefresh() {
      setTimeout(() => {
        this.lists = [];
        this.page = 1;
        this.finished = false;
        this.loading = true;
        this.getSwipingFaceInOutAccess();
        this.$toast.success("刷新成功");
        this.isLoading = false;
      }, 600);
    },
    /* 上拉加载 */
    onLoad() {
      console.log("上拉加载");
      setTimeout(() => {
        this.page++;
        this.getSwipingFaceInOutAccess();
        console.log("this.page++-->", this.page);
      }, 600);
    },
    getSwipingFaceInOutAccess() {
      let params = {
        pageNum: this.page, // 当前页数
        pageSize: this.rows, // 每页显示数量
        startDate: this.userInfo.month,
        type: this.type,
        //ddUserId: this.userInfo.ddUserId,
      };
      this.$toast.loading({
        duration: 0,
        message: "加载中",
        overlay: true,
      });
      myFaceRecord(params)
        .then((res) => {
          console.log("门禁刷脸记录", res);
          this.$toast.clear();
          if (res.code == 0) {
            let list = res.data.list;
            this.lists.push(...list);
            this.loading = false;
            if (list.length < this.rows) {
              this.finished = true;
            }
            if (this.lists.length) {
              this.finishedText = "没有更多数据了";
            } else {
              this.finishedText = "暂无数据";
            }
          } else {
            this.loading = false;
            this.finished = true;
            this.finishedText = res.msg;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
  },
};
</script>
<style lang='less' scoped>
.home {
  position: relative;
  height: 100%;
  // height: 100vh;
  // overflow: hidden;
  background: #f6f7fc;
  .header-cont {
    padding: 15px 0;
    display: flex;
    // background: rgb(10, 146, 236);
    background: url("../assets/images/image_1@2x.png") no-repeat;
    background-size: cover;
    background-position: center 0;
    .img {
      width: 64px;
      height: 64px;
      margin: 0 15px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      color: #ffffff;
      flex: 1;
      li {
        line-height: 32px;
        display: flex;
        justify-content: space-between;
        padding-right: 15px;
        p:last-child {
          display: flex;
          align-items: center;
          span {
            margin-right: 8px;
          }
        }
      }
    }
  }
  .query {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    li {
      line-height: 28px;
    }
    li:last-child {
      padding: 0 12px;
      display: flex;
      align-items: center;
      background: #ffffff;
      border-radius: 12px;
      p {
        margin-right: 8px;
        font-size: 14px;
      }
    }
  }
  .content {
    height: calc(100% - 152px);
    overflow: auto;
    padding: 0 15px;
    .lists {
      background: #fff;
      border-radius: 8px;
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      .list-left {
        li {
          line-height: 24px;
          span {
            font-size: 14px;
          }
          // &:last-child {
          //   color: #999;
          // }
        }
        .left-result{
          color: #999;
        }
      }
      img {
        width: 64px;
        height: 64px;
      }
    }
  }
}
</style>