# Proyecto TypeScript - Sistema de Gestión de Usuarios y Ubicaciones

## 📋 Descripción

Este es un proyecto TypeScript que implementa un sistema de gestión de usuarios y ubicaciones utilizando Node.js. El proyecto incluye una arquitectura orientada a objetos con clases abstractas, herencia, enums y una base de datos local en memoria.

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── abstract/           # Clases abstractas
│   └── User.class.ts   # Clase base abstracta para usuarios
├── db/                 # Capa de datos
│   └── local.database.ts # Base de datos local en memoria
├── enum/               # Enumeraciones
│   └── status.enum.ts  # Estados para ubicaciones
├── mainclasses/        # Clases principales
│   ├── Admin.class.ts     # Clase Admin
│   ├── Inspector.class.ts # Clase Inspector
│   └── Location.class.ts  # Clase Location
└── index.ts            # Punto de entrada principal
```

## 🎨 Patrones de Diseño Utilizados

### 1. Singleton Pattern
**Implementado en:** `LocalDatabase`

La clase `LocalDatabase` implementa el patrón Singleton para garantizar que solo exista una instancia de la base de datos en memoria durante toda la ejecución de la aplicación.

```typescript
public static getInstance(): LocalDatabase {
  if (!LocalDatabase.instance) {
    LocalDatabase.instance = new LocalDatabase();
  }
  return LocalDatabase.instance;
}
```

**Beneficios:**
- Garantiza una única fuente de verdad para los datos
- Evita conflictos de concurrencia
- Proporciona acceso global controlado a los datos

### 2. Template Method Pattern (Clase Abstracta)
**Implementado en:** `User` (clase abstracta)

La clase abstracta `User` define la estructura común para todos los tipos de usuarios, permitiendo que las clases derivadas (`Admin`, `Inspector`) implementen comportamientos específicos mientras mantienen una interfaz consistente.

```typescript
export abstract class User {
  name: string;
  age: number;
  email: string;
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
    LocalDatabase.CreateUser(this); // Comportamiento común
  }
}
```

**Beneficios:**
- Reutilización de código común
- Estructura consistente entre diferentes tipos de usuarios
- Facilita el mantenimiento y extensibilidad

### 3. Factory Pattern (Implícito)
**Implementado en:** Métodos de creación de `LocalDatabase`

Aunque no es un Factory explícito, los métodos `CreateAdmin()`, `CreateInspector()`, `CreateLocation()` actúan como factories simples para la creación y registro de objetos.

```typescript
public static CreateAdmin(admin: Admin) {
  LocalDatabase.admins.push(admin);
}

public static CreateInspector(inspector: Inspector) {
  LocalDatabase.inspectors.push(inspector);
}
```

**Beneficios:**
- Centraliza la lógica de creación de objetos
- Facilita el seguimiento y gestión de instancias
- Proporciona un punto único de control para la persistencia

### 4. Repository Pattern
**Implementado en:** `LocalDatabase`

La clase `LocalDatabase` actúa como un repositorio que abstrae el acceso a los datos, proporcionando métodos para crear y recuperar diferentes tipos de entidades.

```typescript
public static GetLocations() {
  return LocalDatabase.locations;
}

public static GetUsers() {
  return LocalDatabase.users;
}
```

**Beneficios:**
- Separa la lógica de acceso a datos de la lógica de negocio
- Facilita el testing y el cambio de implementación de persistencia
- Proporciona una interfaz limpia para operaciones CRUD

## 🔧 Clases y Componentes

### Clase Abstracta: User

**Archivo:** `src/abstract/User.class.ts`

Clase base abstracta que define la estructura común para todos los usuarios del sistema.

**Propiedades:**
- `name: string` - Nombre del usuario
- `age: number` - Edad del usuario
- `email: string` - Email del usuario

**Funcionalidad:**
- Se registra automáticamente en la base de datos al crear una instancia

### Clases Principales

#### Admin
**Archivo:** `src/mainclasses/Admin.class.ts`

Extiende de la clase `User` y proporciona funcionalidades administrativas.

**Métodos:**
- `createLocation(location: Location)` - Crea una nueva ubicación
- `obtenerUbicaciones(): Location[]` - Obtiene todas las ubicaciones

#### Inspector
**Archivo:** `src/mainclasses/Inspector.class.ts`

Extiende de la clase `User` para representar inspectores en el sistema.

#### Location
**Archivo:** `src/mainclasses/Location.class.ts`

Representa una ubicación en el sistema.

**Propiedades:**
- `name: string` - Nombre de la ubicación
- `coordinates: string` - Coordenadas de la ubicación
- `status: Status` - Estado de la ubicación (activa/inactiva)

### Enumeraciones

#### Status
**Archivo:** `src/enum/status.enum.ts`

Define los posibles estados de una ubicación:
- `Active = "active"` - Ubicación activa
- `Inactive = "inactive"` - Ubicación inactiva

### Base de Datos Local

**Archivo:** `src/db/local.database.ts`

Implementa el patrón Singleton para gestionar datos en memoria.

**Métodos disponibles:**
- `CreateAdmin(admin: Admin)` - Registra un administrador
- `CreateInspector(inspector: Inspector)` - Registra un inspector
- `CreateLocation(location: Location)` - Registra una ubicación
- `CreateUser(user: User)` - Registra un usuario
- `GetLocations()` - Obtiene todas las ubicaciones
- `GetUsers()` - Obtiene todos los usuarios
- `GetAdmins()` - Obtiene todos los administradores
- `GetInspectors()` - Obtiene todos los inspectores

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm

### Instalación

1. Clona o descarga el proyecto
2. Instala las dependencias:
   ```bash
   npm install
   ```

### Scripts Disponibles

```bash
# Compilar el proyecto TypeScript
npm run build

# Ejecutar el proyecto compilado
npm start

# Ejecutar en modo desarrollo (sin compilar)
npm run dev

# Compilación automática al detectar cambios
npm run watch
```

### Ejemplo de Uso

El archivo `src/index.ts` contiene un ejemplo de uso del sistema:

```typescript
import { LocalDatabase } from "./db/local.database";
import { Admin } from "./mainclasses/Admin.class";
import { Inspector } from "./mainclasses/Inspector.class";
import { Location } from "./mainclasses/Location.class";

function main(): void {
  // Crear un administrador
  const admin = new Admin("Carlos", 25, "carlos@ejemplo.com");
  
  // Crear una ubicación
  const location = new Location("Ubicación 1", "Descripción 1");
  
  // Crear un inspector
  const inspector = new Inspector("Carlos", 25, "carlos@ejemplo.com");
  
  // Obtener datos
  const locations = admin.obtenerUbicaciones();
  const users = LocalDatabase.GetUsers();
  
  console.log(locations);
  console.log(users);
}
```

## 🛠️ Tecnologías Utilizadas

- **TypeScript 5.0+** - Lenguaje principal
- **Node.js** - Runtime de JavaScript
- **ts-node** - Ejecución directa de TypeScript
- **@types/node** - Tipos de Node.js

## 📝 Configuración

### TypeScript (tsconfig.json)
- Target: ES2020
- Module: CommonJS
- Strict mode habilitado
- Source maps y declaraciones habilitadas
- Salida en carpeta `dist/`

## 🔄 Flujo de Trabajo

1. **Desarrollo**: Modifica archivos en `src/`
2. **Pruebas**: Ejecuta `npm run dev` para probar cambios
3. **Compilación**: Ejecuta `npm run build` para compilar
4. **Producción**: Ejecuta `npm start` para ejecutar la versión compilada

## 📂 Archivos de Configuración

- `package.json` - Configuración del proyecto y dependencias
- `tsconfig.json` - Configuración de TypeScript
- `.gitignore` - Archivos ignorados por Git (incluye `dist/`)

## 🤝 Contribución

Para contribuir al proyecto:
1. Mantén la estructura de carpetas existente
2. Sigue las convenciones de nomenclatura TypeScript
3. Asegúrate de que el código compile sin errores
4. Prueba los cambios antes de hacer commit

## 📄 Licencia

Este proyecto está bajo la licencia MIT.