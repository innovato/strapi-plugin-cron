import Initializer from './components/Initializer'
import PluginIcon from './components/PluginIcon'
import { pluginBasePath, pluginDisplayName, pluginId } from './utils/plugin'

import { prefixPluginTranslations } from '@strapi/helper-plugin'

export default {
  register(app) {
    app.addMenuLink({
      to: pluginBasePath,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: pluginDisplayName,
      },
      Component: async () => {
        const component = await import(
          /* webpackChunkName: "[request]" */ './pages/App'
        )

        return component
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    })
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name: pluginDisplayName,
    }

    app.registerPlugin(plugin)
  },

  bootstrap(app) {},
  async registerTrads(app) {
    const { locales } = app

    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            }
          })
          .catch(() => {
            return {
              data: {},
              locale,
            }
          })
      })
    )

    return Promise.resolve(importedTrads)
  },
}
