# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



front/
├── node_modules/                  # Папка зависимостей (автоматически создаётся)
├── public/                        # Статические файлы
│   └── (возможно favicon, изображения и т.д.)
├── src/                           # Исходный код приложения
│   ├── api/
│   │   └── axios.js               # Настроенный Axios-инстанс
│   ├── assets/                    # Изображения, иконки, стили
│   ├── components/                # Компоненты интерфейса
│   │   ├── AddCarModal.jsx
│   │   ├── CarList.jsx
│   │   ├── CarUser.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Profile.jsx
│   │   ├── ProfitWidget.jsx
│   │   ├── RentalCars.jsx
│   │   ├── RentingModal.jsx
│   │   ├── Settings.jsx
│   │   ├── SideBar.jsx
│   │   ├── TransactionTable.jsx
│   │   ├── UserCard.jsx
│   │   └── UserList.jsx
│   ├── pages/                     # Страницы (маршруты)
│   │   ├── Dashboard.jsx
│   │   ├── DevConsole.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── App.jsx                    # Корневой компонент
│   ├── index.css                  # Глобальные стили
│   └── main.jsx                   # Точка входа (ReactDOM.createRoot)
├── .gitignore                     # Исключения для Git
├── eslint.config.js              # Конфигурация ESLint
├── index.html                    # HTML-шаблон для Vite
├── package-lock.json             # Лок-файл npm
├── package.json                  # Зависимости и скрипты
├── README.md                     # Документация проекта
└── vite.config.js                # Конфигурация Vite
