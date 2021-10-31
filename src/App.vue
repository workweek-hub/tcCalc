<template>
  <div
    class="calc-container"
    ref="calc"
    :style="{ gridTemplateColumns: columnSizes }"
  >
    <div class="calc-inputs"></div>
    <div class="calc-mobile-crane"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      backgroundSize: 16,
      columnSizes: null,
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    this.changeWidthCraneSection();
    window.addEventListener("resize", this.changeWidthCraneSection);
  },
  methods: {
    changeWidthCraneSection() {
      const clientWidth = document.documentElement.clientWidth;
      let widthInPercent;
      if (clientWidth >= 1280) {
        widthInPercent = 63;
      } else if (clientWidth >= 828 && clientWidth < 1280) {
        widthInPercent = 61.9;
      } else if (clientWidth < 828) {
        widthInPercent = 100;
      }
      const fullWidth = this.$refs.calc.clientWidth;
      const numberOfSquares = Math.floor(
        (fullWidth * widthInPercent) / 100 / this.backgroundSize
      );
      const craneColumnWidth = numberOfSquares * this.backgroundSize - 1;
      widthInPercent !== 100
        ? (this.columnSizes = `1fr ${craneColumnWidth}px`)
        : (this.columnSizes = `${craneColumnWidth}px`);
    },
  },
};
</script>

<style lang="scss">
// удалить в конечном билде
body {
  margin: 0 10px;
  padding: 0;
}
#calculator {
  max-width: 1548px;
  margin: 40px auto;
}
.calc {
  &-container {
    display: grid;
    grid-template-columns: 1fr 63%;
    gap: 1.5%;
    justify-content: center;
  }
  &-inputs {
    width: 100%;
    min-height: 245px;
    background: #f1f1f1;
    border-radius: 2px;
  }
  &-mobile-crane {
    width: 100%;
    min-height: 245px;
    background-image: url("./assets/images/bg.svg");
    background-size: 16px;
    background-position: -1px -1px;
    border: 1px solid #dedede;
    border-radius: 2px;
  }
}
@media screen and (max-width: 1280px) {
  .calc {
    &-container {
      grid-template-columns: 1fr 61.9%;
      gap: 8px;
    }
  }
}
</style>
