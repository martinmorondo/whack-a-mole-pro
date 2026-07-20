# Whack-a-Mole Pro | Showcase Técnico Full Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)
![Vitest](https://img.shields.io/badge/Vitest-FCC72B?style=for-the-badge&logo=vitest&logoColor=1E1E20)

> ** [Ver Demo en Vivo](URL)**

---

# Sobre el Proyecto

**Whack-a-Mole Pro** es una refactorización arquitectónica del clásico juego **Whack-a-Mole**, desarrollada con el objetivo de demostrar buenas prácticas de ingeniería de software, arquitectura escalable y desarrollo Full Stack moderno.

Más allá de recrear un juego, este proyecto funciona como un caso de estudio sobre cómo transformar una aplicación creada con JavaScript tradicional en una solución moderna utilizando **React, TypeScript, PostgreSQL y Supabase**.

---

# Tecnologías Utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Supabase
- PostgreSQL
- Vitest
- React Testing Library
- Framer Motion

---

# Arquitectura y Características Técnicas

## Separación entre lógica y presentación

Toda la lógica del juego (temporizadores, puntuación, aparición aleatoria de topos, estado de la partida, etc.) está encapsulada dentro de un **Custom Hook (`useGame.ts`)**.

Esto permite que los componentes visuales únicamente rendericen el estado, logrando una arquitectura mucho más mantenible y fácil de escalar.

---

## Testing Automatizado

Se implementó una estrategia completa de testing utilizando:

- Vitest
- React Testing Library

Incluye:

- Tests unitarios de la lógica de negocio.
- Tests de integración de la interfaz.
- Simulación de temporizadores mediante `vi.useFakeTimers()` para acelerar la ejecución de las pruebas sin esperar tiempos reales.

---

## Backend Seguro con Supabase

El juego incorpora un **Leaderboard Global** persistente utilizando Supabase.

La base de datos PostgreSQL se encuentra protegida mediante **Row Level Security (RLS)**, permitiendo únicamente las operaciones necesarias para el funcionamiento del juego y reduciendo el riesgo de accesos no autorizados.

---

## Animaciones Modernas

Las animaciones fueron desarrolladas con **Framer Motion**, utilizando físicas tipo *Spring* para generar movimientos fluidos y naturales, evitando transiciones bruscas mediante clases CSS.

---

## Tailwind CSS v4

El proyecto utiliza **Tailwind CSS v4** integrado directamente con el motor de Vite.

Esto permite:

- Menor tamaño del bundle.
- Configuración prácticamente nula.
- Mayor velocidad de desarrollo.

---

# Estructura del Proyecto

```text
src/
├── components/
│   ├── Hole.tsx          # Gestión individual de accesibilidad y animaciones
│   └── Leaderboard.tsx   # Comunicación asíncrona con Supabase
│
├── hooks/
│   └── useGame.ts        # Lógica principal del juego y gestión del estado
│
├── lib/
│   └── supabase.ts       # Configuración del cliente de Supabase
│
├── styles/
│   └── globals.css       # Estilos globales mínimos
│
└── App.tsx               # Componente principal
```

---

# Instalación

Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/whack-a-mole-pro.git
```

Accede al proyecto:

```bash
cd whack-a-mole-pro
```

Instala las dependencias:

```bash
npm install
```

---

# Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto e incorpora tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_publica
```

---

# ▶Ejecutar el Proyecto

Inicia el servidor de desarrollo:

```bash
npm run dev
```

---

# Ejecutar las Pruebas

Para correr toda la suite de pruebas:

```bash
npm run test
```

El proyecto utiliza **Fake Timers (`vi.useFakeTimers()`)** para simular el paso del tiempo durante la partida, haciendo que los tests sean rápidos y completamente deterministas.

---

# Aspectos Destacados

- Arquitectura escalable.
- Separación de responsabilidades.
- Código tipado con TypeScript.
- Persistencia de datos con PostgreSQL.
- Backend Serverless mediante Supabase.
- Testing automatizado.
- Diseño responsive.
- Animaciones fluidas.
- Buenas prácticas de desarrollo Full Stack.

---

# 👨Autor

**Martín Morondo**

**Full Stack Developer**

- 💼 LinkedIn: *https://www.linkedin.com/in/martin-morondo/*
- 🌐 Portfolio: *https://martinmorondoportfoli0.netlify.app/*