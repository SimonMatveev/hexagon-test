# Тестовое задание для `ООО Гексагон`

Frontend часть сервиса для сокращения ссылок. Реализованы

- Страница регистрации
- Страница авторизации
- Основная страница с интерфейсом для сокращения ссылки
- Страница, содержащая статистику по созданным ссылкам

Присутствует возможность сортировки по нескольким столбцам одновременно.
Все ссылки можно скопировать нажатием.

[Ссылка на сайт](https://hexagon.test.nomoredomainsrocks.ru/)

## Запуск

```
npm ci
```

1. Dev сервер

```
npm run dev
```

2. Сборка

```
npm run build
```

3. Возможна сборка прод версии и запуск сервера Nginx на `localhost:3000` с помощью Docker:

```
docker-compose up --build
```
