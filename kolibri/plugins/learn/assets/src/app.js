const KolibriModule = require('kolibri_module');
const Kolibri = require('kolibri');

const rootvue = require('./vue');
const router = require('./router');
const actions = require('./actions');
const store = require('./state/store');
const PageNames = require('./state/constants').PageNames;


class LearnModule extends KolibriModule {
  initialize() {
    Kolibri.resources.ContentNodeResource.setChannel('dummy_db');
  }
  ready() {
    router.on(
      PageNames.EXPLORE_ROOT,
      '/explore',
      (toRoute, fromRoute) => {
        actions.showExploreTopic(store, store.state.rootTopicId);
      }
    );

    router.on(
      PageNames.EXPLORE_TOPIC,
      '/explore/topic/:id',
      (toRoute, fromRoute) => {
        actions.showExploreTopic(store, toRoute.params.id);
      }
    );

    router.on(
      PageNames.EXPLORE_CONTENT,
      '/explore/content/:id',
      (toRoute, fromRoute) => {
        actions.showExploreContent(store, toRoute.params.id);
      }
    );

    router.on(
      PageNames.LEARN_ROOT,
      '/learn',
      (toRoute, fromRoute) => {
        actions.showLearnRoot(store);
      }
    );

    router.on(
      PageNames.SCRATCHPAD,
      '/scratchpad',
      actions.temp
    );

    router.redirect({
      '/': '/explore',
    });

    router.start(rootvue, 'rootvue');
  }
}

module.exports = new LearnModule();
