# Agent Instructions: Domain Layer

Este paquete contiene la lógica de negocio pura de Stock Master B2B.

## 🧠 Contexto del Negocio (Business Context)

**Visión:** Plataforma B2B para distribuidoras que abastecen a bodegas/tiendas.
**Reglas Clave:**
1.  **Unidades Multi-nivel:** Los productos se manejan en unidad base (unidad) pero se venden en presentaciones (Caja x24, Docena x12).
2.  **Conversión Automática:** El stock se descuenta en unidad base, independientemente de cómo se venda.
3.  **Precios Volumétricos:** El precio cambia según la cantidad (Mayorista vs Minorista) y el tipo de Cliente (Bodega vs Supermercado).

## 🛠️ Reglas Técnicas (Technical Rules)

1.  **Framework:** Ninguno. Esto es TypeScript puro. No importar React, Angular, Express ni bases de datos aquí.
2.  **Estructura DDD:**
    - `entities/`: Objetos con identidad (Product, Order).
    - `value-objects/`: Objetos inmutables (Price, UnitOfMeasure).
    - `repositories/`: Interfaces (contratos), NO implementaciones.
    - `services/`: Lógica de dominio compleja.
3.  **Testing:** Usar `bun test`. Todo cambio de lógica debe tener test unitario.

## 📋 Comandos
- Test: `bun test`
- Build: `bun run build`

---

## 📊 Estado del Proyecto

**Última actualización:** 11-Feb-2026

### ✅ Completado
- Value Objects: `Money`, `UnitOfMeasure`, `Sku` (81 tests pasando)
- Estructura TDD con `bun:test`
- Validaciones de negocio implementadas

### 🚧 En Progreso
- Entity `Product` (pendiente implementar)

### 📋 Backlog
1. Entity `Product` con presentaciones y precio base
2. Domain Service: `PricingService` (cálculo por volumen)
3. Entity `Order` y `OrderLine`
4. Repository interfaces
