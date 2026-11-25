# SEO launch checklist — ДаДом

## До публикации

- [ ] Production env: `NEXT_PUBLIC_SITE_URL=https://dadom.pro`, `SITE_INDEXABLE=true`.
- [ ] Проверены title, description, H1 и canonical главной страницы.
- [ ] `https://dadom.pro/robots.txt` отдаёт `200`, не редиректит и содержит ссылку на sitemap.
- [ ] `https://dadom.pro/sitemap.xml` отдаёт `200`, валиден и не содержит черновиков/preview.
- [ ] `/visual-preview` возвращает `404` в production (на Apache это обеспечивает опубликованный `.htaccess`).
- [ ] Все ссылки, изображения и CTA проверены на desktop и mobile.
- [ ] Страницы без подтверждённого содержания не добавлены в sitemap.

## Search Console и Яндекс Вебмастер

- [ ] Подтверждены HTTPS-свойства `https://dadom.pro/`.
- [ ] Добавлен один production sitemap: `https://dadom.pro/sitemap.xml`.
- [ ] Отправлен на обход только canonical главной после успешного production-проверочного сканирования.
- [ ] Через несколько дней проверены покрытие, ошибки обхода, robots, mobile usability и Core Web Vitals.

## Аналитика и заявки

- [ ] Подключены реальные ID Метрики/GA, если они утверждены.
- [ ] События: `project_view`, `package_select`, `callback_open`, `lead_submit`, `lead_success`, `phone_click`.
- [ ] В события не передаются имя, телефон, e-mail или иные персональные данные.
- [ ] Настроен серверный обработчик заявок и проверено, что успех показывается только после его ответа.

## После запуска

- [ ] Проверить 404, серверные ошибки, sitemap и robots через 7–14 дней.
- [ ] Публиковать новые материалы только после редакционной и технической проверки.
- [ ] Проверять реальные поисковые запросы и улучшать существующие страницы до создания новых.
