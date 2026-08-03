## Context

Sitio ya tiene SEO técnico completo (Lighthouse SEO 100, Performance 94). El nombre "Luis Meyehen Paz" está en `<title>`, JSON-LD Person schema, footer copyright, y texto visible en neofetch card. Pero el texto visible está en un `<span class="neofetch-user">`, no en un elemento `<h1>`. Google usa H1 como señal principal para determinar el tema de la página. La competencia por el nombre es baja (nombre único), pero sin H1 la página pierde contra LinkedIn y GitHub que sí tienen heading semántico con el nombre.

## Goals / Non-Goals

**Goals:**
- Agregar `<h1>` semántico con "Luis Meyehen Paz" en la homepage
- Mantener el diseño visual del neofetch card sin cambios
- Documentar pasos para Google Search Console, Bing Webmaster Tools, y backlinks

**Non-Goals:**
- Cambiar diseño visual
- Agregar más contenido de texto
- Comprar dominio custom (opcional futuro)

## Decisions

### 1. Cambiar `<span class="neofetch-user">` a `<h1 class="neofetch-user">`

**Choice**: Modificar el elemento HTML de `<span>` a `<h1>`, conservando la misma clase CSS `.neofetch-user`.

**Alternatives considered**:
- H1 oculto con `sr-only`: Técnicamente funcional pero Google prefiere contenido visible. El neofetch-user YA es visible y prominente.
- Nuevo H1 arriba del neofetch card: Redundante, duplicaría el nombre en la página. Peor UX.
- Mantener span: Pierde la señal semántica más importante para SEO.

**Rationale**: `.neofetch-user` ya tiene estilos que se aplican vía clase, no vía selector de elemento. Cambiar la tag no afecta el CSS. Visualmente idéntico.

### 2. Google Search Console y Bing Webmaster Tools

Son pasos manuales que requieren verificación de propiedad del dominio. Sin esto, Google puede tardar semanas en indexar cambios. Con GSC, la indexación es inmediata (request indexing).

### 3. Backlinks desde perfiles existentes

LinkedIn y GitHub ya rankean alto para "Luis Meyehen Paz". Agregar un link desde esos perfiles hacia luisarg03.github.io transfiere autoridad. Es la forma más rápida de decirle a Google "esta es mi página oficial".

## Risks / Trade-offs

- **[CSS] El H1 hereda estilos de user-agent**: Los browsers aplican `font-weight: bold` y `font-size: 2em` por defecto a H1. La clase `.neofetch-user` ya define `font-weight: 600` explícitamente y hereda `font-size: var(--text-sm)` del contenedor `.neofetch-info`. No debería haber cambio visual si `.neofetch-user` tiene font-size explícito. Si no, agregar.
- **[Múltiples H1]**: Solo hay un H1 por página (homepage). Otras páginas (now, terminal) no usan Hero. Sin conflicto.
- **[GSC/Bing]**: Requieren acceso manual del usuario. No automatizable.

## Open Questions

- ¿Ya existe una cuenta de Google Search Console para luisarg03.github.io?
- ¿El usuario quiere comprar un dominio custom (luismeyehen.dev)? Mejoraría autoridad de dominio significativamente.
