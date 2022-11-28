# Cron plugin for Strapi

Manage and monitor cron from the admin panel.

---

## 👋 Get Started

- [Features](#✨-features)
- [Installation](#🔧-installation)
- [Configuration](#⚙️-configuration)

## ✨ Features

TBD

## 🔧 Installation

TBD

## ⚙️ Configuration

TBD

---

If you want to maintain your cron job script files within the parent project and track them with a VCS, you should place them in a location relative to `<your-strapi-project>/src/extensions/cron/`.

The script file should be a `.ts` module which exports an async function:

```JS
module.exports = async ({ strapi, cronJob }) => {
};
```

The function has access to `strapi` global variable and the relevant `cronJob` object.

The script snippet maintained via the Cron plugin dashboard has a direct top-level access to those parameters.
