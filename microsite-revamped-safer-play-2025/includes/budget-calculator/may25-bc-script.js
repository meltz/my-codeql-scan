const app = Vue.createApp({
  data() {
    return {
      showStart: true,
      showResult: false,
      errorMsgEN: 'Please enter whole numbers only',
      errorMsgCH: '只限填写整数',

      employmentIncomeError: '',
      otherIncomeError: '',

      foodExpenseError: '',
      transportExpenseError: '',
      housingExpenseError: '',
      othersExpenseError: '',

      entertainmentExpenseError: '',
      gamblingExpenseError: '',
      othersLeisureExpenseError: '',

      submitButtonError: '',

      employmentIncome: null,
      otherIncome: null,

      foodExpense: null,
      transportExpense: null,
      housingExpense: null,
      othersExpense: null,

      entertainmentExpense: null,
      gamblingExpense: null,
      othersLeisureExpense: null,

      totalIncome: 0,
      totalExpenses: 0,
      totalLeisureExpenses: 0,

      gamblingOverIncomeP: 0, // Gambling expenses over total income * 100
      chartReminderP: 0, // 100% - gamblingOverIncomeP
      balanceLeft: 0, // Total income - total expenses

      result: '', // Based on balance: positive, negative, or 0
      chartColor: '',
      chart: null,
    };
  },
  methods: {
    // Prevent typing non-numeric characters
    onlyAllowNumbers(event) {
      if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
      }
    },

    // Ensure pasted input is numeric only
    filterNumericInput(fieldName) {
      this[fieldName] = String(this[fieldName]).replace(/\D/g, '');
    },

    // When cursor leave the field, check only whole numbers allowed
    validateNumeric(fieldName) {
      const numericRegex = /^[0-9]+$/;

      if (this[fieldName] === '' || !numericRegex.test(this[fieldName])) {
        this[fieldName + 'Error'] = true;
      } else {
        this[fieldName + 'Error'] = false;
      }

      this.disabledButton();
    },

    disabledButton() {
      if (
        this.employmentIncomeError === false &&
        this.otherIncomeError === false &&
        this.foodExpenseError === false &&
        this.transportExpenseError === false &&
        this.housingExpenseError === false &&
        this.othersExpenseError === false &&
        this.entertainmentExpenseError === false &&
        this.gamblingExpenseError === false &&
        this.othersLeisureExpenseError === false
      ) {
        this.submitButtonError = false;
      } else {
        this.submitButtonError = true;
      }
    },

    submitForm(language) {
      if (this.submitButtonError === false) {
        if (
          this.employmentIncomeError === false &&
          this.otherIncomeError === false &&
          this.foodExpenseError === false &&
          this.transportExpenseError === false &&
          this.housingExpenseError === false &&
          this.othersExpenseError === false &&
          this.entertainmentExpenseError === false &&
          this.gamblingExpenseError === false &&
          this.othersLeisureExpenseError === false
        ) {
          this.countBalanceLeft();

          // Ensure chart is created after DOM updates
          this.$nextTick(() => {
            this.updateChart();
            document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' }); // Scroll to bottom of the result section
          });

          this.trackVirtualPage(language, 'budget-calculator-result');
        }
      }
    },

    countBalanceLeft() {
      this.showStart = false;
      this.showResult = true;

      this.balanceLeft = this.totalIncome - this.totalExpenses - this.totalLeisureExpenses;

      // Round off percentage to 2 decimal place, if exceed 100 will still show 100, default to 0
      this.gamblingOverIncomeP = this.totalIncome > 0 ? Math.max(0, Math.min(Math.round((this.gamblingExpense / this.totalIncome) * 100), 100)) : 0;

      // To populate the other half of the chart, default 0 so won't cause error, round off to 2 decimal place
      this.chartReminderP = Math.max(0, Math.round((100 - this.gamblingOverIncomeP) * 100) / 100);

      if (parseInt(this.gamblingExpense) !== 0) {
        if (this.balanceLeft > 0) {
          this.result = 'positive';
          this.chartColor = '#f4b900';
        } else if (this.balanceLeft === 0) {
          this.result = 'equal';
          this.chartColor = '#e58613';
        } else if (this.balanceLeft < 0) {
          this.result = 'negative';
          this.chartColor = '#d94538';
        }
      } else {
        this.result = 'very-positive';
        this.chartColor = '#f4b900';
      }

      this.trackResult(this.balanceLeft, this.result);
    },

    updateChart() {
      this.$nextTick(() => {
        const chartCanvas = document.getElementById('balanceLeftChart');

        if (!chartCanvas) return; // Ensure canvas exists
        const ctx = chartCanvas.getContext('2d');

        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Gambling Expense', 'Total Income'],
            datasets: [
              {
                data: [this.gamblingOverIncomeP, this.chartReminderP],
                backgroundColor: [this.chartColor, '#0073C2'],
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `${tooltipItem.raw}%`, // Add % prefix in tooltips
                },
              },
            },
          },
        });
      });
    },

    resetFields() {
      this.employmentIncomeError = '';
      this.otherIncomeError = '';

      this.foodExpenseError = '';
      this.transportExpenseError = '';
      this.housingExpenseError = '';
      this.othersExpenseError = '';

      this.entertainmentExpenseError = '';
      this.gamblingExpenseError = '';
      this.othersLeisureExpenseError = '';

      this.submitButtonError = '';

      this.employmentIncome = null;
      this.otherIncome = null;

      this.foodExpense = null;
      this.transportExpense = null;
      this.housingExpense = null;
      this.othersExpense = null;

      this.entertainmentExpense = null;
      this.gamblingExpense = null;
      this.othersLeisureExpense = null;

      this.totalIncome = 0;
      this.totalExpenses = 0;
      this.totalLeisureExpenses = 0;

      this.gamblingOverIncomeP = 0;
      this.chartReminderP = 0;
      this.balanceLeft = 0;

      this.result = '';
      this.chartColor = '';

      this.showResult = false; // Hide the result section
      window.scrollTo(0, 0);

      this.$nextTick(() => {
        document.getElementById('app')?.scrollIntoView({ behavior: 'smooth' }); // Scroll to bottom of the result section
      });
    },

    trackVirtualPage(language, pageName) {
      const path = `/ms/sp/${language}/${pageName}.html`;
      dataLayer.push({
        event: 'bc_virtual_page_view',
        event_category: 'bc_virtual_page_view',
        event_action: pageName,
        event_label: path,
      });
    },

    trackResult(balanceLeft, result) {
      dataLayer.push({
        event: 'bc_result',
        event_category: 'Budget Calculator Result',
        event_action: balanceLeft,
        event_label: result,
      });
    },

    trackOutbound(event) {
      const link = event.target.getAttribute('href');
      dataLayer.push({
        event: 'bc_outbound',
        event_category: 'Calculator Outbound',
        event_action: 'Click',
        event_label: link,
      });
    },
  },
  computed: {
    getTotalIncome() {
      this.totalIncome = parseInt(this.employmentIncome || 0) + parseInt(this.otherIncome || 0);
      return this.totalIncome;
    },

    getTotalExpenses() {
      this.totalExpenses =
        parseInt(this.foodExpense || 0) + parseInt(this.transportExpense || 0) + parseInt(this.housingExpense || 0) + parseInt(this.othersExpense || 0);
      return this.totalExpenses;
    },

    getTotalLeisureExpenses() {
      this.totalLeisureExpenses = parseInt(this.entertainmentExpense || 0) + parseInt(this.gamblingExpense || 0) + parseInt(this.othersLeisureExpense || 0);
      return this.totalLeisureExpenses;
    },
  },
});

app.mount('#app');
