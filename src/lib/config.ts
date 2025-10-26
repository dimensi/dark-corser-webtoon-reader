/**
 * Конфигурация приложения
 * Здесь можно изменить название сайта и другие настройки
 */

export const APP_CONFIG = {
  // Название сайта - измените это значение для смены названия во всем приложении
  SITE_NAME: 'Dark Score Webtoon Reader',
  
  // Дополнительные настройки можно добавить здесь
  // SITE_DESCRIPTION: '...',
  // SITE_URL: '...',
} as const;

// Экспортируем название сайта для удобства
export const SITE_NAME = APP_CONFIG.SITE_NAME;
