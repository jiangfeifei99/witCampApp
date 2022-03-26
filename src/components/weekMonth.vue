<template>
  <div class="weekMonth">
    <li class="left-but">
      <p @click="weekClick" :class="weekType ? 'white' : 'blue'">周</p>
      <p @click="monthClick" :class="monthType ? 'white' : 'blue'">月</p>
    </li>
    <li class="rgiht-date">
      <van-icon name="arrow-left" @click="preMonthWeek" />
      <span v-if="type == 1" style="margin: 0 4px">
        {{ $moment(queryTime).format("YYYY.MM") }}
      </span>
      <span v-else style="margin: 0 4px">
        {{ $moment(startTime).format("MM.DD") }}-
        {{ $moment(endTime).format("MM.DD") }}
      </span>
      <van-icon name="arrow" @click="nextMonthWeek" />
    </li>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      weekType: false,
      monthType: true,
      startTime: "", // 周开始时间
      endTime: "", // 周结束时间
      queryTime: new Date(), // 查询年月份
      type: 1, // 查询类型:1-按月，2-按周
    };
  },

  components: {},

  computed: {},

  created() {
    this.getWeek();
    this.$emit("onDate", this.onForm());
  },

  methods: {
    /* 点击周事件 */
    weekClick() {
      this.weekType = true;
      this.monthType = false;
      this.type = 2;
      this.$emit("onDate", this.onForm());
    },
    /* 点击月事件 */
    monthClick() {
      this.weekType = false;
      this.monthType = true;
      this.type = 1;
      this.$emit("onDate", this.onForm());
    },
    /* 点击上一月或上一周事件 */
    preMonthWeek() {
      let oneDay = 24 * 60 * 60 * 1000;
      if (this.type == 1) {
        console.log("pre--->上一月");
        let queryTime = this.$moment(this.queryTime).format("YYYY-MM");
        let day = new Date(queryTime + "-01") - oneDay;
        this.queryTime = new Date(day);
      } else {
        console.log("pre--->上一周");
        this.startTime = this.startTime - oneDay * 7;
        this.endTime = this.endTime - oneDay * 7;
      }
      this.$emit("onDate", this.onForm());
    },
    /* 点击下一月或下一周事件 */
    nextMonthWeek() {
      let oneDay = 24 * 60 * 60 * 1000;
      if (this.type == 1) {
        console.log("next-->下一月");
        this.queryTime = new Date(
          this.queryTime.getFullYear(),
          this.queryTime.getMonth() + 1,
          1,
          12
        );
      } else {
        console.log("next-->下一周");
        this.startTime = this.startTime + oneDay * 7;
        this.endTime = this.endTime + oneDay * 7;
      }
      this.$emit("onDate", this.onForm());
    },
    getWeek() {
      let oneDay = 24 * 60 * 60 * 1000;
      let day =
        new Date(this.$moment(this.queryTime).format("YYYY-MM") + "-01") - 0;
      let week = new Date(day).getUTCDay();
      this.startTime = day - oneDay * week;
      this.endTime = day + oneDay * (6 - week);
    },
    onForm() {
      let date = new Date(this.queryTime),
        y = date.getFullYear(),
        m = date.getMonth();
      let monthStart = new Date(y, m, 1);
      let monthEnd = new Date(y, m + 1, 0);
      return {
        monthStart, // 月开始时间
        monthEnd, // 月结束时间
        queryTime: this.queryTime, // 查询年月份
        startTime: this.startTime, // 周开始时间
        endTime: this.endTime, // 周结束时间
        type: this.type, // 查询类型:1-按月，2-按周
      };
    },
  },
};
</script>
<style lang='less' scoped>
.blue {
  color: #3396fa;
}
.white {
  color: #fff;
  background: #3396fa;
}
.weekMonth {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-but {
    display: flex;
    height: 30px;
    p {
      width: 44px;
      text-align: center;
      line-height: 30px;
    }
    p:nth-child(1) {
      border: 1px solid #3396fa;
      border-radius: 8px 0px 0px 8px;
    }
    p:nth-child(2) {
      border: 1px solid #3396fa;
      border-radius: 0px 8px 8px 0px;
    }
  }
  .rgiht-date {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      color: #333333;
    }
    i {
      color: #ccc;
    }
  }
}
</style>