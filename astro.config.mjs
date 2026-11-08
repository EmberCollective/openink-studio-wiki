import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://embercollective.github.io',
  base: '/openink-studio-wiki',
  trailingSlash: 'always',
  integrations: [starlight({
    title: 'OpenInk Studio',
    description: '从屏幕到纸面，开始你的第一次书写。',
    logo: { src: './src/components/logo.png' },
    components: { Hero: './src/components/Hero.astro', ThemeProvider: './src/components/ThemeProvider.astro' },
    favicon: '/favicon.png',
    defaultLocale: 'root',
    locales: { root: { label: '简体中文', lang: 'zh-CN' } },
    social: [{ icon: 'github', label: '软件源码', href: 'https://github.com/EmberCollective/openink-studio' }],
    editLink: { baseUrl: 'https://github.com/EmberCollective/openink-studio-wiki/edit/main/' },
    customCss: ['./src/styles/custom.css'],
    sidebar: [
      { label: '开始书写', items: [
        { slug: 'guide/first-write', label: '01　空白纸书写' },
        { slug: 'guide/pdf-write', label: '02　PDF 底稿套打' },
      ] },
    ],
  })],
});
