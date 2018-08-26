import BIcon from "../../../node_modules/buefy/src/components/icon/Icon.vue";
import Notes from '../Notes.vue';
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