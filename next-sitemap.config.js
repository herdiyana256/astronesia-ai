/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://supernesia-ai.my.id',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/404', '/server-sitemap.xml'], // optional
  }
  