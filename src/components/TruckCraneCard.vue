<template>
  <div class="card-container">
    <template v-if="modal">
      <rent-form
        :weight="truck.weightLimit"
        @closeModal="modal = false"
      ></rent-form>
    </template>
    <div
      class="truck-image"
      :style="{
        background: `url(${truck.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }"
    ></div>
    <h5>
      <a :href="truck.url">{{ truck.name }}</a>
    </h5>
    <p><span>Основная стрела:</span> {{ truck.stickLength }}м</p>
    <p><span>Грузоподъемность:</span> {{ truck.weightLimit }}т</p>
    <button @click="modal = !modal">Арендовать</button>
  </div>
</template>

<script>
import RentForm from "@/components/RentForm";
export default {
  name: "TruckCraneCard",
  components: {
    RentForm,
  },
  props: {
    truck: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modal: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  border: 1px solid #dedede;
  border-radius: 2px;
  overflow: hidden;
  display: grid;
  background: #ffffff;
  padding-bottom: 15px;
  .truck-image {
    height: 160px;
  }
  > h5 {
    font-size: 15px;
    margin: 10px 5px 10px 20px;
    height: 20px;
    > a {
      text-decoration: none;
      color: #27262c;
      &:hover {
        color: #df1120;
      }
    }
  }
  > p {
    font-size: 14px;
    margin: 5px 20px;
    > span {
      color: #6b6b6b;
    }
  }
  > button {
    width: 90%;
    background: #df1120;
    border-radius: 20px;
    border: none;
    color: white;
    font-size: 14px;
    line-height: 35px;
    margin: 10px auto;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
