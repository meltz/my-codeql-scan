// Create a Vue 3 app instance and mount it
const appBanners = Vue.createApp({
  data() {
    return {
      pagelang: 'EN', // Set the default value for pagelang
    };
  },
});

// Composition function to share props and methods
appBanners.component('main-banner', {
  props: {
    pagelang: String,
  },
  data() {
    return {
      assetPath: '../../en/Pages/images/banners/',
      banners: [
        {
          imgEN: 'SPA_PlacesBetOnline_mainbanner.jpg',
          headerEN: 'Place bets online',
          captionEN: 'With a Singapore Pools Account, you can skip the queue.',
          linkEN: 'https://www.singaporepools.com.sg/ms/spa/en/index.html',
          imgCH: 'SPA_PlacesBetOnline_mainbanner.jpg',
          headerCH: '网上投注',
          captionCH: '有了新加坡博彩户口, 您无需再排队。',
          linkCH: 'https://www.singaporepools.com.sg/ms/spa/ch/index.html',
          startDate: '2024-05-06 00:00:00', // yyyy-mm-dd hh:mm:ss
          endDate: '2024-05-09 21:00:00',
          display: false, // DO NOT DELETE this banner, use for cascade draw
        },
        {
          imgEN: 'SweepMAD2024_SEP_main_en.jpg',
          headerEN: 'Celebrate Mid-Autumn with Singapore Sweep $5 Million Mid-Autumn Draw',
          captionEN: 'Sales closes on 4 September 2024, 6pm.',
          linkEN: 'https://www.singaporepools.com.sg/ms/lotteryhomepage/sweep/index.html#lottery-rng',
          imgCH: 'SweepMAD2024_SEP_main_cn.jpg',
          headerCH: '与$500万新加坡中秋大彩庆祝中秋节',
          captionCH: '销售时间将于2024年9月4日，6时停止。',
          linkCH: 'https://www.singaporepools.com.sg/ms/lotteryhomepage/ch/sweep-cn/index.html#lottery-rng',
          startDate: '2024-08-07 18:10:00', // yyyy-mm-dd hh:mm:ss
          endDate: '2024-09-04 18:10:000',
          display: false, // Scheduled set to false
        },
        {
          imgEN: 'COG_CareAward_MainBanner.jpg',
          headerEN: 'Singapore Pools is recognised as a Company of Good - Three Hearts',
          captionEN: '',
          linkEN: 'https://www.singaporepools.com.sg/en/spn/Pages/COMPANY-OF-GOOD-2024.aspx',
          imgCH: 'COG_CareAward_MainBanner.jpg',
          headerCH: '新加坡博彩公司获认乐善公司 - 第三等级',
          captionCH: '',
          linkCH: 'https://www.singaporepools.com.sg/en/spn/Pages/COMPANY-OF-GOOD-2024.aspx',
          startDate: '2024-07-22 11:00:00', // yyyy-mm-dd hh:mm:ss
          endDate: '2024-09-22 23:59:00',
          display: false, // Scheduled set to false
        },
        {
          imgEN: 'Watch-TOTO-Draw-MCBannerEN.jpg',
          headerEN: 'Watch TOTO Draw (Delayed Broadcast)',
          captionEN: 'Visit TOTO microsite to watch TOTO draw (delayed broadcast).',
          linkEN: 'https://www.singaporepools.com.sg/ms/lotteryhomepage/toto/index.html#draw-video',
          imgCH: 'Watch-TOTO-Draw-MCBannerEN.jpg',
          headerCH: '观看多多开彩（延迟版）',
          captionCH: '在多多博彩网站观看多多开彩（延迟版）。',
          linkCH: 'https://www.singaporepools.com.sg/ms/lotteryhomepage/ch/toto-cn/index.html#draw-video',
          startDate: '', // yyyy-mm-dd hh:mm:ss
          endDate: '',
          display: true, // Scheduled set to false
        },
        {
          imgEN: 'SBK-MCBanner.jpg',
          headerEN: 'As of 7 Oct 24, Self-Betting Kiosk service and Betting Card will be discontinued.',
          captionEN: 'Please withdraw remaining funds from Betting Card at Horse Racing Live Betting Venues by 5 Jan 25.',
          linkEN: 'https://www.singaporepools.com.sg/en/HorseRacing/Locations/Pages/SelfBettingKiosks.aspx',
          imgCH: 'SBK-MCBanner.jpg',
          headerCH: '自2024年10月7日起，我们的自助投注站服务将终止，您的投注卡也将于同一天终止。',
          captionCH: '请在2025年1月5日之前在赛马即时投注场所提取您投注卡上的任何余额。',
          linkCH: 'https://www.singaporepools.com.sg/ch/HorseRacing/Locations/Pages/SelfBettingKiosks.aspx',
          startDate: '2024-04-15 10:00:00', // yyyy-mm-dd hh:mm:ss
          endDate: '2025-01-05 22:00:00',
          display: false, // Scheduled set to false
        },
        {
          imgEN: 'SPA_NavigationGuide_mainprdt_en.jpg',
          headerEN: 'Singapore Pools Account Navigation Guide',
          captionEN: 'Explore how to navigate Singapore Pools Account mobile app on the navigation guide. ',
          linkEN: 'https://www.singaporepools.com.sg/ms/spa/en/index.html#interactive-guide',
          imgCH: 'SPA_NavigationGuide_mainprdt_cn.jpg',
          headerCH: '新加坡博彩户口导航指南',
          captionCH: '了解如何在新加坡博彩户口应用程序上导航。',
          linkCH: 'https://www.singaporepools.com.sg/ms/spa/ch/index.html#interactive-guide',
          startDate: '2024-06-01 00:00:00', // yyyy-mm-dd hh:mm:ss  2020-04-01 18:00:00
          endDate: '2024-07-31 23:59:00', // 2020-05-06 18:00:00
          display: false, // Scheduled set to false
        },
        {
          imgEN: 'SPA-Jun1-MCBannerEN.jpg',
          headerEN: 'Keep it Legal, Keep it Safe',
          captionEN: 'Enjoy secure betting with a Singapore Pools Account.',
          linkEN: 'https://www.singaporepools.com.sg/ms/spa/en/index.html',
          imgCH: 'SPA-Jun1-MCBannerCN.jpg',
          headerCH: '确保安全、合法投注',
          captionCH: '使用新加坡博彩户口安全投注。',
          linkCH: 'https://www.singaporepools.com.sg/ms/spa/ch/index.html',
          startDate: '2024-07-01 00:00:00', // yyyy-mm-dd hh:mm:ss  2020-04-01 18:00:00
          endDate: '2024-07-31 23:59:00', // 2020-05-06 18:00:00
          display: false, // Scheduled set to false
        },
        {
          imgEN: 'SPA_JunMsg2_MainBanner_en.jpg',
          headerEN: 'Play it Smart, Bet Legally',
          captionEN: 'Enjoy peace of mind in every bet with a Singapore Pools Account.',
          linkEN: 'https://www.singaporepools.com.sg/ms/spa/en/index.html',
          imgCH: 'SPA_JunMsg2_MainBanner_cn.jpg',
          headerCH: '保持明智，安全投注',
          captionCH: '使用新加坡博彩户口，让每次投注都安心无忧。',
          linkCH: 'https://www.singaporepools.com.sg/ms/spa/ch/index.html',
          startDate: '2024-08-01 00:00:00', // yyyy-mm-dd hh:mm:ss  2020-04-01 18:00:00
          endDate: '2024-08-31 23:59:00', // 2020-05-06 18:00:00
          display: false, // Scheduled set to false
        },
        {
          imgEN: 'Lott_GenBanners_AprMayJun24_MainBanner.jpg',
          headerEN: 'Lottery Microsite',
          captionEN: 'Lottery microsite provides useful information on lottery to help you understand more about 4D, TOTO and Singapore Sweep.',
          linkEN: 'https://www.singaporepools.com.sg/ms/lotteryhomepage/index.html',
          imgCH: 'Lott_GenBanners_AprMayJun24_MainBanner.jpg',
          headerCH: '博彩主页',
          captionCH: '博彩主页提供实用的博彩资讯及教育性资料，让您更了解各项博彩游戏。',
          linkCH: 'https://www.singaporepools.com.sg/ms/lotteryhomepage/ch/home-cn/index.html',
          startDate: '', // yyyy-mm-dd hh:mm:ss
          endDate: '',
          display: true, // Scheduled set to false
        },
        {
          imgEN: 'RN-REA_SharingofResults_main.jpg',
          headerEN: 'Sharing of Results',
          captionEN: 'Unveiling the Star in Action you selected.',
          linkEN: 'https://www.singaporepools.com.sg/ms/rea/en/index.html',
          imgCH: 'RN-REA_SharingofResults_main.jpg',
          headerCH: '分享成绩',
          captionCH: '揭晓您选择的心动之星。',
          linkCH: 'https://www.singaporepools.com.sg/ms/rea/ch/index.html',
          startDate: '2024-03-01 00:00:00', // yyyy-mm-dd hh:mm:ss
          endDate: '2024-03-02 23:59:00',
          display: false, // Scheduled set to false
        },
        {
          imgEN: 'community-banner.jpeg',
          headerEN: 'For Community Purpose and Benefit since 1968',
          captionEN: '',
          linkEN:
            'https://www.singaporepools.com.sg/en/ci/Pages/default.aspx?utm_source=landingpage&utm_medium=banner&utm_campaign=For_community_purpose_and_benefit_since_1968&utm_id=community.1968',
          imgCH: 'community-banner.jpeg',
          headerCH: '造福社会, 利及人群',
          headerCH2: '',
          captionCH: '',
          linkCH:
            'https://www.singaporepools.com.sg/ch/ci/Pages/default.aspx?utm_source=landingpage&utm_medium=banner&utm_campaign=For_community_purpose_and_benefit_since_1968&utm_id=community.1968',
          startDate: '', // yyyy-mm-dd hh:mm:ss
          endDate: '',
          display: true, // Scheduled set to false
        },
        {
          imgEN: 'RG_Main_kopi_uncle.png',
          headerEN: 'Time to Lim Kopi!',
          captionEN: 'Take a break between your play.',
          linkEN: 'https://www.singaporepools.com.sg/ms/sp/en/index.html',
          imgCH: 'RG_Main_kopi_uncle.png',
          headerCH: '该和咖啡了！',
          captionCH: '赌博时应适当休息。',
          linkCH: 'https://www.singaporepools.com.sg/ms/sp/ch/index.html',
          startDate: '', // yyyy-mm-dd hh:mm:ss
          endDate: '',
          display: false, // Scheduled set to false
        },
        {
          imgEN: 'Sports-City-MCBannerEN.jpg',
          headerEN: 'Sports City',
          captionEN: 'Know the Game. Know the Tools. Play safely',
          linkEN: 'https://www.singaporepools.com.sg/ms/sc/en/index.html',
          imgCH: 'Sports-City-MCBannerCN.jpg',
          headerCH: '体育之城',
          captionCH: '了解游戏，知悉规则，谨慎投注',
          linkCH: 'https://www.singaporepools.com.sg/ms/sc/ch/index.html',
          startDate: '2023-08-11 00:00:00', // yyyy-mm-dd hh:mm:ss
          endDate: '2023-10-31 23:59:00',
          display: false, // Scheduled set to false
        },
      ],
    };
  },
  template: `
    <div class="slider">
      <template v-for="(banner, index) in filterBanners">
        <template v-if="pagelang === 'CH'">
          <div class="banner banner-slide">
            <img :src="assetPath + banner.imgCH" :alt="banner.headerCH" class="img-fluid img-vh-center" />
            <div class="banner-overlay">
              <div class="banner-content">
                <p v-if="banner.headerCH" class="banner-header" v-html="banner.headerCH"></p>
                <p v-if="banner.captionCH" class="banner-caption" v-html="banner.captionCH"></p>
                <a v-if="banner.linkCH" :href="banner.linkCH" target="_blank" :title="\`\${banner.headerEN} - CH\`" class="banner-btn ga-banner">更多详情</a>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="banner banner-slide">
            <img :src="assetPath + banner.imgEN" :alt="banner.headerEN" class="img-fluid img-vh-center" />
            <div class="banner-overlay">
              <div class="banner-content">
                <p v-if="banner.headerEN" class="banner-header" v-html="banner.headerEN"></p>
                <p v-if="banner.captionEN" class="banner-caption" v-html="banner.captionEN"></p>
                <a v-if="banner.linkEN" :href="banner.linkEN" target="_blank" :title="\`\${banner.headerEN} - EN\`" class="banner-btn ga-banner">Find out more</a>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>`,
  methods: {
    setDisplayState(todayDate) {
      this.banners.map((banner) => {
        if (banner.startDate && banner.endDate) {
          // Parse datetime to standard system format
          const startDate = dateFns.parse(banner.startDate);
          const endDate = dateFns.parse(banner.endDate);

          if (todayDate >= startDate && todayDate <= endDate) {
            banner.display = true;
          }
        }
      });
    },
    displayBanners() {
      // Set banners display true based on scheduled timing
      const todayDate = dateFns.parse(new Date());
      this.setDisplayState(todayDate);
    },
  },
  computed: {
    filterBanners() {
      return this.banners.filter((banner) => banner.display);
    },
  },
  created() {
    this.displayBanners();
  },
});

// Mount the app
appBanners.mount('#vue-banner');
