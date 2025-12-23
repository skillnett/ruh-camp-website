# Налаштування інтеграції з Google Sheets

Ця інструкція допоможе вам налаштувати автоматичну відправку даних форми в Google Sheets.

## Крок 1: Створення Google Service Account

1. Перейдіть на [Google Cloud Console](https://console.cloud.google.com/)
2. Створіть новий проект або виберіть існуючий
3. Увімкніть **Google Sheets API**:
   - Перейдіть в "APIs & Services" > "Library"
   - Знайдіть "Google Sheets API" та натисніть "Enable"

## Крок 2: Створення Service Account

1. Перейдіть в "APIs & Services" > "Credentials"
2. Натисніть "Create Credentials" > "Service Account"
3. Заповніть форму:
   - **Service account name**: `payload-form-submissions` (або будь-яка назва)
   - **Service account ID**: автоматично заповниться
   - Натисніть "Create and Continue"
4. Надайте роль "Editor" (або "Owner" для тестування)
5. Натисніть "Done"

## Крок 3: Створення ключа

1. Знайдіть створений Service Account у списку
2. Натисніть на нього
3. Перейдіть на вкладку "Keys"
4. Натисніть "Add Key" > "Create new key"
5. Виберіть формат **JSON**
6. Натисніть "Create" - файл завантажиться автоматично

## Крок 4: Створення Google Таблиці

1. Створіть нову Google Таблицю або відкрийте існуючу
2. Надайте доступ Service Account:
   - Натисніть "Share" (Поділитися)
   - Вставте email Service Account (ви знайдете його в JSON файлі, поле `client_email`)
   - Надайте права "Editor"
   - Натисніть "Send"

## Крок 5: Отримання ID таблиці

1. Відкрийте вашу Google Таблицю
2. Подивіться на URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
3. Скопіюйте `SPREADSHEET_ID` (це довгий рядок між `/d/` та `/edit`)

## Крок 6: Налаштування змінних оточення

Додайте наступні змінні до вашого `.env` файлу:

```env
# Google Sheets налаштування
GOOGLE_SHEETS_ID=ваш_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=ваш_service_account_email@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nваш_приватний_ключ\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SHEET_NAME=Sheet1  # Опціонально, за замовчуванням "Sheet1"
```

### Як отримати значення з JSON файлу:

Відкрийте завантажений JSON файл:

- `GOOGLE_SHEETS_ID` - вставте ID таблиці з кроку 5
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` - знайдіть поле `client_email` в JSON
- `GOOGLE_PRIVATE_KEY` - скопіюйте значення поля `private_key` (включаючи `-----BEGIN PRIVATE KEY-----` та `-----END PRIVATE KEY-----`)

**Важливо:**

- При вставці `GOOGLE_PRIVATE_KEY` в `.env`, замініть всі реальні переноси рядків на `\n`
- Або обгорніть значення в подвійні лапки `"..."`

## Крок 7: Встановлення залежностей

```bash
pnpm install
```

## Крок 8: Перезапуск сервера

Після додавання змінних оточення перезапустіть ваш сервер:

```bash
pnpm dev
```

## Перевірка роботи

1. Заповніть форму на сайті
2. Перевірте, чи з'явився новий запис у вашій Google Таблиці
3. Перевірте логи сервера на наявність помилок

## Структура таблиці

Таблиця автоматично створить заголовки:

- Ім'я
- Email
- Телефон
- Дата створення

## Усунення проблем

### Помилка "Permission denied"

- Перевірте, чи Service Account має доступ до таблиці
- Переконайтеся, що email Service Account правильний

### Помилка "Invalid credentials"

- Перевірте формат `GOOGLE_PRIVATE_KEY` (має містити `\n` для переносів рядків)
- Переконайтеся, що JSON файл не був змінений

### Дані не з'являються в таблиці

- Перевірте логи сервера
- Переконайтеся, що всі змінні оточення встановлені правильно
- Перевірте, чи Hook спрацьовує (перевірте логи після створення запису)
