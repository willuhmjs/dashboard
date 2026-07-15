<script>
import { mapState, mapGetters } from 'vuex';
import {
  mapPref,
  AFTER_LOGIN_ROUTE,
  THEME_SHORTCUT
} from '@shell/store/prefs';
import ActionMenu from '@shell/components/ActionMenu';
import GrowlManager from '@shell/components/GrowlManager';
import ModalManager from '@shell/components/ModalManager';
import SlideInPanelManager from '@shell/components/SlideInPanelManager';
import PromptRemove from '@shell/components/PromptRemove';
import PromptRestore from '@shell/components/PromptRestore';
import PromptModal from '@shell/components/PromptModal';
import Header from '@shell/components/nav/Header';
import Inactivity from '@shell/components/Inactivity';
import Brand from '@shell/mixins/brand';
import FixedBanner from '@shell/components/FixedBanner';
import AwsComplianceBanner from '@shell/components/AwsComplianceBanner';
import { MANAGEMENT } from '@shell/config/types';
import { markSeenReleaseNotes } from '@shell/utils/version';
import PageHeaderActions from '@shell/mixins/page-actions';
import BrowserTabVisibility from '@shell/mixins/browser-tab-visibility';
import { getClusterFromRoute, getProductFromRoute } from '@shell/utils/router';
import SideNav from '@shell/components/SideNav';
import { Layout } from '@shell/types/window-manager';
import { RcButton } from '@components/RcButton';
import { CLUSTER_SHELL } from '@shell/store/features';

const SET_LOGIN_ACTION = 'set-as-login';

export default {

  components: {
    PromptRemove,
    PromptRestore,
    PromptModal,
    Header,
    ActionMenu,
    GrowlManager,
    ModalManager,
    SlideInPanelManager,
    FixedBanner,
    AwsComplianceBanner,
    Inactivity,
    SideNav,
    RcButton,
  },

  mixins: [PageHeaderActions, Brand, BrowserTabVisibility],

  inject: ['notifyWmContainerReady'],

  // Note - This will not run on route change
  data() {
    return {
      noLocaleShortcut: process.env.dev || false,
      wantNavSync:      false,
      isMobileNavOpen:  false,
    };
  },

  // Note - These will run on route change
  computed: {
    ...mapState(['managementReady', 'clusterReady']),
    ...mapGetters(['clusterId', 'currentProduct', 'rootProduct', 'isRancherInHarvester', 'showTopLevelMenu']),

    afterLoginRoute: mapPref(AFTER_LOGIN_ROUTE),

    themeShortcut: mapPref(THEME_SHORTCUT),

    pageActions() {
      const pageActions = [];
      const product = this.rootProduct;

      if ( !product ) {
        return [];
      }

      // Only show for Cluster Explorer or Global Apps (not configuration)
      const canSetAsHome = product.inStore === 'cluster' || (product.inStore === 'management' && product.category !== 'configuration') || this.isRancherInHarvester;

      if (canSetAsHome) {
        pageActions.push({
          label:  this.t('nav.header.setLoginPage'),
          action: SET_LOGIN_ACTION
        });
      }

      return pageActions;
    },

    unmatchedRoute() {
      return !this.$route?.matched?.length;
    },

    /**
     * When navigation involves unloading one cluster and loading another, clusterReady toggles from true->false->true in middleware (before new route content renders)
     * Prevent rendering "outlet" until the route changes to avoid re-rendering old route content after its cluster is unloaded
     */
    clusterAndRouteReady() {
      const targetRoute = this.$store.getters['targetRoute'];
      const routeReady = targetRoute ? this.currentProduct?.name === getProductFromRoute(this.$route) && this.currentProduct?.name === getProductFromRoute(targetRoute) : this.currentProduct?.name === getProductFromRoute(this.$route);

      return this.clusterReady &&
        this.clusterId === getClusterFromRoute(this.$route) && routeReady;
    },
  },

  mounted() {
    this.notifyWmContainerReady(Layout.default);
  },

  methods: {

    handlePageAction(action) {
      if (action.action === SET_LOGIN_ACTION) {
        this.afterLoginRoute = this.getLoginRoute();
        // Mark release notes as seen, so that the login route is honoured
        markSeenReleaseNotes(this.$store);
      }
    },

    getLoginRoute() {
      return {
        name:   this.$route.name,
        params: this.$route.params
      };
    },

    handleToggleMobileNav(isOpen) {
      this.isMobileNavOpen = isOpen;
    },

    // Keep the SideNav flyout and the TopLevelMenu hamburger's own state (which drives it) in sync
    // when the nav is dismissed by tapping outside of it, rather than via the hamburger itself.
    closeMobileNav() {
      this.isMobileNavOpen = false;
      this.$refs.header?.closeMobileNav();
    },

    toggleNoneLocale() {
      this.$store.dispatch('i18n/toggleNone');
    },

    toggleTheme() {
      this.$store.dispatch('prefs/toggleTheme');
    },

    wheresMyDebugger() {
      // vue-shortkey is preventing F8 from passing through to the browser... this works for now.
      // eslint-disable-next-line no-debugger
      debugger;
    },

    // Open the shell for the current cluster if the user has permissions and the feature is enabled (invoked via keyboard shortcut)
    async toggleShell() {
      const clusterId = this.$route.params.cluster;

      if ( !clusterId ) {
        return;
      }

      // Cluster shell is disabled via feature flag
      if (!this.$store.getters['features/get'](CLUSTER_SHELL)) {
        return;
      }

      const cluster = await this.$store.dispatch('management/find', {
        type: MANAGEMENT.CLUSTER,
        id:   clusterId,
      });

      if (!cluster ) {
        return;
      }

      cluster.openShell();
    },
  }
};
</script>

<template>
  <div class="dashboard-root">
    <rc-button
      size="large"
      class="skip-to-content"
      :to="{ hash: '#main-content' }"
    >
      {{ t('nav.skipToContent') }}
    </rc-button>
    <FixedBanner :header="true" />
    <AwsComplianceBanner v-if="managementReady" />
    <div
      v-if="managementReady"
      class="dashboard-content"
      :class="{'dashboard-padding-left': showTopLevelMenu}"
    >
      <div
        v-if="isMobileNavOpen"
        class="mobile-nav-overlay"
        @click="closeMobileNav"
      />
      <Header
        ref="header"
        @toggle-mobile-nav="handleToggleMobileNav"
      />
      <SideNav
        v-if="clusterReady"
        class="default-side-nav"
        :class="{'mobile-nav-open': isMobileNavOpen}"
      />
      <main
        v-if="clusterAndRouteReady"
        id="main-content"
        class="main-layout"
        :aria-label="t('layouts.default')"
        tabindex="-1"
      >
        <router-view
          :key="$route.path"
          class="outlet"
        />
        <ActionMenu />
        <PromptRemove />
        <PromptRestore />
        <PromptModal />
        <ModalManager />
        <button
          v-if="noLocaleShortcut"
          v-shortkey.once="['shift','l']"
          class="hide"
          @shortkey="toggleNoneLocale()"
        />
        <button
          v-if="themeShortcut"
          v-shortkey.once="['shift','t']"
          class="hide"
          @shortkey="toggleTheme()"
        />
        <button
          v-shortkey.once="['f8']"
          class="hide"
          @shortkey="wheresMyDebugger()"
        />
        <button
          v-shortkey.once="['`']"
          class="hide"
          @shortkey="toggleShell"
        />
      </main>
      <!-- Ensure there's an outlet to show the error (404) page -->
      <main
        v-else-if="unmatchedRoute"
        id="main-content"
        class="main-layout"
        :aria-label="t('layouts.default')"
        tabindex="-1"
      >
        <router-view
          :key="$route.path"
          class="outlet"
        />
      </main>
      <!-- Teleport target for WindowManager (unique per layout) -->
      <!-- display: contents makes child panels become grid items of the parent grid -->
      <div
        id="wm-container-default"
        style="display: contents;"
      />
    </div>
    <FixedBanner :footer="true" />
    <GrowlManager />
    <SlideInPanelManager />
    <Inactivity />
  </div>
</template>

<style lang="scss" scoped>
.skip-to-content {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  transform: translateY(-100%);

  &:focus {
    transform: translate(1rem, 1rem);
  }
}

.mobile-nav-overlay {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;

  @media (max-width: 768px) {
    display: block;
    // Leave the always-visible collapsed icon rail (TopLevelMenu) undimmed and clickable.
    left: $app-bar-collapsed-width;
  }
}
</style>
