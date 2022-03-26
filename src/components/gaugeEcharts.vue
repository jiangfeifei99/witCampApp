<template>
  <div style="width: 100%; height: 345px" ref="echarts"></div>
</template>

<script>
export default {
  name: "",
  props: ["data"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  created() {
    console.log(this.data);
  },

  mounted() {
    this.getEcharts(this.data);
  },

  methods: {
    getEcharts(data) {
      let option = {
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: data.total,
            splitNumber: null,
            itemStyle: {
              color: "#2F97FB",
              shadowColor: "rgba(0,138,255,0.45)",
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 12,
              },
            },
            progress: {
              show: true,
              roundCap: true,
              width: 12,
            },
            pointer: {
              icon:
                "path://M535.466667 812.8l450.133333-563.2c14.933333-19.2 2.133333-49.066667-23.466667-49.066667H61.866667c-25.6 0-38.4 29.866667-23.466667 49.066667l450.133333 563.2c12.8 14.933333 34.133333 14.933333 46.933334 0z",
              length: "8%",
              width: 16,
              offsetCenter: [0, "-102%"],
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: "auto",
                width: 2,
              },
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: "auto",
                width: 5,
              },
            },
            axisLabel: {
              color: "#464646",
              fontSize: 20,
              distance: -60,
              // formatter: function (value) { }
            },
            title: {
              offsetCenter: [0, "-35%"],
              fontSize: 20,
            },
            detail: {
              fontSize: 50,
              offsetCenter: [0, "0%"],
              valueAnimation: true,
              formatter: function (value) {
                return "{value|" + value + "}{unit|人}";
              },
              color: "auto",
              rich: {
                value: {
                  fontSize: 30,
                  fontWeight: "bolder",
                  color: "#5CCB53",
                },
                unit: {
                  fontSize: 12,
                  color: "#333",
                  padding: [0, 0, -6, 4],
                },
              },
            },
            data: [
              {
                value: data.normalCount,
                name: "检测正常人数",
              },
            ],
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