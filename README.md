<center>

# Cron plugin for Strapi

**Manage and monitor cron from Strapi admin panel.**
<br />
<br />

![Cron plugin for Strapi](/assets/image-1.png)

</center>

--

## 👋 Get Started

- [Features](#-features)
- [Installation](#-installation)
- [Configuration](#%EF%B8%8F-configuration)
- [Usage](#-usage)

## ✨ Features

- GUI integrated with Strapi admin panel
- tasks scheduling tool incorporating start/end dates and iterations counter
- script logs & monitoring

## 🔧 Installation

TBD

## ⚙️ Configuration

TBD

## 📌 Usage

If you want to maintain your cron job script files within the parent project and track them with a VCS, you should place them in a location relative to `<your-strapi-project>/src/extensions/cron/`.

The script file should be a `.ts` module which exports an async function:

```JS
module.exports = async ({ strapi, cronJob }) => {
};
```

The function has access to `strapi` global variable and the relevant `cronJob` object.

The script snippet maintained via the Cron plugin dashboard has a direct top-level access to those parameters.
