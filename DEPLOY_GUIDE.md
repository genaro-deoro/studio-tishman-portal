# 🚀 GUÍA PASO A PASO - Deploy en Vercel

## Opción 1: Usando GitHub (RECOMENDADO - MÁS FÁCIL)

### Paso 1: Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) y loguéate
2. Click en `+` arriba a la derecha → "New repository"
3. Nombre: `studio-tishman-portal`
4. Descripción: "Client Portal for Studio by Tishman"
5. ✅ "Public" (para que sea accesible)
6. Click "Create repository"

### Paso 2: Subir los archivos a GitHub

```bash
# En tu terminal, en la carpeta del proyecto:
git init
git add .
git commit -m "Initial commit - Portal inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/studio-tishman-portal.git
git push -u origin main
```

(Reemplaza `TU-USUARIO` con tu username de GitHub)

### Paso 3: Crear cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Selecciona "Continue with GitHub"
4. Autoriza a Vercel para acceder a tu GitHub
5. ¡Listo!

### Paso 4: Importar el proyecto a Vercel

1. En Vercel, click en "New Project"
2. Busca y selecciona `studio-tishman-portal`
3. Click "Import"

### Paso 5: Configurar Variables de Entorno

En la página de import, antes de hacer click "Deploy":

1. Scroll down hasta "Environment Variables"
2. Agrega estas variables:

| Variable | Valor |
|----------|-------|
| `JIRA_API_TOKEN` | `TU_TOKEN_AQUI` |
| `JIRA_USER_EMAIL` | `genaro.deoro@applydigital.com` |
| `NEXT_PUBLIC_JIRA_URL` | `https://applydigital.atlassian.net` |
| `NEXT_PUBLIC_PROJECT_KEY` | `MP` |
| `NEXT_PUBLIC_PROJECT_NAME` | `Studio by Tishman` |

3. Click "Deploy"

### Paso 6: ¡Espera a que termine!

Vercel compilará y deployará tu app. Tardará 1-2 minutos.

Cuando termine verás una pantalla con:
- ✅ Success!
- URL de tu app: `studio-tishman-portal.vercel.app`

---

## Opción 2: Deploy Automático (Actualizaciones)

Una vez está en Vercel, cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

**Vercel automáticamente:**
1. Detecta el cambio en GitHub
2. Compila el proyecto
3. Deploya la nueva versión
4. Tu URL se actualiza (sin downtime)

---

## ✅ Verificar que funciona

Después del deploy:

1. Ve a tu URL: `https://studio-tishman-portal.vercel.app`
2. Deberías ver el dashboard
3. Haz click en "Actualizar" para cargar los tickets
4. ¡Si ves los tickets, funciona! 🎉

---

## 🔗 Compartir con clientes

Copia tu URL y comparte:
```
https://studio-tishman-portal.vercel.app
```

Los clientes pueden acceder directamente, sin necesidad de login.

---

## 🛠️ Hacer cambios después

Si quieres cambiar algo:

1. **Edita los archivos localmente**
2. **Git push** a GitHub
3. **Vercel re-deploya automáticamente**

Ejemplo:
```bash
# Cambiar nombre del proyecto
# Edita .env.local y pages/index.js

git add .
git commit -m "Cambio: Nuevo nombre del proyecto"
git push origin main

# ✅ Vercel automáticamente redeploya
```

---

## 🚨 Si algo falla

### Error: "Failed to fetch issues"
- Verifica que las variables de entorno están correctas en Vercel
- Ve a Vercel → Settings → Environment Variables
- Copia exactamente los valores

### Error: "API Token is invalid"
- Copia el token nuevamente del perfil de Jira
- Verifica que NO hay espacios en blanco

### URL de Vercel no carga
- Espera 2-3 minutos después del deploy
- Refresca el navegador (Ctrl+F5)

---

## 📞 Resumen rápido

| Paso | Comando/Acción |
|------|---|
| 1 | Crear repo en GitHub |
| 2 | `git push` a GitHub |
| 3 | Crear cuenta en Vercel.com |
| 4 | Importar repo desde Vercel |
| 5 | Agregar variables de entorno |
| 6 | Click "Deploy" |
| 7 | ¡Listo! Accede a tu URL |

---

**¿Dudas?** Abre una issue en GitHub o contacta a Claude.
