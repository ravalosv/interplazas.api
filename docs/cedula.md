# Cédula Endpoints

Base URL: `/api/periodo`

Este recurso gestiona la generación y eliminación de Cédulas Inter-filiales. Las cédulas se calculan basándose en los servicios registrados en un periodo cerrado.

## Autenticación
Requiere Token JWT en Header `Authorization: Bearer <token>`.

## 1. Generar Cédulas
**POST** `/crear_cedulas`

Genera las cédulas para un periodo (año y mes) específico.
**Requisitos:**
- El periodo debe existir.
- El periodo debe estar **cerrado** (`activo: false`).
- No deben existir cédulas previamente generadas para ese periodo.

**Body (JSON):**
```json
{
  "anio": 2024,
  "mes": 12
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "periodoId": 12,
      "filialId": 5,
      "totalFavor": 15000.00,
      "totalPagar": 5000.00,
      "totalUsa": 0.00,
      "totalNeto": 10000.00,
      "detalles": [
        {
          "id": 1,
          "cedulaId": 1,
          "servicioId": 101,
          "tipo": "FAVOR",
          "monto": 5000.00,
          "filialOrigenId": 5,
          "filialOtorganteId": 2
        },
        {
          "id": 2,
          "cedulaId": 1,
          "servicioId": 102,
          "tipo": "PAGAR",
          "monto": 5000.00,
          "filialOrigenId": 2,
          "filialOtorganteId": 5
        }
      ]
    },
    {
      "id": 2,
      "periodoId": 12,
      "filialId": 2,
      "totalFavor": 5000.00,
      "totalPagar": 15000.00,
      "totalUsa": 0.00,
      "totalNeto": -10000.00,
      "detalles": [...]
    }
  ]
}
```

**Errores Comunes (400/500):**
- **400 Bad Request:** "Año y mes son requeridos."
- **500 Internal Server Error:**
  - "El periodo especificado no existe."
  - "El periodo debe estar cerrado para generar cédulas."
  - "Ya existen cédulas creadas para este periodo. Debe eliminarlas antes de volver a generarlas."

## 2. Eliminar Cédulas
**DELETE** `/eliminar_cedulas`

Elimina todas las cédulas asociadas a un periodo específico, permitiendo su regeneración.

**Body (JSON):**
```json
{
  "anio": 2024,
  "mes": 12
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Se eliminaron 5 cédulas del periodo 12/2024."
  }
}
```

**Errores Comunes (400/500):**
- **400 Bad Request:** "Año y mes son requeridos."
- **500 Internal Server Error:**
  - "El periodo especificado no existe."
  - "No se encontraron cédulas para eliminar en este periodo."
