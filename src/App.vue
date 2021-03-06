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
          @textInput="textInput"
        >
          <template v-if="moduleWidth >= widthMobileVersion">
            <div class="rent-container">
              <rent-truck-crane @filterOut="filterList" />
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
          :stickLengthInput="getParam('stickLength')"
          :cargoWeightInput="getParam('cargoWeight')"
          :liftingHeightInput="getParam('liftingHeight')"
          :input="input"
          @textInput="textInput"
        />
      </div>
      <template v-if="moduleWidth < widthMobileVersion">
        <div class="rent-container-bottom">
          <rent-truck-crane @filterOut="filterList" />
        </div>
      </template>
      <div
        class="cards-wrapper"
        :style="{
          gridTemplateColumns: cardCol,
          gridColumnStart:
            moduleWidth > widthMobileVersion ? 'span 2' : 'span 1',
        }"
      >
        <div v-for="(truck, ind) of filteredList" :key="`tr-${ind}`">
          <truck-crane-card :truck="truck" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ParameterInput from "./components/ParameterInput";
import RentTruckCrane from "@/components/RentTruckCrane";
import VisualEditor from "@/components/VisualEditor";
import TruckCraneCard from "@/components/TruckCraneCard";
import { trucks } from "@/configs/trucks";

export default {
  name: "App",
  components: {
    ParameterInput,
    RentTruckCrane,
    VisualEditor,
    TruckCraneCard,
  },
  data() {
    return {
      backgroundSize: 16,
      widthMobileVersion: 878,
      columnSizes: null,
      moduleWidth: 0,
      size: { width: 0, height: 0 },
      cardCol: "",
      input: false,
      parameter: [
        { id: "cargoWeight", title: "Вес груза, т:", value: 0.1 },
        { id: "cargoHeight", title: "Высота груза, м:", value: 1 },
        { id: "liftingHeight", title: "Высота подъёма, м:", value: 1 },
        { id: "stickLength", title: "Вылет стрелы, м:", value: 4 },
      ],
      truckCranes: trucks,
      filteredList: [],
    };
  },
  mounted() {
    this.changeWidthCraneSection();
    window.addEventListener("resize", this.changeWidthCraneSection);
  },
  methods: {
    filterList() {
      let newList = [];
      const cargoWeight = this.parameter.find(
        (item) => item.id === "cargoWeight"
      ).value;
      const stickLength = this.parameter.find(
        (item) => item.id === "stickLength"
      ).value;
      for (let truck of this.truckCranes) {
        if (
          truck.weightLimit >= Number(cargoWeight) &&
          truck.stickLength >= Number(stickLength)
        ) {
          newList.push(truck);
        }
      }
      this.filteredList = newList;
    },
    textInput(value) {
      this.input = value;
    },
    getParam(id) {
      return this.parameter.find((item) => item.id === id);
    },
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
      if (fullWidth >= this.widthMobileVersion && fullWidth < 1280) {
        this.cardCol = "repeat(3, 1fr)";
      } else if (fullWidth < this.widthMobileVersion && fullWidth >= 570) {
        this.cardCol = "repeat(2, 1fr)";
      } else {
        this.cardCol = "repeat(1, 1fr)";
      }
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
  overflow-y: scroll;
}

.calculator {
  max-width: 908px;
  // удалить margin в конечном билде
  margin: 40px auto;
}
.cards-wrapper {
  display: grid;
  gap: 24px;
  justify-content: space-between;
  margin-top: 25px;
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
