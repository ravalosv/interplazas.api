# Endpoint: Download Cuenta File

## Descripción
Este endpoint permite descargar un archivo de comprobante asociado a un registro de ingreso/egreso específico usando un token único y seguro.

## URL
```
GET /api/ingresosegresos/downloadCuentaFile/:token
```

## Parámetros
- `token` (string, requerido): Token único (UUID) del registro de IngresosEgresosModel

## Headers
- `Authorization`: Bearer token (JWT)
- Rol requerido: `admin`

## Respuesta Exitosa
- **Código**: 200
- **Tipo**: Descarga directa del archivo
- **Content-Type**: Depende del tipo de archivo (image/jpeg, application/pdf, etc.)

## Respuestas de Error

### 404 - Registro no encontrado
```json
{
  "error": "Registro no encontrado"
}
```

### 404 - Sin comprobante
```json
{
  "error": "No hay comprobante asociado a este registro"
}
```

### 404 - Archivo no encontrado
```json
{
  "error": "Archivo no encontrado en el sistema"
}
```

### 500 - Error del servidor
```json
{
  "error": "Error al descargar el archivo"
}
```

## Comportamiento del Sistema
1. Valida que el registro existe usando el token único proporcionado
2. Verifica que el registro tenga un comprobante asociado
3. Construye la ruta del archivo basada en el campo `comprobante`
4. Verifica que el archivo existe físicamente en el sistema
5. Inicia la descarga del archivo

## Seguridad
- Utiliza tokens UUID únicos en lugar de IDs numéricos secuenciales
- Los tokens son generados automáticamente al crear registros
- Previene ataques de enumeración de recursos
- Mantiene la privacidad de los archivos

## Ejemplo de uso

### cURL
```bash
curl -X GET "http://localhost:3165/api/ingresosegresos/downloadCuentaFile/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  --output "comprobante.pdf"
```

### JavaScript (Fetch)
```javascript
fetch('http://localhost:3165/api/ingresosegresos/downloadCuentaFile/550e8400-e29b-41d4-a716-446655440000', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
.then(response => {
  if (response.ok) {
    return response.blob();
  }
  throw new Error('Error al descargar el archivo');
})
.then(blob => {
  // Crear URL para descarga
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'comprobante.pdf';
  a.click();
});
```

## Flujo típico
1. El usuario obtiene la lista de ingresos/egresos
2. Identifica un registro que tiene comprobante (URL ya incluye el token)
3. Usa la URL completa proporcionada en el campo `comprobante`
4. Realiza la petición GET al endpoint
5. El archivo se descarga automáticamente

## Cambios de Seguridad
- **Antes**: `/api/ingresosegresos/downloadCuentaFile/123` (ID numérico predecible)
- **Ahora**: `/api/ingresosegresos/downloadCuentaFile/550e8400-e29b-41d4-a716-446655440000` (Token UUID único)

## Archivos relacionados
- `src/controller/ingresos_egresos.controller.ts` - Implementación del endpoint
- `src/services/ingreso_egreso.service.ts` - Lógica de negocio
- `src/routes/ingresosegresos.route.ts` - Definición de la ruta
- `src/data/models/models.ts` - Modelo IngresosEgresosModel con campo downloadToken
- `src/data/interfaces/ingresos_egresos.interface.ts` - Interfaz con campo downloadToken