const app = Vue.createApp({
  data() {
    return {
      showStart: true, // true
      showResult: false, // false
      currentQuestion: 0, // 0
      totalQuestion: 9, // 9
      totalScore: 0, // 0
      riskLevel: 1, // 1
    };
  },
  methods: {
    nextQuestion: function (language) {
      this.showStart = false;
      this.trackVirtualPage(language, 'q' + this.currentQuestion);

      this.currentQuestion++;

      if (this.currentQuestion > this.totalQuestion) {
        this.showResult = true;
        this.trackVirtualPage(language, 'result');
      }

      window.scrollTo(0, 0);
      // console.log('nextQuestion');
    },

    countTotalScore: function (questionScore) {
      var previousQuestion = this.currentQuestion - 1;

      this.totalScore += questionScore;
      this.trackScore(previousQuestion, questionScore);

      if (this.showResult === true) {
        this.riskLevel = this.countRiskLevel(this.totalScore);
        this.trackTotalScore(this.riskLevel, this.totalScore);
      }

      // console.log('countTotalScore');
    },

    countRiskLevel: function (totalScore) {
      if (totalScore === 0) {
        risk = 1;
      } else if (totalScore >= 1 && totalScore <= 2) {
        risk = 2;
      } else if (totalScore >= 3 && totalScore <= 7) {
        risk = 3;
      } else if (totalScore >= 8) {
        risk = 4;
      }

      return risk;
    },

    trackVirtualPage: function (language, currentQuestion) {
      var microsite = '/ms/sp/';
      var path = microsite + language + '/' + currentQuestion + '.html';

      // GA4 GTM tracking
      dataLayer.push({
        event: 'sa_virtual_page_view',
        event_category: 'sa_virtual_page_view',
        event_action: currentQuestion,
        event_label: path,
      });

      // console.log('Language ' + language, 'Current Question ' + currentQuestion, 'Path ' + path);
    },

    trackScore: function (question, score) {
      // GA4 GTM tracking
      dataLayer.push({
        event: 'sa_question_score',
        event_category: 'Question Score',
        event_action: 'Q' + question,
        event_label: score,
      });

      // console.log('Question ' + question, 'Score ' + score);
    },

    trackTotalScore: function (riskLevel, totalScore) {
      // GA4 GTM tracking
      dataLayer.push({
        event: 'sa_total_score',
        event_category: 'Total Score',
        event_action: 'R' + riskLevel,
        event_label: totalScore,
      });

      // console.log('Risk Level ' + riskLevel, 'Total Score ' + totalScore);
    },

    trackOutbound: function () {
      var link = event.target.getAttribute('href');

      // GA4 GTM tracking
      dataLayer.push({
        event: 'sa_outbound',
        event_category: 'SA Outbound',
        event_action: 'Click',
        event_label: link,
      });

      // console.log('Outbound Link ' + link);
    },
  },
});

app.mount('#app');
