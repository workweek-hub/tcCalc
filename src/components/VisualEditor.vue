<template>
  <v-stage :config="configKonva">
    <v-layer>
      <v-text :config="configStickLengthText"></v-text>
      <v-image :config="configLiftingHeight"></v-image>
      <v-rect :config="configBase" v-if="!mobileVersion"></v-rect>
      <v-line :config="configLine"></v-line>
      <v-group :config="configGroup">
        <v-rect :config="configRect"></v-rect>
        <v-image :config="configArrow"></v-image>
        <v-text :config="configStickLength"></v-text>
        <v-image :config="configStickSize"></v-image>
      </v-group>
      <v-image :config="configHook"></v-image>
      <v-image :config="configHead" ref="head"></v-image>
      <v-text :config="configCargoWeight"></v-text>
      <v-rect :config="configCargo" ref="cargo"></v-rect>
      <v-image :config="configTruck"></v-image>
    </v-layer>
  </v-stage>
</template>

<script>
export default {
  name: "VisualEditor",
  props: {
    size: {
      type: Object,
      required: true,
    },
    mobileVersion: {
      type: Boolean,
      required: true,
      default: false,
    },
    parameter: {
      type: Array,
      required: true,
    },
    stickInput: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      configKonva: {
        width: 200,
        height: 463,
      },
      coefficient: 1,
      offset: { x: 0, y: 0 },
      truck: new Image(),
      arrow: new Image(),
      head: new Image(),
      hook: new Image(),
      liftingHeight: new Image(),
      stickSize: new Image(),
      headPosition: { x: 308, y: 264 },
      mainLength: 239,
      stickLength: 41,
      rotation: -16.31,
      created: false,
      drag: false,
    };
  },
  created() {
    this.mobileVersion ? (this.coefficient = 1.89) : (this.coefficient = 1);
    this.changeConfig();
    this.changeMobile();
    this.truck.src = require("@/assets/images/crane.svg");
    this.arrow.src = require("@/assets/images/arrow.svg");
    this.head.src = require("@/assets/images/head.svg");
    this.hook.src = require("@/assets/images/hook.svg");
    this.stickSize.src = require("@/assets/images/size.svg");
    this.liftingHeight.src = require("@/assets/images/height.svg");
    this.$nextTick().then(() => {
      this.headPosition = {
        x: 308 / this.coefficient,
        y: 270 / this.coefficient,
      };
      this.stickLength = !this.mobileVersion ? 41 : 45 / this.coefficient;
      this.created = true;
    });
  },
  mounted() {
    const head = this.$refs.head.getNode();
    const cargo = this.$refs.cargo.getNode();
    head.addEventListener("dragmove", () => {
      this.drag = true;
      let headX = head.x();
      let headY = head.y();
      const maxX = 420 / this.coefficient;
      const minX = 308 / this.coefficient;
      const minY = (!this.mobileVersion ? 113 : 102) / this.coefficient;
      const maxY = this.offset.y - (!this.mobileVersion ? 84 : 47);
      if (headX > maxX) {
        headX = maxX;
        head.x(maxX);
      } else if (headX < minX) {
        headX = minX;
        head.x(minX);
      }
      if (headY <= minY) {
        headY = minY;
        head.y(minY - 6 / this.coefficient);
      } else if (headY > maxY) {
        headY = maxY;
        head.y(maxY - 6 / this.coefficient);
      }
      const length = head.y() - this.offset.y;
      const height = headX - this.offset.x;
      const totalStickLength = Math.sqrt(
        Math.pow(length, 2) + Math.pow(height, 2)
      );
      this.rotation = Math.atan(length / height) * 57.2958;
      this.stickLength = totalStickLength - this.mainLength;
      this.headPosition = { x: headX, y: headY };
      let meterLength =
        ((this.mobileVersion ? 8.55 : 4.95) * this.stickLength) /
        (236 / this.coefficient);
      this.stickInput.value = (
        (this.stickLength / 11.875) *
        meterLength
      ).toFixed(0);
    });
    cargo.addEventListener("dragmove", () => {
      this.drag = true;
      const cargoWidth = 99 / this.coefficient;
      const cargoHeight = 86 / this.coefficient;
      const maxX =
        420 / this.coefficient - cargoWidth / 2 + 9 / this.coefficient;
      const minX =
        308 / this.coefficient - cargoWidth / 2 + 9 / this.coefficient;
      const minY =
        (!this.mobileVersion ? 113 : 108) / this.coefficient +
        (cargoHeight + 7 / this.coefficient);
      const maxY =
        this.offset.y -
        (!this.mobileVersion ? 102 : 55) +
        (cargoHeight + 31 / this.coefficient);
      if (cargo.x() > maxX) {
        cargo.x(maxX);
      } else if (cargo.x() < minX) {
        cargo.x(minX);
      }
      if (cargo.y() <= minY) {
        cargo.y(minY - 6 / this.coefficient);
      } else if (cargo.y() > maxY) {
        cargo.y(maxY - 6 / this.coefficient);
      }
      let cargoX = cargo.x();
      let cargoY = cargo.y();
      const headX = cargoX + cargoWidth / 2 - 9 / this.coefficient;
      const headY = cargoY - 86 / this.coefficient - 6;
      head.x(headX);
      head.y(headY);
      const length = headY - this.offset.y;
      const height = headX - this.offset.x;
      const totalStickLength = Math.sqrt(
        Math.pow(length, 2) + Math.pow(height, 2)
      );
      this.rotation = Math.atan(length / height) * 57.2958;
      this.stickLength = totalStickLength - this.mainLength;
      this.headPosition = { x: headX, y: headY };
      let meterLength =
        ((this.mobileVersion ? 8.55 : 4.95) * this.stickLength) /
        (236 / this.coefficient);
      this.stickInput.value = (
        (this.stickLength / 11.875) *
        meterLength
      ).toFixed(0);
    });
    head.addEventListener("dragend", () => {
      this.drag = false;
    });
    cargo.addEventListener("dragend", () => {
      this.drag = false;
    });
  },
  computed: {
    configTruck() {
      const width = 250 / this.coefficient;
      const height = 99 / this.coefficient;
      return {
        x: this.mobileVersion ? 7 : 16,
        y: this.mobileVersion
          ? this.configKonva.height - height - 10
          : this.configKonva.height - height - 16,
        image: this.truck,
        width: width,
        height: height,
      };
    },
    configArrow() {
      const width = this.mainLength;
      const height = 17 / this.coefficient;
      return {
        image: this.arrow,
        width: width,
        height: height,
      };
    },
    configGroup() {
      return {
        rotation: this.rotation,
        x: this.offset.x,
        y: this.offset.y,
      };
    },
    configRect() {
      return {
        x: this.mainLength - 1,
        y: 2 / this.coefficient,
        width: this.stickLength,
        height: 13 / this.coefficient,
        fill: "#D0232F",
        stroke: "27262C",
        strokeWidth: 1,
      };
    },
    configHead() {
      const width = 15 / this.coefficient;
      const height = 31 / this.coefficient;
      return {
        image: this.head,
        width: width,
        height: height,
        rotation: 15,
        x: this.headPosition.x,
        y: this.headPosition.y,
        draggable: true,
        cursor: "pointer",
      };
    },
    configHook() {
      const width = 16 / this.coefficient;
      const height = 86 / this.coefficient;
      return {
        image: this.hook,
        width: width,
        height: height,
        x: this.headPosition.x - 1,
        y: this.headPosition.y + 6,
      };
    },
    configCargo() {
      const width = 99 / this.coefficient;
      const height = 80 / this.coefficient;
      return {
        x: this.headPosition.x - width / 2 + 9 / this.coefficient,
        y: this.headPosition.y + 86 / this.coefficient + 6,
        width: width,
        height: height,
        fill: "#DF11201A",
        stroke: "#DF1120",
        strokeWidth: 1,
        draggable: true,
      };
    },
    configCargoWeight() {
      let text = this.parameter.find((item) => item.id === "cargoWeight").value;
      const width = 99 / this.coefficient;
      // const height = 80 / this.coefficient;
      return {
        text: `${text}т`,
        fontSize: 14 / this.coefficient,
        // fontFamily: 'Roboto',
        // fontStyle: 'bold',
        fill: "#27262C",
        x: this.headPosition.x - width / 4 + 20 / this.coefficient,
        y: this.headPosition.y + 119 / this.coefficient + 6,
      };
    },
    configLine() {
      const addition = 5 / this.coefficient;
      return {
        points: [
          this.offset.x - addition,
          this.offset.y - addition,
          this.headPosition.x + addition,
          this.headPosition.y + addition,
        ],
        strokeWidth: 1,
        stroke: "#27262C",
      };
    },
    configStickSize() {
      const width = 112 / this.coefficient;
      const height = 6 / this.coefficient;
      return {
        image: this.stickSize,
        width: width,
        height: height,
        x: this.mainLength / 3,
        y: -20 / this.coefficient,
      };
    },
    configStickLength() {
      return {
        text: `${this.stickInput.value}м`,
        fontSize: 14 / this.coefficient,
        // fontFamily: 'Roboto',
        // fontStyle: 'bold',
        fill: "#27262C",
        x: this.mainLength / 2 + 8 / this.coefficient,
        y: -45 / this.coefficient,
        rotation: -1 * this.rotation,
      };
    },
    configBase() {
      return {
        x: 0,
        y: this.configKonva.height - 18,
        width: this.configKonva.width,
        height: 18,
        fill: "#DEDEDE",
      };
    },
    configLiftingHeight() {
      const width = 8 / this.coefficient;
      const height = 286 / this.coefficient;
      return {
        image: this.liftingHeight,
        width: width,
        height: height,
        x: this.size.width - (!this.mobileVersion ? 34 : 39),
        y: this.size.height - height,
      };
    },
    configStickLengthText() {
      const height = 286 / this.coefficient;
      const length = this.parameter.find((item) => item.id === "liftingHeight");
      return {
        text: `${length.value}м`,
        fontSize: 14 / this.coefficient,
        // fontFamily: 'Roboto',
        // fontStyle: 'bold',
        fill: "#27262C",
        x: this.size.width - (!this.mobileVersion ? 64 : 59),
        y: this.size.height - height / 2,
      };
    },
  },
  methods: {
    changeConfig() {
      this.configKonva = this.size;
    },
    changeMobile() {
      if (this.mobileVersion) {
        this.offset = { x: 17, y: this.size.height - 57 };
        this.mainLength = 239 / this.coefficient;
      } else {
        this.offset = { x: 36, y: this.size.height - 107 };
        this.mainLength = 239;
      }
    },
    updatePositions() {
      if (this.mobileVersion && this.created) {
        this.offset = {
          x: this.offset.x / 1.89,
          y: this.offset.y / 1.89,
        };
        this.headPosition = {
          x: this.headPosition.x / 1.89,
          y: this.headPosition.y / 1.89,
        };
        this.stickLength = this.stickLength / 1.89 + 4;
      } else if (!this.mobileVersion && this.created) {
        this.offset = {
          x: this.offset.x * 1.89,
          y: this.offset.y * 1.89,
        };
        this.headPosition = {
          x: this.headPosition.x * 1.89,
          y: this.headPosition.y * 1.89,
        };
        this.stickLength = this.stickLength * 1.89 - 4;
      }
    },
    updateParameter() {
      let value = Number(this.stickInput.value);

      if (value > 84) {
        value = 84;
        this.stickInput.value = 84;
      }
      this.stickInput.value = Number(this.stickInput.value).toFixed(0);
      if (value <= 4) {
        this.stickLength = 41 / this.coefficient;
        this.rotation = -16.31;
        this.headPosition = {
          x: 308 / this.coefficient,
          y: 270 / this.coefficient,
        };
      } else {
        this.stickLength =
          41 / this.coefficient + value * (!this.mobileVersion ? 2.052 : 1.21);
        this.rotation = -16.31 - value * 0.1995;
        this.headPosition = {
          ...this.headPosition,
          x:
            (this.mainLength + this.stickLength + this.offset.x) *
            Math.sin((90 + this.rotation) * (Math.PI / 180)),
          y:
            -1 *
              (this.mainLength + this.stickLength) *
              Math.cos((90 + this.rotation) * (Math.PI / 180)) +
            this.offset.y,
        };
      }
    },
  },
  watch: {
    size() {
      this.changeConfig();
      this.changeMobile();
    },
    mobileVersion() {
      this.mobileVersion ? (this.coefficient = 1.89) : (this.coefficient = 1);
      this.updatePositions();
    },
    "stickInput.value"() {
      if (!this.drag) {
        this.updateParameter();
      }
    },
  },
};
</script>

<style scoped></style>
