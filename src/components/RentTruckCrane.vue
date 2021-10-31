<template>
  <button id="rentCrane">Арендовать автокран</button>
  <p>
    Или позвоните нам по телефону <span>+78129931733</span> и мы поможем вам
  </p>
</template>

<script>
export default {
  name: "RentTruckCrane",
};
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  background: #df1120;
  border-radius: 20px;
  border: none;
  color: white;
  font-size: 14px;
  line-height: 40px;
}
p {
  font-size: 14px;
  line-height: 24px;
  > span {
    color: #df1120;
  }
}
</style>
