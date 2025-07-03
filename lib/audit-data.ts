// --- Tipos de Datos (puedes exportarlos para usarlos en otros lugares) ---
export interface AuditData {
  // --- Campos Originales ---
  reportId: string;
  logo: string;
  projectName: string;
  projectTicker: string;
  client: string;
  projectType: string;
  releaseDate: string;
  auditFirm: string;
  leadAuditor: string;
  commitHash: string;
  id: string;
  name: string;
  description: string;
  auditDate: string;
  tvl: string;
  status: string;
  findings: number;
  severity: string;
  blockchain: string;
  contractAddress: string;
  website?: string;
  twitter?: string;

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

  vulnerabilities?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };

  keyFindings: { id: string; description: string; severity: string; status: string; }[];
  verificationPoints: { feature: string; status: string; description: string; }[];
  architecturalStrengths: { title: string; description: string; }[];
  
  tokenDetails?: {
    symbol: string;
    totalSupply: string;
    decimals: number;
    currentPrice?: number;
    marketCap?: string;
    volume24h?: string;
    change24h?: number;
  };

  auditScope?: string[];
  
  auditSummary?: {
    linesOfCode: number;
    filesAudited: number;
    auditDuration: string;
    methodology: string[];
    tools: string[];
  };

  securityFeatures?: {
    accessControl: string;
    upgradeability: string;
    pausability: boolean;
    timelock: boolean;
    multisig: boolean;
  };

  recommendations?: string[];
  
  gasOptimization?: {
    before: number;
    after: number;
    savings: number;
  } | null;

  // --- NUEVOS CAMPOS (antes hardcodeados) ---
  
  auditHash: string;

  codeQuality?: {
    coverage: number;
    documentation: 'Excelente' | 'Buena' | 'Regular' | 'Pobre';
    bestPractices: 'Seguidas' | 'Parcialmente Seguidas' | 'No Seguidas';
    gasEfficiency: 'Optimizado' | 'Mejorable' | 'No Optimizado';
  };

  securityTimeline?: {
    phase: 'Initial' | 'Analysis' | 'Review' | 'Final';
    score: number;
  }[];
}

// --- Base de Datos Local (Mock) ---
export const audits: AuditData[] = [
  {
    "reportId": "QG-AETL-20250624",
    "logo": "https://www.vetawallet.com/_next/image?url=%2Foknd.png&w=128&q=75",
    "projectName": "Aethelred Ledger",
    "projectTicker": "AETL",
    "client": "Aethelred Labs Inc.",
    "projectType": "Blockchain L1 (Proof of Staked Authority)",
    "releaseDate": "24 de junio de 2025",
    "auditFirm": "QuantumGuard Audits",
    "leadAuditor": "Dra. Evelyn Reed",
    "commitHash": "f4b2e1a0d864c9a5b7d3f8e2c1a09b3d4e5f6a7b",
    "id": "QG-AETL-20250624",
    "name": "Aethelred Ledger",
    "description": "Una blockchain de capa 1 de alto rendimiento diseñada para finanzas descentralizadas (DeFi) y activos del mundo real (RWA).",
    "auditDate": "2025-06-24T00:00:00.000Z",
    "tvl": "$1,200,000,000",
    "status": "Completed",
    "findings": 7,
    "severity": "Baja",
    "blockchain": "Aethelred Mainnet (EVM)",
    "contractAddress": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "website": "https://aethelred.io",
    "twitter": "https://twitter.com/AethelredLedger",
    "auditHash": "f4b2e1a0d864c9a5b7d3f8e2c1a09b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h",
    "verdict": {
      "title": "EXCELENTE / GRADO DE INVERSIÓN",
      "grade": "A+",
      "score": 98.5,
      "summary": "La arquitectura demuestra una madurez técnica y un compromiso con la seguridad excepcionales. La implementación es robusta y el código sigue las mejores prácticas."
    },
    "findingsSummary": { "critical": 0, "high": 0, "medium": 0, "low": 2, "informational": 5 },
    "keyFindings": [
      { "id": "L-01", "description": "Optimización menor de gas en la función de retiro de stake", "severity": "Baja", "status": "Reconocido" },
      { "id": "L-02", "description": "Redundancia en la emisión de eventos para la elección de validadores", "severity": "Baja", "status": "Reconocido" }
    ],
    "verificationPoints": [
      { "feature": "Contrato de Staking y Delegación", "status": "Seguro", "description": "No se encontraron vulnerabilidades. Fondos protegidos." },
      { "feature": "Elección de Validadores", "status": "Verificado", "description": "Proceso on-chain transparente y resistente a manipulación." }
    ],
    "architecturalStrengths": [
      { "title": "Cobertura de Pruebas Ejemplar", "description": "El proyecto cuenta con una cobertura de pruebas superior al 99%, complementada con pruebas de fuzzing." },
      { "title": "Verificación Formal Aplicada", "description": "Los contratos de Staking y Gobernanza fueron sometidos a un proceso de verificación formal." }
    ],
    "tokenDetails": { "symbol": "AETL", "totalSupply": "1,000,000,000", "decimals": 18, "currentPrice": 1.25, "marketCap": "$1,250,000,000", "volume24h": "$45,000,000", "change24h": 7.8 },
    "auditScope": ["Análisis del White Paper", "Auditoría completa de los contratos de Staking", "Revisión de la lógica del consenso PoSA", "Pruebas de penetración"],
    "vulnerabilities": { "critical": 0, "high": 0, "medium": 0, "low": 2 },
    "auditSummary": { "linesOfCode": 5230, "filesAudited": 42, "auditDuration": "6 semanas", "methodology": ["Análisis Estático", "Revisión Manual", "Fuzzing", "Verificación Formal"], "tools": ["Foundry", "Hardhat", "Certora Prover"] },
    "securityFeatures": { "accessControl": "Role-Based Access Control (RBAC) robusto", "upgradeability": "Proxy Transparente (UUPS)", "pausability": true, "timelock": true, "multisig": true },
    "recommendations": ["Implementar un programa de bug bounty más agresivo.", "Publicar guías de integración técnica detalladas.", "Considerar la creación de un fondo de seguro para stakers."],
    "gasOptimization": { "before": 150000, "after": 125000, "savings": 16.6 },
    "codeQuality": { "coverage": 99, "documentation": "Excelente", "bestPractices": "Seguidas", "gasEfficiency": "Optimizado" },
    "securityTimeline": [
      { "phase": "Initial", "score": 85 },
      { "phase": "Analysis", "score": 92 },
      { "phase": "Review", "score": 96 },
      { "phase": "Final", "score": 98.5 }
    ]
  },

  {
    "reportId": "SENTINEL-OMDB-20250702-FINAL",
    "logo": "https://omdblockchain.com/wp-content/uploads/2025/05/cropped-OMDBlockchain-180x180.png",
    "projectName": "OMDB Blockchain",
    "projectTicker": "OMDB",
    "client": "OneMillionsDollar.com LLC",
    "projectType": "Blockchain L1 (Proof of Staked Authority)",
    "releaseDate": "2 de julio de 2025",
    "auditFirm": "Sentinel AI",
    "leadAuditor": "Equipo de Análisis Arquitectónico",
    "commitHash": "c1a2b3d4e5f67890a1b2c3d4e5f67890a1b2c3d4",
    "id": "SENTINEL-OMDB-20250702-FINAL",
    "name": "OMDB Blockchain",
    "description": "Una blockchain L1 con un diseño arquitectónico maduro que ha sido exitosamente estabilizado y validado, alineando la implementación con su visión de producto.",
    "auditDate": "2025-07-02T00:00:00.000Z",
    "tvl": "$50,000,000",
    "status": "Completed",
    "findings": 4,
    "severity": "Baja",
    "blockchain": "OMDBlockchain",
    "contractAddress": "N/A (Capa 1)",
    "website": "https://onemillionsdollar.com",
    "twitter": "https://twitter.com/OMDBlockchain",
    "auditHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "verdict": {
      "title": "ARQUITECTURA ROBUSTA Y VALIDADA",
      "grade": "A",
      "score": 94,
      "summary": "Tras una revisión inicial que identificó áreas clave de mejora, el equipo de OMDB ha corregido exitosamente todos los hallazgos críticos y de alta prioridad. El núcleo del sistema es ahora estable, seguro y se alinea completamente con su avanzado diseño arquitectónico."
    },
    "findingsSummary": {
      "critical": 0,
      "high": 0,
      "medium": 0,
      "low": 2,
      "informational": 2
    },
    "keyFindings": [
      {
        "id": "C-01",
        "description": "Falla en el consenso PoSA donde el poder de voto ignoraba el 'stake' del validador[cite: 16, 17].",
        "severity": "Crítica",
        "status": "Corregido"
      },
      {
        "id": "H-01",
        "description": "El proceso de compilación era inestable y requería parches temporales[cite: 26, 27].",
        "severity": "Alta",
        "status": "Corregido"
      },
      {
        "id": "H-02",
        "description": "Los contratos precompilados de la EVM, como 'ecrecover', estaban incompletos[cite: 30, 31].",
        "severity": "Alta",
        "status": "Corregido"
      }
    ],
    "verificationPoints": [
      {
        "feature": "Consenso Proof of Staked Authority (PoSA)",
        "status": "Seguro y Funcional",
        "description": "La lógica del consenso fue corregida. El poder de voto ahora es proporcional al stake, operando según el modelo de seguridad diseñado[cite: 66]."
      },
      {
        "feature": "Proceso de Build y Despliegue",
        "status": "Estable y Confiable",
        "description": "Se ha refactorizado la capa de estado, permitiendo un proceso de compilación nativo y directo sin necesidad de scripts de corrección[cite: 67]."
      }
    ],
    "architecturalStrengths": [
      {
        "title": "Planificación Operacional (DevOps) de Alto Nivel",
        "description": "La configuración para producción, que incluye un stack de monitoreo completo y contenerización, es robusta y está lista para el despliegue[cite: 59]."
      },
      {
        "title": "Diseño Avanzado de Componentes",
        "description": "El diseño conceptual del servidor RPC seguro, el motor de precios EIP-1559 y los modelos de seguridad P2P son teóricamente muy completos[cite: 60]."
      },
      {
        "title": "Adopción de Patrones Probados",
        "description": "La arquitectura se basa en go-ethereum, lo que representa una base de diseño sólida y bien entendida en la industria[cite: 61]."
      }
    ],
    "tokenDetails": {
      "symbol": "OMDB",
      "totalSupply": "2,000,000,000 (Fijo)",
      "decimals": 18,
      "currentPrice": 0.05,
      "marketCap": "$100,000,000",
      "volume24h": "$2,500,000",
      "change24h": 4.2
    },
    "auditScope": [
      "Conjunto completo de archivos de código fuente Go [cite: 2]",
      "Archivos de configuración YAML [cite: 2]",
      "Scripts de Docker y Shell [cite: 2]",
      "Archivos de inicialización (genesis.json) [cite: 2]"
    ],
    "vulnerabilities": {
      "critical": 0,
      "high": 0,
      "medium": 0,
      "low": 2
    },
    "auditSummary": {
      "linesOfCode": 15500,
      "filesAudited": 160,
      "auditDuration": "4 semanas",
      "methodology": [
        "Revisión Manual de Código",
        "Análisis Arquitectónico",
        "Pruebas de Integración"
      ],
      "tools": [
        "Go Static Analyzer",
        "Docker Compose",
        "Suite de Pruebas Personalizada"
      ]
    },
    "securityFeatures": {
      "accessControl": "Modelo de validadores PoSA con rotación",
      "upgradeability": "Gestionado a través de Hard Forks coordinados",
      "pausability": false,
      "timelock": false,
      "multisig": true
    },
    "recommendations": [
      "Implementar un programa de recompensas por errores (Bug Bounty) para fomentar la revisión continua por parte de la comunidad.",
      "Expandir el conjunto de validadores para aumentar la descentralización de la red[cite: 51].",
      "Desarrollar documentación técnica exhaustiva para desarrolladores de dApps que deseen construir sobre OMDB."
    ],
    "gasOptimization": { "before": 210000, "after": 185000, "savings": 11.9 },
    "codeQuality": {
      "coverage": 95,
      "documentation": "Buena",
      "bestPractices": "Seguidas",
      "gasEfficiency": "Optimizado"
    },
    "securityTimeline": [
      { "phase": "Initial", "score": 65 },
      { "phase": "Analysis", "score": 75 },
      { "phase": "Review", "score": 88 },
      { "phase": "Final", "score": 94 }
    ]
  },
  {
    "reportId": "CT-ZEND-20250515",
    "logo": "https://static.vecteezy.com/system/resources/thumbnails/050/779/369/small/golden-coin-shining-isolated-on-transparent-background-cutout-png.png",
    "projectName": "Zenith Lend",
    "projectTicker": "ZLEND",
    "client": "Zenith Finance Labs",
    "projectType": "Protocolo de Préstamos Descentralizado (DeFi)",
    "releaseDate": "15 de mayo de 2025",
    "auditFirm": "CypherTrace Security",
    "leadAuditor": "Kenji Tanaka",
    "commitHash": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0",
    "id": "CT-ZEND-20250515",
    "name": "Zenith Lend",
    "description": "Un mercado monetario algorítmico en Arbitrum que permite a los usuarios prestar y tomar prestados activos cripto.",
    "auditDate": "2025-05-15T00:00:00.000Z",
    "tvl": "$250,000,000",
    "status": "Completed",
    "findings": 13,
    "severity": "Alta",
    "blockchain": "Arbitrum One",
    "contractAddress": "0x1234567890123456789012345678901234567890",
    "website": "https://zenith-lend.finance",
    "twitter": "https://twitter.com/ZenithLend",
    "auditHash": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0a1b2c3d4e5f6a7b8c9d0e1f2",
    "verdict": { "title": "SEGURO CON RECOMENDACIONES", "grade": "B+", "score": 88.0, "summary": "Protocolo robusto que sigue las mejores prácticas DeFi. Un hallazgo de alta severidad fue mitigado exitosamente. Se recomiendan mejoras en la automatización de pruebas." },
    "findingsSummary": { "critical": 0, "high": 1, "medium": 3, "low": 5, "informational": 4 },
    "keyFindings": [
      { "id": "H-01", "description": "Posible manipulación del oráculo de precios bajo condiciones de extrema volatilidad y baja liquidez.", "severity": "Alta", "status": "Mitigado" },
      { "id": "M-01", "description": "La función de liquidación puede ser ineficiente en gas durante congestión de red.", "severity": "Media", "status": "Reconocido" }
    ],
    "verificationPoints": [
      { "feature": "Manejo de Colateral", "status": "Verificado", "description": "Los fondos de los usuarios están segregados y seguros." },
      { "feature": "Lógica de Préstamos", "status": "Seguro", "description": "Los cálculos de interés y salud del préstamo son correctos." }
    ],
    "architecturalStrengths": [{ "title": "Modelo de Gobernanza Claro", "description": "La transición de poder de los administradores a una DAO está bien definida." }],
    "tokenDetails": { "symbol": "ZLEND", "totalSupply": "100,000,000", "decimals": 18, "currentPrice": 4.50, "marketCap": "$450,000,000", "volume24h": "$12,000,000", "change24h": 3.1 },
    "auditScope": ["Contratos de Core Lending Pool", "Contrato de Staking", "Sistema de Oráculos"],
    "vulnerabilities": { "critical": 0, "high": 1, "medium": 3, "low": 5 },
    "auditSummary": { "linesOfCode": 3100, "filesAudited": 25, "auditDuration": "4 semanas", "methodology": ["Revisión Manual", "Análisis Estático", "Fuzzing"], "tools": ["Slither", "Echidna", "Foundry"] },
    "securityFeatures": { "accessControl": "Gobernanza con Timelock", "upgradeability": "Proxy UUPS", "pausability": true, "timelock": true, "multisig": true },
    "recommendations": ["Expandir la suite de pruebas de simulación de mercado", "Implementar un programa de Bug Bounty formal."],
    "gasOptimization": { "before": 210000, "after": 185000, "savings": 11.9 },
    "codeQuality": { "coverage": 95, "documentation": "Buena", "bestPractices": "Seguidas", "gasEfficiency": "Mejorable" },
    "securityTimeline": [
      { "phase": "Initial", "score": 70 },
      { "phase": "Analysis", "score": 80 },
      { "phase": "Review", "score": 85 },
      { "phase": "Final", "score": 88.0 }
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