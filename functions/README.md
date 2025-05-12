
# Todo List Backend - Fase de Testing

Este documento detalla la configuración, ejecución y validación de pruebas unitarias, integración, cobertura de código para el backend de la aplicación Todo List, construida con Firebase Functions, Express, TypeScript y arquitectura Hexagonal + DDD.

---

## 1. Testing

### Librerías usadas:
- Jest
- ts-jest
- supertest
- @faker-js/faker
- tsyringe (requiere reflect-metadata)

### Setup global:
Se creó jest.setup.ts con:

import 'reflect-metadata';

Y se agregó en jest.config.ts:

setupFiles: ['<rootDir>/jest.setup.ts'],

---

## 2. Pruebas unitarias

Casos de uso testeados:
- CreateUser
- GetUserByEmail
- CreateTask
- GetTasks
- UpdateTask
- DeleteTask

Todos con mocks y datos de faker.

---

## 3. Pruebas de integración

Endpoints testeados:
- POST /users
- GET /users/:email
- POST /tasks
- GET /tasks/:userId
- PUT /tasks/:taskId
- DELETE /tasks/:taskId

---

## 4. Cobertura

Se ejecuta con:

pnpm test:coverage

Cobertura esperada: >80%

---

## 5. Linting

Instalación:

pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

Ejemplo .eslintrc.js:

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    semi: ['error', 'always'],
  },
};

---

## Validación final

| Elemento         | Estado |
|------------------|--------|
| Unit tests       | OK     |
| Integration tests| OK     |
| Faker integrado  | OK     |
| reflect-metadata | OK     |
| Coverage >80%    | OK     |
| CI automatizado  | OK     |

--- 

