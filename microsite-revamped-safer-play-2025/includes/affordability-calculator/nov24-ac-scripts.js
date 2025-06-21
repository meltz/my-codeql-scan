const app = Vue.createApp({
  data() {
    return {
      showStart: true,
      showResult: false,
      takehomeIncomeError: '',
      householdExpeneseError: '',
      personnelExpensesError: '',
      gambleExpensesError: '',
      submitButtonError: '',
      takehomeIncome: '',
      householdExpenese: '',
      personnelExpenses: '',
      gambleExpenses: '',
      dailyExpenses: 0, // Take home income minus household and personnel expenses (exclude gambling expenses)
      leftOver: 0,
      result: '',
    };
  },
  methods: {
    validateNumeric: function (fieldName) {
      var numericRegrex = /^[0-9]+$/; /* change + to * for decimal */

      if (this[fieldName] || this[fieldName] === 0) {
        if (numericRegrex.test(this[fieldName])) {
          this[fieldName + 'Error'] = false;
          // console.log('Value: ' + this[fieldName], 'Submitted Error: ' + this[fieldName + 'Error']);
        } else {
          this[fieldName + 'Error'] = true;
          // console.log('Value: ' + this[fieldName], 'Non Numeric Error: ' + this[fieldName + 'Error']);
        }
      } else {
        this[fieldName + 'Error'] = true;
        // console.log('Value: ' + this[fieldName], 'Required Error: ' + this[fieldName + 'Error']);
      }

      this.disabledButton();
    },

    disabledButton: function () {
      if (
        this.takehomeIncomeError === false &&
        this.householdExpeneseError === false &&
        this.personnelExpensesError === false &&
        this.gambleExpensesError === false
      ) {
        this.submitButtonError = false;
      } else {
        this.submitButtonError = true;
      }
    },

    submitForm: function (language) {
      if (this.submitButtonError === false) {
        if (
          this.takehomeIncomeError === false &&
          this.householdExpeneseError === false &&
          this.personnelExpensesError === false &&
          this.gambleExpensesError === false
        ) {
          this.countLeftOver();
          this.trackVirtualPage(language, 'affordability-calculator-result');
          window.scrollTo(0, 0);
        }
      }
    },

    countLeftOver: function () {
      this.showStart = false;
      this.showResult = true;

      this.dailyExpenses = this.takehomeIncome - (this.householdExpenese + this.personnelExpenses);
      this.leftOver = this.dailyExpenses - this.gambleExpenses;

      if (this.dailyExpenses === this.gambleExpenses) {
        this.result = 'equal';
      } else if (this.dailyExpenses > this.gambleExpenses) {
        this.result = 'surplus';
      } else if (this.dailyExpenses < this.gambleExpenses) {
        this.result = 'deficit';
      }

      this.trackResult(this.dailyExpenses, this.gambleExpenses, this.leftOver, this.result);
    },

    trackVirtualPage: function (language, pageName) {
      var microsite = '/ms/sp/';
      var path = microsite + language + '/' + pageName + '.html';

      // GA4 GTM tracking
      dataLayer.push({
        event: 'ca_virtual_page_view',
        event_category: 'ca_virtual_page_view',
        event_action: pageName,
        event_label: path,
      });

      // console.log('Language', language, 'Page', pageName);
    },

    trackResult: function (dailyExpenses, gambleExpenses, leftOver, result) {
      var gaEvents = '$' + dailyExpenses + '- $' + gambleExpenses + '= $' + leftOver;

      // GA4 GTM tracking
      dataLayer.push({
        event: 'ca_result',
        event_category: 'Calculator Result',
        event_action: result,
        event_label: gaEvents,
      });

      // console.log('Calculator Figures', gaEvents, result);
    },

    trackOutbound: function () {
      var link = event.target.getAttribute('href');

      dataLayer.push({
        event: 'ca_outbound',
        event_category: 'Calculator Outbound',
        event_action: 'Click',
        event_label: link,
      });

      // console.log('Outbound Link', link);
    },
  },
  computed: {
    getResultColor: function () {
      if (this.result === 'equal') {
        return 'result-equal';
      } else if (this.result === 'surplus') {
        return 'result-surplus';
      } else if (this.result === 'deficit') {
        return 'result-deficit';
      }
    },
  },
});

app.mount('#app');
