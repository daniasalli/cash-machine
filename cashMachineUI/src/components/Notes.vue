<template>
  <div class="note">
      <div class="bill-info is-centered">
        <div class="bill" :class="{'bill-100' : bill.bill == 100, 'bill-50' : bill.bill== 50,
        'bill-20' : bill.bill ==20, 'bill-10': bill.bill == 10}">
          <div class="circle">
            <div>{{bill.bill}}</div>
          </div>
          <div class="shadow"></div>
        </div>
        <h3 class="has-text-dark has-text-centered has-text-weight-bold qty-info">x{{bill.qty}}</h3>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'Notes',
    props: ['bill'],
    data(){
      return{
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>

  .bill-100{
    background: #94c997;
  }
  .bill-50{
    background: #ffc7d2;
  }
  .bill-20 {
    background: #ccdfff;
  }
  .bill-10 {
    background: #ffe0a4;
  }
  .bill {
    width: 150.6px;
    height: 100px;
    position: relative;
    border-radius: 2px;
    box-shadow: 5px 5px 7px -4px #BAB4AE;
    &:before {
      content: '';
      width: 80%;
      height: 70%;
      position: absolute;
      left: 10%;
      top: 15%;
      /*background: rgba(121, 143, 181,.4);*/
      background: rgba(137, 132, 132,.4);

      border-radius: inherit;
      /*border: double thick #798fb5;*/
      border: double thick rgba(137, 132, 132, .5);
    }

    .circle {
      width: 70px;
      height: 50px;
      background: inherit;
      position: absolute;
      left: 25%;
      top: 25%;
      border-radius: 50px;
      /*border: thick double #798fb5;*/
      border: double thick rgba(137, 132, 132, .9);
       div {
        width: 100%;
        height: 100%;
        text-align: center;
        padding-top: 5%;
        font-weight: bold;
        font-size: 1.5rem;
        color: rgba(137, 132, 132, 1);
      }
    }
    .shadow{
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      &:before{
        content: '';
        position: absolute;
        left: -10px;
        width: 55%;
        height: 100%;
        background: rgba(255,255,255,.2);
        transform: skewX(-10deg);
      }
    }

  }

  .bill-info {
    margin: 1rem;
  }
  .qty-info {
    margin-top: 1rem;
  }

</style>