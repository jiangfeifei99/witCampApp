<template>
  <div class="statData">
    <div class="header">
      <weekMonth @onDate="onDate" />
    </div>
    <div class="data-cont">
      <div class="cont-gauge" v-if="data.total">
        <gaugeEcharts class="gauge" :data="data" ref="gaugeEchart" />
        <div class="cont-num" @click="$router.push('/query')">
          <p>异常人数 {{ data.abnormalCount }} 人</p>
        </div>
      </div>
      <van-empty description="暂无数据" v-else class="cont-gauge" />
      <div class="cont-dept">
        <div class="analysis">
          <div class="dept-title">
            <li></li>
            <p>酒精检测异常情况按部门分析</p>
          </div>
          <barEcharts
            :deptList="deptList"
            v-if="deptList.length"
            ref="barEchart"
          />
          <van-empty description="暂无数据" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import weekMonth from "@/components/weekMonth";
import gaugeEcharts from "@/components/gaugeEcharts";
import barEcharts from "@/components/barEcharts";
import { faceRecordStatistics } from "@/api/home";
export default {
  name: "statData",
  data() {
    return {
      data: {
        total: 0, // 总人数
        normalCount: 0, // 异常人数
        abnormalCount: 0, // 正常人数
      },
      deptList: [], // 部门统计数据
      index: 0,
    };
  },

  components: { weekMonth, gaugeEcharts, barEcharts },

  computed: {},

  created() { },

  methods: {
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
      let params = {
        startDate,
        endDate
      };
      this.deptList = [];
      console.log("params-->", params);
      this.getFaceRecordStatistics(params);
    },
    getFaceRecordStatistics(params) {
      this.$toast.loading({
        duration: 0,
        message: "加载中",
        overlay: true,
      });
      faceRecordStatistics(params)
        .then((res) => {
          console.log("酒检统计", res);
          this.$toast.clear();
          if (res.code == 0) {
            let { deptList, abnormalCount, normalCount } = res.data;
            if (!abnormalCount) abnormalCount = 0;
            if (!normalCount) normalCount = 0;
            if (deptList && deptList.length) {
              this.deptList = deptList;
            }
            this.data.abnormalCount = abnormalCount;
            this.data.normalCount = normalCount;
            this.data.total = parseInt(normalCount + abnormalCount);
            if (this.index) {
              if (this.$refs.gaugeEchart) this.$refs.gaugeEchart.getEcharts(this.data);
            }
          } else {
            this.deptList = [];
            this.data = {
              total: 0, // 总人数
              normalCount: 0, // 异常人数
              abnormalCount: 0, // 正常人数
            };
          }
          this.index++;
          console.log("data--->deptList", this.data, this.deptList);
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
.statData {
  background: #f6f7fc;
  // height: 100vh;
  // overflow: hidden;
  .header {
    padding: 12px 15px;
    width: 100%;
  }
  .data-cont {
    height: calc(100% - 86px);
    overflow: auto;
    padding: 0 15px 12px;
    .cont-gauge {
      background: #fff;
      border-radius: 4px;
      position: relative;
      height: 240px;
      overflow: hidden;
      .gauge {
        position: absolute;
        top: -20px;
      }
      .cont-num {
        position: absolute;
        bottom: 20px;
        width: 100%;
        p {
          margin: 0 auto;
          text-align: center;
          line-height: 34px;
          width: 158px;
          border: 1px solid #2f97fb;
          border-radius: 17px;
          color: #2f97fb;
        }
      }
    }
    .cont-dept {
      margin-top: 12px;
      background: #fff;
      border-radius: 4px;
      .analysis {
        .dept-title {
          display: flex;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #cccccc;
          li {
            width: 4px;
            height: 16px;
            background: #2f97fb;
            border-radius: 2px;
          }
          p {
            color: #333333;
            line-height: 22px;
            margin-left: 12px;
          }
        }
      }
    }
  }
}
</style>