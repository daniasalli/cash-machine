<template>
  <div id="app" class="is-marginless screen-border is-rounded has-background-grey-dark">
    <CashForm/>
  </div>
</template>

<script>
import CashForm from './components/cash-form/CashForm.vue'

export default {
  name: 'app',
  components: {
    CashForm
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-width: 800px;
  margin: 0 auto;
}
  .screen-border{
    padding: 3rem 4rem;
  }
</style>
