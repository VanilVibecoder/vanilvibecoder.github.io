import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const cases = [
  ['ai-front-office', 'AI Front Office для входящих заявок', true],
  ['rag-motorika', 'RAG-поддержка Motorika', true],
  ['ai-lead-triage', 'AI Lead Triage', true],
  ['linkedin-job-scout', 'Поиск вакансий и AI-подготовка отклика', true],
  ['ai-content-factory-lite', 'AI Content Factory Lite', false],
  ['ai-price-list-auditor', 'AI-аудитор прайс-листов', false],
] as const;

test('homepage presents broad positioning, navigation and working contacts', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(new RegExp('VANIL / Иван Новичков'));
  await expect(
    page.getByRole('heading', {
      name: 'Автоматизирую ручные бизнес-процессы с помощью n8n и AI.',
    }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Обсудить процесс' })).toHaveAttribute(
    'href',
    'https://t.me/novichkov_ivan',
  );
  await expect(page.getByRole('link', { name: 'Написать на email' })).toHaveAttribute(
    'href',
    'mailto:ewan.novichkov@yandex.ru',
  );
  await expect(page.locator('body')).not.toContainText('только для автосервисов');

  const casesLink = page.getByRole('link', { name: 'Кейсы', exact: true }).first();
  if (await casesLink.isVisible()) {
    await casesLink.click();
    await expect(page).toHaveURL(new RegExp('/cases/$'));
  }

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});

test('case catalogue contains six honest case statuses', async ({ page }) => {
  await page.goto('/cases/');

  await expect(page.locator('article.case-card')).toHaveCount(6);
  await expect(page.getByText('Демонстрационный MVP').first()).toBeVisible();
  await expect(page.getByText('Учебный кейс').first()).toBeVisible();
  await expect(page.getByText('Публичный шаблон')).toBeVisible();
});

for (const [slug, title, hasWorkflowDownload] of cases) {
  test(`case ${slug} exposes architecture, tests, limitations and repository`, async ({ page }) => {
    await page.goto(`/cases/${slug}/`);

    await expect(page.getByRole('heading', { name: title })).toBeVisible();
    await expect(page.getByText('Проверено', { exact: true })).toBeVisible();
    await expect(page.getByText('Ограничения', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'GitHub' }).first()).toHaveAttribute(
      'href',
      new RegExp('github[.]com/VanilVibecoder/'),
    );
    const workflowLink = page.getByRole('link', { name: 'Открыть workflow' });
    if (hasWorkflowDownload) {
      await expect(workflowLink).toHaveAttribute(
        'href',
        new RegExp('^https://(github|raw[.]githubusercontent)[.]com/'),
      );
    } else {
      await expect(workflowLink).toHaveCount(0);
    }
  });
}

test('pages do not overflow horizontally', async ({ page }) => {
  for (const route of ['/', '/cases/', ...cases.map(([slug]) => `/cases/${slug}/`)]) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth, `horizontal overflow at ${route}`).toBeLessThanOrEqual(
      dimensions.clientWidth + 1,
    );
  }
});

test('keyboard focus is visible and skip link works', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'К основному содержанию' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await skipLink.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('unknown route renders the project 404 page', async ({ page }) => {
  const response = await page.goto('/route-that-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'Этот маршрут никуда не подключён.' }),
  ).toBeVisible();
});
