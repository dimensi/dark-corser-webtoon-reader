# ✅ Чек-лист для верификации Google OAuth

## 📋 Обязательные требования

### 1. OAuth Consent Screen Configuration
- [ ] **App name**: "Dark Score Webtoon Reader" (или другое подходящее имя)
- [ ] **User support email**: ваш рабочий email
- [ ] **Developer contact information**: ваш email
- [ ] **App logo**: загрузите логотип приложения (рекомендуется)
- [ ] **App domain**: `dark-corser-webtoon-reader.vercel.app`
- [ ] **Authorized domains**: `vercel.app`

### 2. Privacy Policy (ОБЯЗАТЕЛЬНО!)
- [ ] Создать страницу Privacy Policy
- [ ] URL должен быть доступен публично
- [ ] Должен объяснять, как приложение использует данные Google Drive

### 3. Terms of Service (рекомендуется)
- [ ] Создать страницу Terms of Service
- [ ] URL должен быть доступен публично

### 4. Website Verification
- [ ] Подтвердить владение доменом через Google Search Console
- [ ] Использовать аккаунт, который является Project Owner в Google Cloud Console

### 5. OAuth Scopes
- [ ] `https://www.googleapis.com/auth/drive.readonly` - для чтения файлов
- [ ] Убедиться, что scope точно соответствует запрашиваемому в коде

## 🚀 Действия для верификации

### Шаг 1: Создать Privacy Policy
Создать страницу `/privacy` в приложении с содержанием о том, как используются данные Google Drive.

### Шаг 2: Создать Terms of Service  
Создать страницу `/terms` с условиями использования.

### Шаг 3: Обновить OAuth Consent Screen
1. Перейти в Google Cloud Console → APIs & Services → OAuth consent screen
2. Заполнить все обязательные поля
3. Добавить URLs для Privacy Policy и Terms of Service
4. Загрузить логотип приложения

### Шаг 4: Подтвердить владение доменом
1. Перейти в Google Search Console
2. Добавить свойство `dark-corser-webtoon-reader.vercel.app`
3. Подтвердить владение через HTML файл или DNS запись

### Шаг 5: Подать заявку на верификацию
1. В OAuth consent screen нажать "Submit for verification"
2. Заполнить форму с подробным описанием приложения
3. Объяснить, зачем нужен доступ к Google Drive

## ⏰ Временные рамки
- **Верификация**: 4-6 недель
- **Пока верификация не завершена**: максимум 100 пользователей
- **После верификации**: неограниченное количество пользователей

## 🎯 Критически важно
- Privacy Policy URL должен быть доступен ДО подачи заявки
- Домен должен быть подтвержден в Search Console
- Все поля в OAuth consent screen должны быть заполнены
- Scope должен точно соответствовать функциональности приложения
