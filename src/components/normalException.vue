<template>
  <div class="typeSelect">
    <li class="left-but">
      <p @click="allClick" :class="allType ? 'white' : 'blue'">全部</p>
      <p @click="normalClick" :class="normalType ? 'white' : 'blue'">正常</p>
      <p @click="exceptionClick" :class="exceptionType ? 'white' : 'blue'">异常</p>
    </li>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      allType: true,
      normalType: false,
      exceptionType: false,
      type: null, // 查询类型:-1 异常，1 正常,null 全部
    };
  },

  components: {},

  computed: {},

  created() {
    //this.$emit("onType", this.onForm());
  },

  methods: {
    /* 点击全部事件 */
    allClick() {
      this.normalType = false;
      this.exceptionType = false;
      this.allType = true;
      this.type = null;
      this.$emit("onType", this.onForm());
    },
    // 点击正常事件
    normalClick() {
      this.normalType = true;
      this.exceptionType = false;
      this.allType = false;
      this.type = 1;
      this.$emit("onType", this.onForm());
    },
    /* 点击异常事件 */
    exceptionClick() {
      this.normalType = false;
      this.exceptionType = true;
      this.allType = false;
      this.type = -1;
      this.$emit("onType", this.onForm());
    },
    onForm() {
      return {
        type: this.type, // 查询类型:-1 异常，1 正常,null 全部
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
.typeSelect {
  padding: 0px;
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
      border: 0px solid #3396fa;
      border-radius: 8px 0px 0px 8px;
    }
    p:nth-child(3) {
      border: 0px solid #3396fa;
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