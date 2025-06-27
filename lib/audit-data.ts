// --- Tipos de Datos (puedes exportarlos para usarlos en otros lugares) ---
export interface AuditData {
    reportId: string;
    logo:string;
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
    logo: 'https://www.vetawallet.com/_next/image?url=%2Foknd.png&w=128&q=75',
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
  {
    reportId: 'SHARK-OMDB-20250609', // 
    logo: 'https://omdblockchain.com/wp-content/uploads/2025/05/cropped-OMDBlockchain-180x180.png',
    projectName: 'One Million Dollars Blockchain', // 
    projectTicker: 'OMDB', // 
    client: 'OneMillionsDollar.com LLC', // 
    projectType: 'Blockchain L1, White Paper, Ecosistema Web', // 
    releaseDate: '9 de junio de 2025', // 
    auditFirm: 'Shark Technology', // 
    leadAuditor: 'James Rodríguez', // 
    commitHash: 'ca1ca70240d4b49c629365f3c453bc1be5a3746d', // 
    verdict: {
        title: 'RIESGO EXTREMO', // 
        grade: 'F', // Interpretación basada en el veredicto
        score: 5.0, // Interpretación basada en la severidad general
        summary: 'Fallos de seguridad sistémicos, inconsistencias críticas entre la documentación y la implementación técnica, y un proceso de desarrollo que no cumple con los estándares mínimos de la industria.' // 
    },
    findingsSummary: {
        critical: 4, // 
        high: 4, // 
        medium: 3, // 
        low: 0,
        informational: 0,
    },
    keyFindings: [
      { id: 'C-01', description: 'Dificultad de Minado Estática y Trivial', severity: 'Crítica', status: 'Sin Mitigar' }, // 
      { id: 'C-02', description: 'Recálculo de Balances Inseguro (Permite Creación de Dinero)', severity: 'Crítica', status: 'Sin Mitigar' }, // 
      { id: 'C-03', description: 'Contradicción de Consenso (PoW declarado como PoS)', severity: 'Crítica', status: 'Sin Mitigar' }, // 
      { id: 'C-04', description: 'Contradicción de Modelo Económico (Inflacionario vs. Fijo)', severity: 'Crítica', status: 'Sin Mitigar' }, // 
      { id: 'H-01', description: 'Proceso de Desarrollo Inmaduro y Parches Manuales', severity: 'Alta', status: 'Sin Mitigar' }, // 
      { id: 'H-02', description: 'Errores Críticos en la API RPC (totalDifficulty es 0x0)', severity: 'Alta', status: 'Sin Mitigar' }, // 
      { id: 'H-03', description: 'Inconsistencia Crítica de ChainID (1337 vs 1881)', severity: 'Alta', status: 'Sin Mitigar' }, // 
      { id: 'H-04', description: 'API de Control Crítico sin Autenticación', severity: 'Alta', status: 'Sin Mitigar' }, // 
    ],
    // Para un informe negativo, usamos esta sección para las contradicciones
    verificationPoints: [
        { feature: 'Consenso Proof of Stake (PoS)', status: 'CONTRADICCIÓN', description: 'El white paper declara PoS, pero el código implementa Proof of Work (PoW).' }, // 
        { feature: 'Suministro Fijo de 2 Mil Millones', status: 'CONTRADICCIÓN', description: 'El modelo es inflacionario debido a recompensas por bloque; no hay un suministro fijo.' }, // 
        { feature: 'Red Descentralizada', status: 'CONTRADICCIÓN', description: 'La red es altamente centralizada debido a la dificultad de minado trivial y el uso de un AutoMiner.' }, // 
        { feature: 'Seguridad como Prioridad', status: 'CONTRADICCIÓN', description: 'El código muestra fallos de seguridad fundamentales, como bugs de firmas y corrupción de estado.' }, // 
        { feature: 'Basado en Binance Smart Chain (BSC)', status: 'ENGAÑOSO', description: 'El código es un fork de go-ethereum (Geth), no de BSC. La afirmación busca asociarse con una marca reconocida.' }, // 
        { feature: 'Gobernanza Descentralizada', status: 'ENGAÑOSO', description: 'La "gobernanza" descrita son reuniones privadas con el CEO, no un sistema on-chain.' }, // 
    ],
    // Para un informe negativo, usamos esta sección para las debilidades sistémicas
    architecturalStrengths: [ // Renombrado en el frontend como "Debilidades Sistémicas"
        { title: 'La Cascada de Parches: Un Núcleo Roto', description: 'La arquitectura es una serie de parches frágiles. El equipo no soluciona las causas raíz, sino que aplica soluciones temporales que incrementan el riesgo.' }, // 
        { title: 'Actividad Simulada en la Red', description: 'La actividad de la red no es orgánica, sino deliberadamente simulada por los desarrolladores para aparentar tracción.' }, // 
        { title: 'Vulnerabilidades Heredadas y Software Obsoleto', description: 'El proyecto es vulnerable a ataques conocidos debido a su base de software desactualizada (go-ethereum v1.10.16 y Go 1.18+).' }, // 
    ]
}
];

/**
 * Función compartida para obtener datos de auditoría por ID.
 * Esta función puede ser llamada directamente desde Server Components o Rutas de API.
 */
export function getAuditById(id: string): AuditData | undefined {
  return audits.find(a => a.reportId === id);
}

export function getAllAudits(): AuditData[] { // <-- Puedes añadir una función para obtener todos los proyectos si la necesitas
    return audits;
  }