# 🚀 Studio by Tishman - Project Portal

Portal de gestión de proyectos conectado en tiempo real a Jira.

## 📋 Características

✅ **Integración real con Jira** - Sincronización automática de tickets
✅ **Dashboard interactivo** - Vista profesional de todos los tickets
✅ **Búsqueda y filtros** - Busca por ID, descripción o estado
✅ **Estadísticas en vivo** - Total, completados, en progreso, etc.
✅ **Diseño responsivo** - Funciona en desktop, tablet y móvil
✅ **Actualización automática** - Botón para refrescar datos

## 🛠️ Setup Local

### 1. Requisitos previos
- Node.js 18+ instalado
- Git instalado

### 2. Clonar o descargar el proyecto

```bash
# Si es un repositorio de Git
git clone <tu-repo-url>
cd studio-tishman-portal

# O descargar los archivos manualmente
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

El archivo `.env.local` ya está pre-configurado con:
- URL de Jira
- API Token
- Email de usuario
- Project Key

**⚠️ IMPORTANTE**: Nunca compartir el `.env.local` con el API token en público.

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 6. Compilar para producción

```bash
npm run build
npm start
```

---

## 🚀 Deploy en Vercel (RECOMENDADO)

### Opción A: Desde GitHub (Más fácil)

1. **Sube el proyecto a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/studio-tishman-portal.git
   git push -u origin main
   ```

2. **Crea cuenta en [Vercel.com](https://vercel.com)**

3. **Importa el proyecto**
   - Click en "New Project"
   - Selecciona tu repositorio
   - Click en "Import"

4. **Configura las variables de entorno**
   - Ve a Settings → Environment Variables
   - Agrega las mismas variables del `.env.local`:
     - `JIRA_API_TOKEN`
     - `JIRA_USER_EMAIL`
     - `NEXT_PUBLIC_JIRA_URL`
     - `NEXT_PUBLIC_PROJECT_KEY`
     - `NEXT_PUBLIC_PROJECT_NAME`

5. **Deploy automático**
   - Vercel detecta cambios en GitHub automáticamente
   - Cada push a `main` re-deploya

### Opción B: Vercel CLI (Más directo)

```bash
# 1. Instala Vercel CLI
npm i -g vercel

# 2. Loguéate
vercel login

# 3. Deploy
vercel

# 4. Sigue las instrucciones en pantalla
```

---

## 📊 API Endpoints

### `GET /api/jira/issues`

Obtiene todos los tickets del proyecto configurado.

**Respuesta:**
```json
{
  "success": true,
  "count": 100,
  "issues": [
    {
      "key": "MP-3051",
      "summary": "Improve client-side validation...",
      "status": "In Progress",
      "priority": "High",
      "assignee": "Juan Pérez",
      "dueDate": "2026-05-20",
      "created": "2026-04-01T10:00:00Z",
      "updated": "2026-05-01T14:30:00Z",
      "type": "Task",
      "components": ["Frontend"],
      "labels": ["validation", "bug"],
      "url": "https://applydigital.atlassian.net/browse/MP-3051"
    }
  ]
}
```

---

## 🔒 Seguridad

### API Token
- El token está en `.env.local` (NO se commitea a Git)
- Solo se usa en el servidor (Next.js API routes)
- Los clientes NO ven el token

### Acceso
- Por ahora es público (cualquiera puede acceder)
- Pronto: Agregar autenticación con token único por cliente

---

## 🎨 Personalización

### Cambiar proyecto
Edita `.env.local`:
```env
NEXT_PUBLIC_PROJECT_KEY=TDP    # Cambiar a otro proyecto
NEXT_PUBLIC_PROJECT_NAME=Tu Proyecto
```

### Cambiar colores
Edita `pages/index.js` y busca los colores Tailwind:
- `bg-blue-600` → azul
- `bg-emerald-500` → verde
- `bg-red-600` → rojo

### Cambiar filtros
En `pages/index.js`, busca la sección de filtros y modifica los estados:
```javascript
filter === 'inProgress' && ['In Progress', 'In Review'].includes(issue.status)
```

---

## 🐛 Troubleshooting

### "Failed to fetch issues"
- ✅ Verifica que el API token en `.env.local` es correcto
- ✅ Verifica que el email en `.env.local` es correcto
- ✅ Verifica que el proyecto existe en Jira

### "Method not allowed"
- ✅ Asegúrate de hacer GET request a `/api/jira/issues`
- ✅ No POST, no PUT, solo GET

### Vercel muestra error en deployment
- ✅ Verifica que las variables de entorno están configuradas
- ✅ Haz click en "Redeploy" en Vercel

---

## 📝 Próximas mejoras

- [ ] Autenticación con token único por cliente
- [ ] Sincronización automática cada hora
- [ ] Notificaciones en tiempo real
- [ ] Exportar a PDF
- [ ] Gráficos de progreso
- [ ] Integración con Slack

---

## 👤 Autor

Creado por Claude AI para Apply Digital

## 📧 Soporte

Para problemas o sugerencias, contacta a: genaro.deoro@applydigital.com

---

**Última actualización:** Mayo 2026
