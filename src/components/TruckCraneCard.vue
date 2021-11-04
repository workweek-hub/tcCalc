<template>
  <div class="card-container">
    <div
      class="truck-image"
      :style="{
        background: `url(${truck.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }"
    ></div>
    <h5>{{ truck.name }}</h5>
    <p><span>Основная стрела:</span> {{ truck.stickLength }}м</p>
    <p><span>Грузоподъемность:</span> {{ truck.weightLimit }}т</p>
    <a :href="truck.url">Арендовать</a>
  </div>
</template>

<script>
export default {
  name: "TruckCraneCard",
  props: {
    truck: {
      type: Object,
      required: true,
    },
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
  }
  > p {
    font-size: 14px;
    margin: 5px 20px;
    > span {
      color: #6b6b6b;
    }
  }
  > a {
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
  }
}
</style>
