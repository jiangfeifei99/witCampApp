<template>
  <div :style="{ width: '100%', height: height }" ref="echarts"></div>
</template>

<script>
export default {
  name: "",
  props: ["deptList"],
  data() {
    return {
      height: 0,
    };
  },

  components: {},

  computed: {},

  created() {
    if (this.deptList.length) {
      let i = this.deptList.length;
      this.height = i * 50 + "px";
    }
  },

  mounted() {
    this.getEcharts(this.deptList);
  },

  methods: {
    getEcharts(item) {
      let name = [],
        num = [];
      if (item.length) {
        item.forEach((e) => {
          name.push(e.deptName);
          num.push(e.abnormalCount);
        });
      }

      let option = {
        grid: {
          left: "25",
          top: "10",
          right: "40",
          bottom: "0",
          containLabel: true,
        },
        xAxis: [
          {
            show: false,
          },
        ],
        yAxis: [
          {
            type: "category",
            offset: 10,
            axisLabel: {
              color: "black",
              fontSize: 14,
            },
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            data: name,
          },
        ],
        series: [
          {
            name: "人",
            type: "bar",
            barWidth: "25%",
            color: "#FF6F78",
            label: {
              show: true,
              position: "right",
              color: "black",
              formatter: "{c}{a}",
              fontSize: 14,
            },
            itemStyle: {
              normal: {
                barBorderRadius: 8,
              },
            },
            data: num,
          },
        ],
      };
      let myChart = this.echarts.init(this.$refs.echarts);
      myChart.setOption(option, true);
      window.onresize = myChart.resize;
      console.log("option--->", option);
    },
  },
};
</script>
<style lang='less' scoped>
</style>