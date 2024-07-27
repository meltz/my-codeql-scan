// Create a Vue 3 app instance and mount it
const appHighlights = Vue.createApp({
  data() {
    return {
      pagelang: 'EN', // Set the default value for pagelang
    };
  },
});

// Composition function to share props and methods
appHighlights.component('main-highlights', {
  props: {
    pagelang: String,
  },
  data() {
    return {
      assetPath: '../../en/Pages/images/highlights/',
      highlights: [
        {
          imgEN: 'singapore-pools-in-the-community.jpg',
          headerEN: 'Singapore Pools in the Community',
          captionEN: 'The community is at the heart of what we do',
          linkEN: 'https://www.singaporepools.com.sg/en/ishine/Pages/default.aspx',
          imgCH: 'singapore-pools-in-the-community.jpg',
          headerCH: '新加坡博彩公司在社区的贡献',
          captionCH: '回馈社会，惠及大众',
          linkCH: 'https://www.singaporepools.com.sg/ch/ishine/Pages/default.aspx',
          imgBorder: false,
          startDate: '', // yyyy-mm-dd hh:mm:ss
          endDate: '',
          display: true, // Scheduled set to false
        },
        {
          imgEN: 'safer-play.jpg',
          headerEN: 'Safer Play',
          captionEN: 'Creating a Safer Play Environment together',
          linkEN: 'https://www.singaporepools.com.sg/ms/sp/en/index.html',
          imgCH: 'safer-play.jpg',
          headerCH: '谨慎投注',
          captionCH: '一起打造一个谨慎投注的环境',
          linkCH: 'https://www.singaporepools.com.sg/ms/sp/ch/index.html',
          imgBorder: true,
          startDate: '', // yyyy-mm-dd hh:mm:ss
          endDate: '',
          display: true, // Scheduled set to false
        },
      ],
    };
  },
  template: `
    <template v-for="(highlight, index) in filterHighlights">
      <template v-if="pagelang === 'CH'">
        <div class="hightlight-each">
          <div class="row">
            <div :class="['col-12', 'col-md-6', 'col-lg-6', 'd-flex', {'order-md-2 order-lg-2': index % 2 !== 0 }]">
              <img :src="assetPath + highlight.imgCH" :alt="highlight.headerCH" :class="['highlight-img', 'img-fluid', {'highlight-border': highlight.imgBorder}]" />
            </div>
            <div :class="['col-12', 'col-md-6', 'col-lg-6', 'd-flex', {'order-md-1 order-lg-1': index % 2 !== 0 }]">
              <div class="hightlight-content">
                <h3 v-if="highlight.headerCH" class="highlight-header" v-html="highlight.headerCH"></h3>
                <p v-if="highlight.captionCH" class="hightlight-caption" v-html="highlight.captionCH"></p>
                <a v-if="highlight.linkCH" :href="highlight.linkCH" target="_blank" :title="\`\${highlight.headerEN} - CH\`" class="highlight-btn ga-highlights">更多详情</a>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="hightlight-each">
          <div class="row">
            <div :class="['col-12', 'col-md-6', 'col-lg-6', 'd-flex', {'order-md-2 order-lg-2': index % 2 !== 0 }]">
              <img :src="assetPath + highlight.imgEN" :alt="highlight.headerEN" :class="['highlight-img', 'img-fluid', {'highlight-border': highlight.imgBorder}]" />
            </div>
            <div :class="['col-12', 'col-md-6', 'col-lg-6', 'd-flex', {'order-md-1 order-lg-1': index % 2 !== 0 }]">
              <div class="hightlight-content">
                <h3 v-if="highlight.headerEN" class="highlight-header" v-html="highlight.headerEN"></h3>
                <p v-if="highlight.captionEN" class="hightlight-caption" v-html="highlight.captionEN"></p>
                <a v-if="highlight.linkEN" :href="highlight.linkEN" target="_blank" :title="\`\${highlight.headerEN} - EN\`" class="highlight-btn ga-highlights">Find out more</a>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>`,
  methods: {
    setDisplayState(todayDate) {
      this.highlights.map((highlight) => {
        if (highlight.startDate && highlight.endDate) {
          // Parse datetime to standard system format
          const startDate = dateFns.parse(highlight.startDate);
          const endDate = dateFns.parse(highlight.endDate);

          if (todayDate >= startDate && todayDate <= endDate) {
            highlight.display = true;
          }
        }
      });
    },
    displayHighlights() {
      // Set highlights display true based on scheduled timing
      const todayDate = dateFns.parse(new Date());
      this.setDisplayState(todayDate);
    },
  },
  computed: {
    filterHighlights() {
      return this.highlights.filter((highlight) => highlight.display);
    },
  },
  created() {
    this.displayHighlights();
  },
});

// Mount the app
appHighlights.mount('#vue-highlights');
