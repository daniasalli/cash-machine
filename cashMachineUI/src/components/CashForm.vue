<template>
  <div class="hero is-fullheight is-primary is-bold fake-screen">
    <div class="fake-screen--overlay is-fullheight"></div>
    <div class="hero-body">
      <div class="container">
        <h1 class="title has-text-centered is-uppercase">
          Welcome to your bills machine
        </h1>
        <h2 class="subtitle">Enter your withdrawal
          <b-tooltip label="Use multiples of $10" type="is-dark" dashed animated>
            amount
          </b-tooltip> below.</h2>
          <form id="signup-form">
            <div class="field container half">
              <div class="control has-icons-left">
                <input type="text" class="input is-large" name="amount" maxlength="6"
                       v-model="cash" :class="{'is-danger' : cash % 10 !==0}"
                       v-on:keypress="isNumber($event)">
                <span class="icon is-large is-left">
                  <i class="mdi mdi-currency-usd"></i>
                 </span>
                <p class="help is-danger is-capitalized has-text-weight-semibold">
                  {{error}}
                </p>
                <p class="help is-warning is-capitalized has-text-weight-semibold" v-if="cash < 10 && edited">
                  <i class="mdi mdi-alert"></i> Check your amount, your total should be more than $10 </p>
                <p class="help is-warning is-capitalized has-text-weight-semibold" v-if="cash % 10 !== 0">
                  <i class="mdi mdi-alert"></i> Check your amount, denominations of $10, $20, $50 or $100 are available
                </p>
              </div>
            </div>

            <!-- submit button -->
            <div class="control has-text-right">
              <button class="button is-danger is-medium"
                      v-on:click.prevent="calculateBills(), loading = true" :disabled="cash < 10 || loading || cash % 10 !== 0">
                Get Cash</button>
            </div>
          </form>
      </div>
    </div>
    <transition name="fade">
      <div class="backdrop" v-show="showAlert"></div>
    </transition>

    <transition name="slide-fade">
      <div class="bills-container has-background-white container is-full is-clearfix" v-show="showAlert">
        <div class="has-text-right is-fullwidth">
          <button type="button" class="close is-large has-text-dark" v-on:click.prevent="close" v-show="!loading">
            <span class="icon"><i class="mdi mdi-close-box"></i></span>
          </button>
        </div>
        <h2 class="has-text-danger is-size-3 is-uppercase has-text-weight-bold">{{alertTitle}}</h2>
        <h4 class="has-text-dark is-size-4 is-uppercase has-text-weight-bold bills"
            :class="{'has-text-danger' : notes.length}">{{alertMessage}}{{cash | currency}}</h4>
        <div class="columns is is-multiline is-centered bills" v-show="notes.length">
          <div class="column is-4" v-for="note in notes" :key="note.bill">
            <Notes v-bind:bill="note"></Notes>
          </div>

        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import BIcon from "../../node_modules/buefy/src/components/icon/Icon.vue";
import Notes from './Notes.vue';
import axios from 'axios';

export default {
  components: {
    BIcon,
    Notes
  },
  name: 'CashForm',
  data() {
    return {
      cash: 10,
      notes: [],
      loading: false,
      error: '',
      showAlert: false,
      alertTitle: '',
      alertMessage: '',
      edited: false
    }

  },
  filters: {
    currency(value) {
      let val = (value/1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },
  methods: {
    // checks if entered key is a number to allow it
    isNumber(e) {
      e = !(e) ? window.event : e;
      this.edited = true;
      this.error = '';
      let charCode = (e.which) ? e.which : e.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        e.preventDefault();
        return false;
      }
      return true;
    },
    // close alert
    close() {
      this.showAlert = false;
      this.notes = [];
      this.alertMessage = '';
      this.alertTitle = '';
      this.loading = false;
      this.error = '';
    },
    calculateBills() {

      let data={};
      Object.assign(data, { total: this.cash });
      axios.post('http://localhost:3000/api/cashMachine',data,
        {
//          headers: {
//            'Content-type': 'application/x-www-form-urlencoded'
//          }
        })
        .then(response => {
            this.showAlert = true;
            this.notes = response.data;
            this.loading = false;
            this.alertTitle = "YOUR Bills";
            this.alertMessage = `total: $`;
            this.error = '';
        })
        .catch(() => {
          this.loading = false;
          this.error= "Invalid Number";
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .half{
    width: 50%;
  }
  .fake-screen {
    box-shadow: inset 0 0 10px #000000;
    border-radius: 8px;
  }
  .fake-screen--overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;

    &:before {
      content: '';
      position: absolute;
      left: -70px;
      width: 60%;
      height: 100%;
      background: rgba(255,255,255,.2);
      transform: skewX(-10deg);
    }
  }

  .backdrop {
    background-color: rgba(0, 0, 0, 0.25);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;

  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease-in-out;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .bills-container{
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    width: 600px;
    max-width: 600px;
    min-width: 600px;
    border-radius: 4px;
    border: solid 2px #eaeaea;
    z-index: 12;
    position: absolute;
    top: 3rem;
    right: 0;

    .close {
      border: none;
      font-size: 1rem;
      cursor: pointer;
    }

    .bills {
      margin: 1rem
    }
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
