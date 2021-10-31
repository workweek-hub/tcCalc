<template>
  <h4
    class="block-title"
    :style="{
      padding: mobileWidth ? '12px 0 11px 0' : '12px 0 11px 12px',
    }"
  >
    Выберите необходимые параметры
  </h4>
  <div
    class="title-border"
    :style="{ display: mobileWidth ? 'block' : 'none' }"
  ></div>
  <div class="input-container">
    <div
      class="input-wrapper"
      :style="{ padding: mobileWidth ? '0' : '0 12px' }"
    >
      <div v-for="row of parameter" :key="row.id">
        <div class="input-row">
          <span>{{ row.title }}</span>
          <input type="text" v-model="row.value" />
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ParameterInput",
  props: {
    parameter: {
      type: Array,
      required: true,
    },
  },
  computed: {
    mobileWidth() {
      return this.$root.clientWidth < this.$root.widthMobileVersion;
    },
  },
};
</script>

<style lang="scss" scoped>
.block-title {
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  text-transform: uppercase;
  background: #f1f1f1;
  padding: 12px 0 11px 12px;
  border-radius: 2px;
  margin: 0;
}
.title-border {
  height: 1px;
  width: 100%;
  background: #ffffff;
  position: absolute;
  left: 0;
}
.input-container {
  width: 100%;
  background: #f1f1f1;
  border-radius: 2px;
  margin-top: 12px;
  padding-bottom: 1px;
  line-height: 34px;
  .input-wrapper {
    margin-bottom: 10px;
    .input-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      > span {
        font-size: 16px;
      }
      > input {
        font-size: 14px;
        background: #ffffff;
        border: 1px solid #aaaaaa;
        box-sizing: border-box;
        border-radius: 2px;
        padding: 0 12px;
        max-width: 104px;
      }
    }
  }
}
</style>
