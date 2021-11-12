<template>
  <v-stage :config="configKonva">
    <v-layer>
      <v-line :config="configCraneCenter"></v-line>

      <v-line :config="configLiftLine"></v-line>
      <v-image :config="configLiftArrow"></v-image>
      <v-text :config="configLiftText"></v-text>

      <v-rect :config="configBase"></v-rect>
      <v-line :config="configLine"></v-line>
      <v-group :config="configGroup">
        <v-rect :config="configRect"></v-rect>
        <v-image :config="configArrow"></v-image>
      </v-group>

      <v-text :config="configStickLength"></v-text>
      <v-image :config="configLeftArrow"></v-image>
      <v-image :config="configRightArrow"></v-image>
      <v-line :config="configLoadDistance"></v-line>

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
      arrowLen: new Image(),
      liftingHeight: new Image(),
      stickSize: new Image(),
      headPosition: { x: 0, y: 0 },
      mainLength: 239,
      stickLength: 0,
      rotation: -16.61,
      drag: false,
      liftingInput: false,
      cargoGroupPosition: { x: 0, y: 0 },
      loadDistanceWidth: 0,
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
    this.arrowLen.src = require("@/assets/images/arrow_len.svg");
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
    cargo.on("mouseenter", function () {
      document.body.style.cursor = "pointer";
    });
    cargo.on("mouseleave", function () {
      document.body.style.cursor = "default";
    });
    head.on("mouseenter", function () {
      document.body.style.cursor = "pointer";
    });
    head.on("mouseleave", function () {
      document.body.style.cursor = "default";
    });
  },
  computed: {
    configCraneCenter() {
      return {
        points: [
          this.offset.x + (this.mobileVersion ? 38 : 68),
          this.headPosition.y - (this.mobileVersion ? 20 : 25),
          this.offset.x + (this.mobileVersion ? 38 : 68),
          this.configKonva.height - 30,
        ],
        strokeWidth: 1,
        stroke: "#ffd5d5",
      };
    },
    configLiftLine() {
      return {
        points: [
          this.headPosition.x + 10 / this.coefficient,
          this.size.height,
          this.headPosition.x + 10 / this.coefficient,
          this.headPosition.y + (this.mobileVersion ? 95 : 179),
        ],
        strokeWidth: 1,
        stroke: "#27262C",
      };
    },
    configLiftArrow() {
      const width = 9 / this.coefficient;
      const height = 9 / this.coefficient;
      return {
        image: this.arrowLen,
        width: width,
        height: height,
        x: this.headPosition.x + 5.5 / this.coefficient,
        y: this.headPosition.y + (this.mobileVersion ? 99 : 187),
        rotation: -90,
      };
    },
    configLiftText() {
      const length = this.liftingHeightInput.value;
      return {
        text: `${length}м`,
        fontSize: 14 / this.coefficient,
        fontStyle: "bold",
        fill: "#27262C",
        x: this.headPosition.x + 20 / this.coefficient,
        y:
          (this.size.height - (this.headPosition.y + 177 / this.coefficient)) /
            2 +
          (this.headPosition.y + 163 / this.coefficient),
      };
    },
    configLeftArrow() {
      const width = 9 / this.coefficient;
      const height = 9 / this.coefficient;
      return {
        image: this.arrowLen,
        width: width,
        height: height,
        x: this.offset.x + (this.mobileVersion ? 46 : 80),
        y: this.headPosition.y - (this.mobileVersion ? 3.3 : 1),
        rotation: 180,
      };
    },
    configRightArrow() {
      const width = 9 / this.coefficient;
      const height = 9 / this.coefficient;
      return {
        image: this.arrowLen,
        width: width,
        height: height,
        x: this.headPosition.x,
        y: this.headPosition.y - (this.mobileVersion ? 8.3 : 11),
      };
    },
    configLoadDistance() {
      return {
        points: [
          this.offset.x + (this.mobileVersion ? 45 : 75),
          this.headPosition.y - 6,
          this.headPosition.x,
          this.headPosition.y - 6,
        ],
        strokeWidth: 1,
        stroke: "#27262C",
      };
    },
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
    configBase() {
      return {
        x: 0,
        y: this.configKonva.height - 18 / this.coefficient,
        width: this.configKonva.width,
        height: 18,
        fill: "#DEDEDE",
      };
    },
    configStickLength() {
      return {
        text: `${this.stickLengthInput.value}м`,
        fontSize: 14 / this.coefficient,
        fontStyle: "bold",
        fill: "#27262C",
        x:
          (this.headPosition.x -
            this.offset.x +
            (this.mobileVersion ? 40 : 70)) /
            2 +
          this.offset.x -
          15 / this.coefficient,
        y: this.headPosition.y - (this.mobileVersion ? 20 : 25),
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
      // this.updateInputValue();
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

      const maxX = this.size.width - (this.mobileVersion ? 65 : 115);
      const minX = 278 / this.coefficient;
      const minY = this.mobileVersion ? 24 : 30;
      const maxY = 245 / this.coefficient;

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

      this.loadDistanceWidth = this.headPosition.x - this.offset.x;

      const meterHeight = 83 / (maxY - minY);
      this.liftingHeightInput.value =
        Math.round((maxY - posY) * meterHeight) + 1;

      const unitMeters = 76 / (maxX - minX);
      this.stickLengthInput.value = Math.round((posX - minX) * unitMeters) + 2;

      this.changeBasePosition(cargoGroup.x(), cargoGroup.y());
    },
    changeBasePosition(cargoGroupX, cargoGroupY) {
      const length = cargoGroupY - this.offset.y;
      const height =
        cargoGroupX - this.offset.x + this.edgeDistance("head", "x");
      const totalBaseLength = Math.sqrt(
        Math.pow(length, 2) + Math.pow(height, 2)
      );
      this.rotation =
        (Math.atan(length / height) * 180) / Math.PI +
        (this.mobileVersion && this.stickLength > 240 ? 0.9 : 1.3);
      this.stickLength = totalBaseLength - this.mainLength;
    },
    changeConfig() {
      this.configKonva = this.size;
    },
    sizeCalculation() {
      const cargoGroup = this.$refs.cargoGroup.getNode();
      let stickLength = Number(this.stickLengthInput.value);
      let liftingHeight = Number(this.liftingHeightInput.value);

      const maxX = this.size.width - (this.mobileVersion ? 65 : 115);
      const minX = 278 / this.coefficient;
      const minY = this.mobileVersion ? 24 : 30;
      const maxY = 245 / this.coefficient;

      const meterHeight = 83 / (maxY - minY);
      const posY = maxY - (liftingHeight - 1) / meterHeight;
      cargoGroup.y(posY);

      const unitMeters = 76 / (maxX - minX);
      const posX = (stickLength - 2) / unitMeters + minX;
      cargoGroup.x(posX);

      const heightTriangle = this.offset.y - posY;
      const widthTriangle =
        posX - this.offset.x + this.edgeDistance("head", "x");
      const fullLength = Math.sqrt(
        Math.pow(heightTriangle, 2) + Math.pow(widthTriangle, 2)
      );
      this.stickLength = fullLength - 239 / this.coefficient;

      this.rotation =
        -1 * ((Math.atan(heightTriangle / widthTriangle) * 180) / Math.PI) +
        (this.mobileVersion && this.stickLength > 240 ? 0.9 : 1.3);

      this.headPosition = {
        x: posX + this.edgeDistance("head", "x"),
        y: posY + 2.3,
      };
    },
  },
  watch: {
    size() {
      this.changeConfig();
      this.sizeCalculation();
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
      if (!this.drag) {
        this.sizeCalculation();
      }
    },
  },
};
</script>

<style scoped></style>
