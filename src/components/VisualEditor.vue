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
      <v-group ref="cargoGroup" :config="configCargoGroup">
        <v-image :config="configHook"></v-image>
        <v-image :config="configHead" ref="head"></v-image>
        <v-text :config="configCargoWeight"></v-text>
        <v-rect :config="configCargo" ref="cargo"></v-rect>
      </v-group>
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
    cargoWeightInput: {
      type: Object,
      required: true,
    },
    stickLengthInput: {
      type: Object,
      required: true,
    },
    liftingHeightInput: {
      type: Object,
      required: true,
    },
    input: {
      required: true,
    },
  },
  emits: {
    textInput: Boolean,
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
      headPosition: { x: 0, y: 0 },
      mainLength: 239,
      stickLength: 0,
      rotation: -16.61,
      drag: false,
      liftingInput: false,
      cargoGroupPosition: { x: 0, y: 0 },
    };
  },
  created() {
    this.mobileResize();
    this.changeConfig();
    this.truck.src = require("@/assets/images/crane.svg");
    this.arrow.src = require("@/assets/images/arrow.svg");
    this.head.src = require("@/assets/images/head.svg");
    this.hook.src = require("@/assets/images/hook.svg");
    this.stickSize.src = require("@/assets/images/size.svg");
    this.liftingHeight.src = require("@/assets/images/height.svg");
    this.$nextTick().then(() => {
      this.mobileResize();
      this.sizeCalculation();
    });
  },
  mounted() {
    const head = this.$refs.head.getNode();
    const cargo = this.$refs.cargo.getNode();
    head.addEventListener("dragmove", () => {
      this.moveObject("head");
    });
    cargo.addEventListener("dragmove", () => {
      this.moveObject("cargo");
    });
    head.addEventListener("dragend", () => {
      this.drag = false;
    });
    cargo.addEventListener("dragend", () => {
      this.drag = false;
    });
  },
  computed: {
    configCargoGroup() {
      return {
        width: 100 / this.coefficient,
        height: 172 / this.coefficient,
        x: this.cargoGroupPosition.x / this.coefficient,
        y: this.cargoGroupPosition.y / this.coefficient,
      };
    },
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
        cornerRadius: [0, 0, 16, 0],
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
        x: 40 / this.coefficient,
        y: 0,
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
        x: 39 / this.coefficient,
        y: 12 / this.coefficient,
      };
    },
    configCargo() {
      return {
        x: 0,
        y: 98 / this.coefficient,
        width: 100 / this.coefficient,
        height: 80 / this.coefficient,
        fill: "#DF11201A",
        stroke: "#DF1120",
        strokeWidth: 1,
        draggable: true,
        cornerRadius: 2,
      };
    },
    configCargoWeight() {
      let text = this.cargoWeightInput.value;
      return {
        text: `${text}т`,
        fontSize: 14 / this.coefficient,
        fontStyle: "bold",
        fill: "#27262C",
        x: 35 / this.coefficient,
        y: 130 / this.coefficient,
      };
    },
    configLine() {
      const addition = 2 / this.coefficient;
      return {
        points: [
          this.offset.x - addition,
          this.offset.y + addition,
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
        text: `${this.stickLengthInput.value}м`,
        fontSize: 14 / this.coefficient,
        fontStyle: "bold",
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
      const length = this.liftingHeightInput.value;
      return {
        text: `${length}м`,
        fontSize: 14 / this.coefficient,
        fontStyle: "bold",
        fill: "#27262C",
        x: this.size.width - (!this.mobileVersion ? 64 : 59),
        y: this.size.height - height / 2,
      };
    },
  },
  methods: {
    mobileResize() {
      this.mobileVersion ? (this.coefficient = 1.89) : (this.coefficient = 1);
      this.mobileVersion
        ? (this.offset = { x: 17, y: this.size.height - 57 })
        : (this.offset = { x: 36, y: this.size.height - 107 });
      this.mainLength = 239 / this.coefficient;
    },
    moveObject(grab) {
      this.drag = true;
      this.changeCargoGroupPosition(grab);
      this.updateInputValue();
    },
    edgeDistance(grab, side) {
      if (grab === "head") {
        return side === "x" ? 40 / this.coefficient : 0;
      }
      if (grab === "cargo") {
        return side === "y" ? 98 / this.coefficient : 0;
      }
    },
    changeCargoGroupPosition(grab) {
      const grabRef = this.$refs[grab].getNode();
      const cargoGroup = this.$refs.cargoGroup.getNode();

      const maxX = 368 / this.coefficient;
      const minX = 268 / this.coefficient;
      const minY = 110 / this.coefficient;
      const maxY = 268 / this.coefficient;

      let posX = cargoGroup.x() + grabRef.x() - this.edgeDistance(grab, "x");
      let posY = cargoGroup.y() + grabRef.y() - this.edgeDistance(grab, "y");

      if (posX > maxX) posX = maxX;
      if (posX < minX) posX = minX;
      if (posY > maxY) posY = maxY;
      if (posY < minY) posY = minY;

      cargoGroup.x(posX);
      cargoGroup.y(posY);

      grabRef.x(this.edgeDistance(grab, "x"));
      grabRef.y(this.edgeDistance(grab, "y"));

      this.headPosition = {
        x: cargoGroup.x() + this.edgeDistance("head", "x"),
        y: cargoGroup.y() + 2.3 / this.coefficient,
      };
      const meterHeight = this.mobileVersion ? 1.17 : 0.62;
      this.liftingHeightInput.value =
        Math.round(meterHeight * (268 / this.coefficient - cargoGroup.y())) + 1;
      this.changeBasePosition(cargoGroup.x(), cargoGroup.y());
    },
    changeBasePosition(cargoGroupX, cargoGroupY) {
      const length = cargoGroupY - this.offset.y;
      const height =
        cargoGroupX - this.offset.x + this.edgeDistance("head", "x");
      const totalBaseLength = Math.sqrt(
        Math.pow(length, 2) + Math.pow(height, 2)
      );
      this.rotation = Math.atan(length / height) * 57.2958 + 1.3;
      this.stickLength = totalBaseLength - this.mainLength;
    },
    updateInputValue() {
      const defaultStickLength = this.mobileVersion ? 26.95 : 46.88;
      const maxStickLength = this.mobileVersion ? 112 : 207;
      let meterLength = (maxStickLength - defaultStickLength) / 80;
      this.stickLengthInput.value = (
        (this.stickLength - defaultStickLength) / meterLength +
        4
      ).toFixed(0);
    },
    changeConfig() {
      this.configKonva = this.size;
    },
    sizeCalculation() {
      const cargoGroup = this.$refs.cargoGroup.getNode();
      let stickLength = Number(this.stickLengthInput.value);
      const defaultStickLength = this.mobileVersion ? 26.95 : 46.88;
      const maxStickLength = this.mobileVersion ? 112 : 207;
      let meterLength = (maxStickLength - defaultStickLength) / 80;
      const defaultRotation = -16.61;
      const maxAngel = -32.03;
      const anglePerMeter = (
        (maxAngel - defaultRotation) /
        stickLength
      ).toFixed(2);
      const length = (stickLength - 4) * meterLength + defaultStickLength;
      this.stickLength =
        length >= defaultStickLength ? length : defaultStickLength;

      const angle = (stickLength - 4) * anglePerMeter + defaultRotation;
      this.rotation = angle < defaultRotation ? angle - 1.3 : defaultRotation;

      const position = {
        x:
          (this.mainLength + this.stickLength + this.offset.x) *
          Math.sin((90 + this.rotation) * (Math.PI / 180)),
        y:
          -1 *
            (this.mainLength + this.stickLength) *
            Math.cos((90 + this.rotation) * (Math.PI / 180)) +
          this.offset.y,
      };
      if (this.input !== "liftingHeight") {
        this.liftingHeightInput.value =
          stickLength < 4 ? 1 : Math.round(stickLength * 1.225) - 4;
      } else {
        this.$emit("textInput", false);
      }
      cargoGroup.x(position.x - this.edgeDistance("head", "x"));
      cargoGroup.y(position.y - 6.3 / this.coefficient);
      this.headPosition = {
        x: position.x,
        y: position.y - 4 / this.coefficient,
      };
    },
  },
  watch: {
    size() {
      this.changeConfig();
    },
    mobileVersion() {
      this.mobileResize();
      this.sizeCalculation();
    },
    "stickLengthInput.value"() {
      if (!this.drag) {
        this.sizeCalculation();
      }
    },
    "liftingHeightInput.value"() {
      if (!this.drag && this.input === "liftingHeight") {
        this.stickLengthInput.value =
          Math.round(Number(this.liftingHeightInput.value) / 1.225) + 3;
      }
    },
  },
};
</script>

<style scoped></style>
