# 🔐 Пошаговая инструкция для верификации Google OAuth

## 📋 Шаг 1: Обновить OAuth Consent Screen

### Перейти в Google Cloud Console:
1. Откройте https://console.cloud.google.com/
2. Выберите проект: `acquired-backup-118519`
3. Перейдите в **"APIs & Services"** → **"OAuth consent screen"**

### Заполнить обязательные поля:

#### App Information:
- **App name**: `Dark Score Webtoon Reader`
- **User support email**: ваш email
- **App logo**: загрузите логотип (рекомендуется)
- **App domain**: `dark-corser-webtoon-reader.vercel.app`
- **Developer contact information**: ваш email

#### Authorized domains:
- Добавить: `vercel.app`

#### Scopes:
- Убедиться, что есть: `https://www.googleapis.com/auth/drive.readonly`

#### Test users (для тестирования):
- Добавить свой email
- Добавить email адреса тестировщиков

## 📋 Шаг 2: Добавить Privacy Policy и Terms of Service

### В OAuth consent screen добавить URLs:
- **Privacy Policy URL**: `https://dark-corser-webtoon-reader.vercel.app/privacy`
- **Terms of Service URL**: `https://dark-corser-webtoon-reader.vercel.app/terms`

## 📋 Шаг 3: Подтвердить владение доменом

### В Google Search Console:
1. Перейти в https://search.google.com/search-console/
2. Добавить свойство: `dark-corser-webtoon-reader.vercel.app`
3. Подтвердить владение одним из способов:
   - HTML файл (рекомендуется)
   - DNS запись
   - Google Analytics
   - Google Tag Manager

### Создать HTML файл для подтверждения:
1. Скачать HTML файл из Search Console
2. Загрузить его в папку `static/` проекта
3. Деплой на Vercel
4. Подтвердить в Search Console

## 📋 Шаг 4: Обновить Credentials

### В "APIs & Services" → "Credentials":
1. Найти ваш OAuth 2.0 Client ID
2. Обновить **Authorized JavaScript origins**:
   - `https://dark-corser-webtoon-reader.vercel.app`
3. Обновить **Authorized redirect URIs**:
   - `https://dark-corser-webtoon-reader.vercel.app`

## 📋 Шаг 5: Подать заявку на верификацию

### В OAuth consent screen:
1. Нажать **"Submit for verification"**
2. Заполнить форму с подробным описанием:

#### App Details:
- **App name**: Dark Score Webtoon Reader
- **App description**: Web application for reading webtoon archives from Google Drive
- **App purpose**: Allows users to read webtoon images stored in their Google Drive

#### Data Access Justification:
```
This application requests read-only access to Google Drive files to display webtoon images for reading purposes. The app:

1. Only requests read-only access (drive.readonly scope)
2. Does not modify, delete, or share user files
3. Does not store files on external servers
4. Only accesses files that users explicitly choose to view
5. Stores access tokens locally in user's browser
6. Users can revoke access at any time

The app is designed for personal use to read webtoon archives that users have stored in their own Google Drive accounts.
```

#### Security Measures:
- HTTPS encryption for all communications
- Local token storage (no server-side storage)
- Read-only access permissions
- User-controlled access revocation

## ⏰ Временные рамки верификации

- **Обычное время**: 4-6 недель
- **Ускоренная верификация**: 1-2 недели (для критических приложений)
- **Пока не верифицировано**: максимум 100 пользователей

## 🚨 Важные моменты

1. **Privacy Policy и Terms of Service должны быть доступны ДО подачи заявки**
2. **Домен должен быть подтвержден в Search Console**
3. **Все поля в OAuth consent screen должны быть заполнены**
4. **Scope должен точно соответствовать функциональности**

## 📞 После подачи заявки

1. Google может запросить дополнительную информацию
2. Проверьте email на предмет запросов от Google
3. Отвечайте на все запросы быстро и подробно
4. При необходимости предоставьте демо-доступ к приложению
