// Composition function to share props and methods
const sharedComposition = {
  props: {
    lang: String,
  },
  methods: {
    getCurrentURL() {
      // Get the first load page, remove leading slash and lang path
      const url = window.location.pathname;
      this.activePage = url === '/' ? 'index.html' : url.substring(url.lastIndexOf('/') + 1);
    },
    setMenu(menu) {
      return this.lang === 'ch' ? menu.chName : menu.enName;
    },
    setLink(menu) {
      return this.lang === 'ch' ? menu.chLink : menu.enLink;
    },
    setActivePage(menu) {
      const currentPage = this.setLink(menu);
      return this.activePage === currentPage;
    },
  },
  created() {
    this.getCurrentURL();
  },
};

// Component definitions
const mainMenu = {
  template: `
    <ul class="navbar-nav ms-auto">
      <li v-for="menu in menus" class="nav-item">
        <a :href="setLink(menu)" :class="[{ active : setActivePage(menu)}, 'main-nav-link nav-link']">{{ setMenu(menu) }}</a>
      </li>
    </ul>
    `,
  data() {
    return {
      menus: [
        {
          enName: 'Self-Assessment',
          chName: '自我评估',
          enLink: 'self-assessment.html',
          chLink: 'self-assessment.html',
        },
        {
          enName: 'Budget Calculator',
          chName: '预算计算机',
          enLink: 'budget-calculator.html',
          chLink: 'budget-calculator.html',
        },
        {
          enName: 'Help Resources',
          chName: '谨慎投注资源',
          enLink: 'get-support.html',
          chLink: 'get-support.html',
        },
      ],
    };
  },
  mixins: [sharedComposition],
};

const subMenu = {
  template: `
    <ul class="navbar-nav ms-auto">
      <li v-for="menu in menus" class="nav-item">
        <a :href="setLink(menu)" :class="[{ active : setActivePage(menu)}, 'nav-link']">{{ setMenu(menu) }}</a>
      </li>
    </ul>
    `,
  data() {
    return {
      menus: [
        {
          enName: 'Safer Play for our Customers',
          chName: '为顾客提供谨慎投注的游戏环境',
          enLink: 'index.html',
          chLink: 'index.html',
        },
        {
          enName: 'Online Betting Self-Exclusion',
          chName: '网上投注自愿禁赌',
          enLink: 'online-betting-self-exclusion.html',
          chLink: 'online-betting-self-exclusion.html',
        },
        {
          enName: 'When to Seek Help',
          chName: '何时寻求帮助',
          enLink: 'when-to-seek-help.html',
          chLink: 'when-to-seek-help.html',
        },
        {
          enName: 'Get Support',
          chName: '寻求帮助',
          enLink: 'get-support.html',
          chLink: 'get-support.html',
        },
        {
          enName: 'Our Commitment to Safer Play',
          chName: '我们对谨慎投注的承诺',
          enLink: 'our-commitment-to-safer-play.html',
          chLink: 'our-commitment-to-safer-play.html',
        },
      ],
    };
  },
  mixins: [sharedComposition],
};

// Create the Vue app
const appNav = Vue.createApp({
  mixins: [sharedComposition],
});

// Mount the components
appNav.component('main-menu', mainMenu);
appNav.component('sub-menu', subMenu);

// Mount the app
appNav.mount('#app-nav');
