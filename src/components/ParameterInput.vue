<template>
  <div>
    <h4
      class="block-title"
      :style="{
        padding: mobileVersion ? '12px 0 11px 0' : '12px 0 11px 12px',
      }"
    >
      Выберите необходимые параметры
    </h4>
    <div
      class="title-border"
      :style="{ display: mobileVersion ? 'block' : 'none' }"
    ></div>
    <div class="input-container" :style="{ height: height }">
      <div
        class="input-wrapper"
        :style="{
          padding: mobileVersion ? '0' : '0 12px',
        }"
      >
        <div v-for="row of parameter" :key="row.id">
          <div class="input-row">
            <span>{{ row.title }}</span>
            <input
              type="number"
              v-model="row.value"
              @keypress="isNumber($event)"
              @blur="defaultNumber(row.id, row.value)"
              @input="inputValidation(row.id, row.value)"
              :min="row.id === 'cargoWeight' ? 0.1 : 1"
              :step="row.id === 'cargoWeight' ? 0.1 : 1"
            />
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParameterInput",
  data() {
    return {
      height: "auto",
    };
  },
  props: {
    parameter: {
      type: Array,
      required: true,
    },
    mobileVersion: {
      type: Boolean,
      required: true,
      default: false,
    },
    call: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {},
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    inputValidation(id, num) {
      let param = this.parameter.find((item) => item.id === id);
      if (id === "liftingHeight") {
        Number(num) > 84
          ? (param.value = 84)
          : (param.value = Number(num).toFixed(0));
      }
      if (id === "stickLength") {
        Number(num) > 78
          ? (param.value = 78)
          : (param.value = Number(num).toFixed(0));
      }
      if (id === "cargoWeight") {
        Number(num) > 500
          ? (param.value = 500)
          : (param.value = num.replace(/(\.\d)\d+/g, "$1"));
      }
      if (this.call) {
        this.$emit("getList");
      }
    },

    defaultNumber(id, num) {
      let param = this.parameter.find((item) => item.id === id);
      if (id === "stickLength" && Number(num) < 2) {
        param.value = 2;
      }
      if (id === "liftingHeight" && Number(num) < 1) {
        param.value = 1;
      }
      if (id === "cargoHeight" && Number(num) < 1) {
        param.value = 1;
      }
      if (id === "cargoWeight" && Number(num) < 0.1) {
        param.value = 0.1;
      }
    },
  },
  watch: {
    mobileVersion() {
      !this.mobileVersion ? (this.height = "397px") : (this.height = "auto");
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
