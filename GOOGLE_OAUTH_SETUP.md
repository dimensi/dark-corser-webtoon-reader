# Настройка Google OAuth для Archive Reader

> **Примечание**: Название "Archive Reader" можно изменить в файле `src/lib/config.ts`

## Настройка Google Cloud Console

### 1. Создание проекта (если еще не создан)
1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Убедитесь, что проект активен

### 2. Включение Google Drive API
1. В боковом меню выберите "APIs & Services" > "Library"
2. Найдите "Google Drive API"
3. Нажмите "Enable"

### 3. Настройка OAuth consent screen
1. Перейдите в "APIs & Services" > "OAuth consent screen"
2. Выберите "External" (для публичного использования)
3. Заполните обязательные поля:
   - App name: "Dark Score Webtoon Reader" (или любое другое имя)
   - User support email: ваш email
   - Developer contact information: ваш email
4. В разделе "Scopes" добавьте:
   - `https://www.googleapis.com/auth/drive.readonly`
5. **ВАЖНО**: В разделе "Test users" добавьте email адреса для тестирования:
   - Добавьте свой email
   - Добавьте email адреса всех, кто будет тестировать приложение
   - Без этого шага будет ошибка 403: access_denied
6. Сохраните настройки

### 4. Создание OAuth 2.0 credentials
1. Перейдите в "APIs & Services" > "Credentials"
2. Нажмите "Create Credentials" > "OAuth 2.0 Client IDs"
3. Выберите "Web application"
4. Настройте:
   - Name: "Archive Reader Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:5173` (для разработки)
     - `https://yourdomain.com` (для продакшена)
   - Authorized redirect URIs:
     - `http://localhost:5173` (для разработки)
     - `https://yourdomain.com` (для продакшена)

### 5. Скачивание credentials
1. После создания клиента, скачайте JSON файл
2. Переименуйте файл в `client_secret_*.json` и поместите в корень проекта
3. Файл уже добавлен в `.gitignore` для безопасности

## Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
```

## Проверка работы

1. Запустите проект: `npm run dev`
2. Откройте браузер и перейдите на `http://localhost:5173`
3. Нажмите кнопку "Войти через Google"
4. Авторизуйтесь в Google
5. Попробуйте открыть файл из Google Drive

## Возможные проблемы

### Ошибка "This app isn't verified"
- Это нормально для приложений в режиме разработки
- Нажмите "Advanced" > "Go to Archive Reader (unsafe)"
- Для продакшена нужно пройти верификацию Google

### Ошибка "redirect_uri_mismatch"
- Убедитесь, что URL в Google Cloud Console точно совпадает с URL приложения
- Проверьте, что нет лишних слешей или протоколов

### Ошибка "access_denied" (403)
**Это самая частая ошибка!** Решение:
1. **Добавьте себя в Test users**:
   - Перейдите в "APIs & Services" > "OAuth consent screen"
   - Найдите раздел "Test users"
   - Нажмите "+ ADD USERS"
   - Добавьте свой email адрес
   - Сохраните изменения
2. **Проверьте статус приложения**:
   - Убедитесь, что приложение в статусе "Testing"
   - Если статус "In production", но не прошло верификацию, верните в "Testing"
3. **Проверьте scope**:
   - Убедитесь, что `https://www.googleapis.com/auth/drive.readonly` добавлен в OAuth consent screen
4. **Проверьте Google Drive API**:
   - Убедитесь, что Google Drive API включен в проекте

## Безопасность

- Никогда не коммитьте файлы с credentials в Git
- Используйте переменные окружения для production
- Регулярно ротируйте client secrets
- Ограничьте доступ к Google Cloud Console
