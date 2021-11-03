<template>
  <div class="calculator">
    <div
      class="calc-container"
      ref="calc"
      :style="{
        gridTemplateColumns: columnSizes,
        padding: moduleWidth < widthMobileVersion ? '0 22px' : 0,
        background: moduleWidth < widthMobileVersion ? '#f1f1f1' : 'none',
      }"
    >
      <div class="calc-inputs">
        <parameter-input
          :parameter="parameter"
          :mobileVersion="moduleWidth < widthMobileVersion"
        >
          <template v-if="moduleWidth >= widthMobileVersion">
            <div class="rent-container">
              <rent-truck-crane />
            </div>
          </template>
        </parameter-input>
      </div>
      <div
        class="calc-mobile-crane"
        :style="{
          backgroundSize: moduleWidth < widthMobileVersion ? '13px' : '16px',
        }"
      >
        <visual-editor
          :size="{ width: size.width - 2, height: size.height - 2 }"
          :mobileVersion="moduleWidth < widthMobileVersion"
          :parameter="parameter"
          :stickInput="parameter[3]"
        />
      </div>
      <template v-if="moduleWidth < widthMobileVersion">
        <div class="rent-container-bottom">
          <rent-truck-crane />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ParameterInput from "./components/ParameterInput";
import RentTruckCrane from "@/components/RentTruckCrane";
import VisualEditor from "@/components/VisualEditor";

export default {
  name: "App",
  components: {
    ParameterInput,
    RentTruckCrane,
    VisualEditor,
  },
  data() {
    return {
      backgroundSize: 16,
      widthMobileVersion: 828,
      columnSizes: null,
      moduleWidth: 0,
      size: { width: 0, height: 0 },
      parameter: [
        { id: "cargoWeight", title: "Вес груза, т:", value: 0.1 },
        { id: "cargoHeight", title: "Высота груза, м:", value: 1 },
        { id: "liftingHeight", title: "Высота подъёма, м:", value: 1 },
        { id: "stickLength", title: "Вылет стрелы, м:", value: 4 },
      ],
    };
  },
  mounted() {
    this.changeWidthCraneSection();
    window.addEventListener("resize", this.changeWidthCraneSection);
  },
  methods: {
    changeWidthCraneSection() {
      const fullWidth = this.$refs.calc?.clientWidth;
      let widthInPercent;
      let craneSectionHeight;
      if (fullWidth >= 1280) {
        // 4k display(disabled)
        widthInPercent = 63;
        craneSectionHeight = 463;
        this.backgroundSize = 16;
      } else if (fullWidth >= this.widthMobileVersion && fullWidth < 1280) {
        widthInPercent = 61.9;
        this.backgroundSize = 16;
        craneSectionHeight = 463;
      } else if (fullWidth < this.widthMobileVersion) {
        widthInPercent = 100;
        this.backgroundSize = 13;
        craneSectionHeight = 246;
      }
      let numberOfSquares = Math.floor(
        (fullWidth * widthInPercent) / 100 / this.backgroundSize
      );
      if (fullWidth < this.widthMobileVersion) {
        numberOfSquares -= 2;
      }
      const craneColumnWidth = numberOfSquares * this.backgroundSize;
      widthInPercent !== 100
        ? (this.columnSizes = `1fr ${craneColumnWidth}px`)
        : (this.columnSizes = `${craneColumnWidth}px`);
      this.size = { width: craneColumnWidth, height: craneSectionHeight + 2 };
      this.moduleWidth = fullWidth;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

// удалить body в конечном билде
body {
  padding: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;
}

.calculator {
  max-width: 908px;
  // удалить margin в конечном билде
  margin: 40px auto;
}
.calc {
  &-container {
    display: grid;
    gap: 8px;
    justify-content: center;
    color: #27262c;
    font-weight: 400;
  }
  &-inputs {
    width: 100%;
    min-height: 245px;
  }
  &-mobile-crane {
    width: calc(100% - 2px);
    min-height: 245px;
    background-image: url("./assets/images/bg.svg");
    background-color: #ffffff;
    background-position: -1px -1px;
    border-radius: 2px;
    border: 1px solid #dedede;
  }
}
.rent-container {
  margin: 0 12px;
  &-bottom {
    margin-top: 5px;
  }
}
</style>
