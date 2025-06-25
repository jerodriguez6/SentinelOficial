// --- Tipos de Datos (puedes exportarlos para usarlos en otros lugares) ---
export interface AuditData {
    reportId: string;
    projectName: string;
    projectTicker: string;
    client: string;
    projectType: string;
    releaseDate: string;
    auditFirm: string;
    leadAuditor: string;
    commitHash: string;
    verdict: {
        title: string;
        grade: string;
        score: number;
        summary: string;
    };
    findingsSummary: {
        critical: number;
        high: number;
        medium: number;
        low: number;
        informational: number;
    };
    keyFindings: { id: string; description: string; severity: string; status: string; }[];
    verificationPoints: { feature: string; status: string; description: string; }[];
    architecturalStrengths: { title: string; description: string; }[];
}

// --- Base de Datos Local (Mock) ---
const audits: AuditData[] = [
  {
    reportId: 'QG-AETL-20250624',
    projectName: 'Aethelred Ledger',
    projectTicker: 'AETL',
    client: 'Aethelred Labs Inc.',
    projectType: 'Blockchain L1 (Proof of Staked Authority)',
    releaseDate: '24 de junio de 2025',
    auditFirm: 'QuantumGuard Audits',
    leadAuditor: 'Dra. Evelyn Reed',
    commitHash: 'f4b2e1a0d864c9a5b7d3f8e2c1a09b3d4e5f6a7b',
    verdict: {
        title: 'EXCELENTE / GRADO DE INVERSIÓN',
        grade: 'A+',
        score: 98.5,
        summary: 'La arquitectura de Aethelred Ledger demuestra una madurez técnica y un compromiso con la seguridad excepcionales. La implementación del consenso PoSA es robusta, el código es limpio y sigue las mejores prácticas.'
    },
    findingsSummary: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 2,
        informational: 5,
    },
    keyFindings: [
      { id: 'L-01', description: 'Optimización menor de gas en la función de retiro de stake', severity: 'Baja', status: 'Reconocido' },
      { id: 'L-02', description: 'Redundancia en la emisión de eventos para la elección de validadores', severity: 'Baja', status: 'Reconocido' },
      { id: 'I-01', description: 'Sugerencia para añadir ejemplos en la documentación de la API', severity: 'Informativo', status: 'Implementado' },
    ],
    verificationPoints: [
        { feature: 'Contrato de Staking y Delegación', status: 'Seguro', description: 'No se encontraron vulnerabilidades. Fondos protegidos.' },
        { feature: 'Elección de Validadores', status: 'Verificado', description: 'Proceso on-chain transparente y resistente a manipulación.' },
        { feature: 'Mecanismo de Slashing', status: 'Robusto', description: 'Implementado correctamente para penalizar a malos actores.' },
        { feature: 'Transición Segura de Épocas', status: 'Verificado', description: 'El cambio de set de validadores es atómico y seguro.' },
        { feature: 'Compatibilidad EVM Completa', status: 'Total', description: 'Cumple con todos los estándares para una integración sin fricciones.' },
    ],
    architecturalStrengths: [
        { title: 'Cobertura de Pruebas Exemplar', description: 'El proyecto cuenta con una cobertura de pruebas superior al 99%, complementada con pruebas de fuzzing.' },
        { title: 'Verificación Formal Aplicada', description: 'Los contratos de Staking y Gobernanza fueron sometidos a un proceso de verificación formal.' },
        { title: 'Programa de Bug Bounty Activo', description: 'El equipo mantiene un programa de recompensas por errores, demostrando un compromiso continuo con la seguridad.' },
    ]
  },
];

/**
 * Función compartida para obtener datos de auditoría por ID.
 * Esta función puede ser llamada directamente desde Server Components o Rutas de API.
 */
export function getAuditById(id: string): AuditData | undefined {
  return audits.find(a => a.reportId === id);
}