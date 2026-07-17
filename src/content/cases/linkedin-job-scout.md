---
slug: linkedin-job-scout
locale: ru
title: Поиск вакансий и AI-подготовка отклика
eyebrow: Сбор данных и human-in-the-loop
summary: Workflow получает вакансии, исключает уже обработанные позиции, оценивает соответствие профилю и готовит материалы для решения человеком.
status: public-template
featured: true
order: 4
stack:
  - n8n
  - Apify
  - Mistral AI
  - Google Sheets
  - Telegram Bot API
problems:
  - Повторяющийся ручной поиск по одинаковым фильтрам
  - Много нерелевантных вакансий и повторов
  - Подготовка черновика отклика начинается с нуля
nodeCount: 19
repoUrl: https://github.com/VanilVibecoder/n8n-linkedin-job-scout
releaseUrl: https://raw.githubusercontent.com/VanilVibecoder/n8n-linkedin-job-scout/main/workflow/automated-linkedin-job-scout.json
metrics:
  - value: '47'
    label: вакансий получено
    source: Один демонстрационный запуск исходного workflow, не production KPI
  - value: '17'
    label: прошли AI-оценку
    source: Один демонстрационный запуск исходного workflow, не production KPI
testedScenarios:
  - Ручной и ежедневный запуск обеих входных веток
  - Исключение уже сохранённых вакансий по URL
  - Двухступенчатая AI-оценка и структурированный ответ
  - Ограничение частоты Telegram-уведомлений
limitations:
  - Неподходящие вакансии пока не сохраняются в отдельный реестр Seen Jobs
  - Нужны централизованный error workflow и error branches
  - Первый AI Agent можно заменить более лёгким one-shot узлом после сравнения качества
architecture:
  - Schedule
  - Apify
  - Dedup
  - Title filter
  - AI fit gate
  - Telegram
gallery: []
updatedAt: 2026-07-17
---

## Задача

Ежедневный поиск по одним и тем же фильтрам создаёт много повторов и шума. Даже после отбора нужно сопоставить описание с профилем и подготовить основу для осмысленного отклика.

## Решение

n8n получает позиции через Apify, нормализует поля, сравнивает их с сохранёнными URL и применяет детерминированный фильтр. Подходящие позиции проходят AI-gate, после чего отдельный шаг готовит черновик материалов. Решение об отклике и отправка остаются за человеком.

## Инженерные решения

- Human-in-the-loop вместо автоматической отправки заявок.
- Детерминированная фильтрация до AI для уменьшения шума и расходов.
- Санитизированный неактивный экспорт без credential bindings и pin data.
- Retry на внешних интеграциях и явный timezone.
- Публичная документация с setup, аудитом и roadmap.

## Что улучшить дальше

Стоит вынести все просмотренные вакансии в отдельный реестр до AI-этапа, добавить централизованный error workflow и сравнить Agent с более простым one-shot вызовом на фиксированном тестовом наборе.
