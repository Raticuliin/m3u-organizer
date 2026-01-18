# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

---

## Análisis del Código y Roadmap

Este proyecto presenta una estructura sólida basada en **Clean Architecture**, lo que facilita la escalabilidad y el mantenimiento. Se ha realizado una revisión del código actual y se proponen las siguientes mejoras.

### Puntos Fuertes

- **Arquitectura Limpia**: Clara separación entre Dominio, Casos de Uso (Aplicación) e Infraestructura.
- **Tecnología Moderna**: Uso de Vite, React 19, TypeScript y Tailwind CSS.
- **Eficiencia**: El uso de `Set` en `scan-folder.use-case.ts` permite búsquedas O(1), optimizando el proceso de escaneo.

### TODO / Áreas de Mejora

#### Seguridad y Calidad de Código

- [ ] **Eliminar `any` en `browser-file-system.ts`**: El método `move` usa casting `as any` porque la API de File System Access es experimental o incompleta en los tipos estándar. Se debe definir una interfaz correcta o usar un polyfill/librería de tipos más robusta.
- [ ] **Manejo de Errores**: Mejorar el catch de errores en `scanDirectory` y `revertGame`. Actualmente solo hacen `console.error`; deberían burbujear el error o notificar al usuario en la UI.

#### UX y Persistencia

- [ ] **Persistencia de Permisos**: Al recargar la página, se pierde el acceso al directorio (`FileSystemDirectoryHandle`). Usar **IndexedDB** para guardar el handle y solicitar verificación de permisos al iniciar la app evitaría tener que volver a seleccionar la carpeta manualmente.
- [ ] **Feedback Visual**: Para librerías grandes, el escaneo puede tardar. Añadir spinners o barras de progreso en la UI.

#### Flexibilidad y Lógica

- [ ] **Configuración de Regex**: `game-parser.ts` usa una regex fija basada en `discPattern`. Sería ideal permitir que el usuario configure o elija patrones de nombrado (ej. "Disc 1", "CD1", "Part 1") desde la interfaz para soportar más convenciones de nombres.
- [ ] **Extensibilidad de Formatos**: El tipo `Format` está limitado a `.chd`. Generalizar esto permitiría soportar otros formatos de imagen de disco en el futuro sin refactorizar todo el dominio.

#### Testing

- [ ] **Tests Unitarios**: No hay tests actualmente. Se recomienda empezar por `game-parser.ts` (lógica pura) y los casos de uso para garantizar que la agrupación de juegos multidisco funcione correctamente ante diferentes nombres de archivo.
