// --- 1. Definición de la Interfaz ---
// Se define primero para que pueda ser utilizada en todo el archivo.
export interface AuditData {
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
  status: "Completed" | "In Progress" | "Pending";
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

// --- 2. Base de Datos Local (Mock) ---
// Se utiliza la interfaz AuditData para asegurar que todos los objetos cumplen con la estructura.
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
    "description": "Una blockchain de capa 1 de alto rendimiento diseñada para DeFi y RWA.",
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
    "verdict": { "title": "EXCELENTE / GRADO DE INVERSIÓN", "grade": "A+", "score": 98.5, "summary": "Arquitectura con madurez técnica y seguridad excepcionales. La implementación PoSA es robusta y el código sigue las mejores prácticas." },
    "findingsSummary": { "critical": 0, "high": 0, "medium": 0, "low": 2, "informational": 5 },
    "keyFindings": [
      { "id": "L-01", "description": "Optimización menor de gas en la función de retiro de stake.", "severity": "Baja", "status": "Reconocido" },
      { "id": "L-02", "description": "Redundancia en la emisión de eventos para la elección de validadores.", "severity": "Baja", "status": "Reconocido" }
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
    "auditScope": ["Análisis del White Paper", "Auditoría de contratos de Staking", "Revisión del consenso PoSA", "Pruebas de penetración"],
    "vulnerabilities": { "critical": 0, "high": 0, "medium": 0, "low": 2 },
    "auditSummary": { "linesOfCode": 5230, "filesAudited": 42, "auditDuration": "6 semanas", "methodology": ["Análisis Estático", "Revisión Manual", "Fuzzing", "Verificación Formal"], "tools": ["Foundry", "Hardhat", "Certora Prover"] },
    "securityFeatures": { "accessControl": "Role-Based Access Control (RBAC) robusto", "upgradeability": "Proxy Transparente (UUPS)", "pausability": true, "timelock": true, "multisig": true },
    "recommendations": ["Implementar un programa de bug bounty más agresivo.", "Publicar guías de integración técnica detalladas."],
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
    "reportId": "SENTINEL-OMDB-20250706-FINAL",
    "logo": "https://omdblockchain.com/wp-content/uploads/2025/05/cropped-OMDBlockchain-180x180.png",
    "projectName": "OMDB Blockchain",
    "projectTicker": "OMDB",
    "client": "OneMillionsDollar.com LLC",
    "projectType": "Blockchain L1 (Proof of Staked Authority)",
    "releaseDate": "6 de julio de 2025",
    "auditFirm": "Sentinel AI",
    "leadAuditor": "Análisis de IA Avanzado",
    "commitHash": "No proporcionado",
    "id": "SENTINEL-OMDB-20250706-FINAL",
    "name": "OMDB Blockchain",
    "description": "Una blockchain de Capa 1 con una arquitectura de consenso y red P2P de nivel profesional, diseñada para alta seguridad y rendimiento.",
    "auditDate": "2025-07-06T00:00:00.000Z",
    "tvl": "$0 (No aplica)",
    "status": "Completed",
    "findings": 12,
    "severity": "Alta",
    "blockchain": "Custom Go-Ethereum Fork (PoSA)",
    "contractAddress": "N/A (Capa 1)",
    "website": "https://onemillionsdollar.com",
    "twitter": "https://twitter.com/OMDBlockchain",
    "verdict": {
      "title": "ARQUITECTURA SÓLIDA CON RIESGOS CRÍTICOS DE IMPLEMENTACIÓN",
      "grade": "C+",
      "score": 78,
      "summary": "El proyecto demuestra una madurez teórica excepcional. Sin embargo, la implementación actual presenta brechas de seguridad críticas, como la falta de cifrado en la capa de transporte y una lógica de consenso incompleta, que deben ser abordadas antes de cualquier despliegue."
    },
    "findingsSummary": {
      "critical": 0,
      "high": 3,
      "medium": 4,
      "low": 2,
      "informational": 3
    },
    "vulnerabilities": {
      "critical": 0,
      "high": 3,
      "medium": 4,
      "low": 2
    },
    "keyFindings": [
      {
        "id": "H-01",
        "description": "Falta de Cifrado en la Capa de Transporte (RLPx): La comunicación entre nodos no está cifrada, exponiendo todo el tráfico a espionaje y manipulación.",
        "severity": "Crítica",
        "status": "Pendiente de Mitigación"
      },
      {
        "id": "H-02",
        "description": "Mecanismo de Detección de Doble Voto Deshabilitado: El código para penalizar a los validadores que firman dos bloques a la misma altura está comentado.",
        "severity": "Alta",
        "status": "Pendiente de Mitigación"
      },
      {
        "id": "H-03",
        "description": "Selección de Proponente Predecible: El proponente de cada bloque se elige mediante un simple round-robin, lo que permite dirigir ataques de DDoS.",
        "severity": "Alta",
        "status": "Pendiente de Mitigación"
      }
    ],
    "verificationPoints": [
      {
        "feature": "Modelo de Consenso PoSA",
        "status": "Verificado",
        "description": "El diseño del consenso aborda correctamente las debilidades de un PoA puro al introducir capital en riesgo (stake) y penalizaciones automáticas (slashing)."
      },
      {
        "feature": "Arquitectura de Seguridad P2P",
        "status": "Verificado",
        "description": "El diseño de la capa de red es de nivel profesional, contemplando defensas adaptativas, análisis de comportamiento y respuestas graduadas ante amenazas."
      },
      {
        "feature": "Sistema de Reputación de Pares",
        "status": "Verificado",
        "description": "La concepción del ReputationEngine es avanzada, utilizando un modelo multifactorial, decaimiento de puntuación y un sistema de recuperación para gestionar la confianza."
      }
    ],
    "architecturalStrengths": [
      {
        "title": "Diseño Modular y Extensible",
        "description": "El código está bien estructurado, separando la gestión de pares, la seguridad, el consenso y la lógica de la aplicación, lo que facilita futuras mejoras y auditorías."
      },
      {
        "title": "Modelo de Incentivos Económicos",
        "description": "El sistema de recompensas dual (por bloque y por staking) incentiva la participación honesta y la seguridad de toda la red."
      },
      {
        "title": "Rotación de Validadores",
        "description": "El diseño incluye un mecanismo para rotar validadores basado en rendimiento, promoviendo la descentralización y la salud de la red a largo plazo."
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
      "Lógica de Consenso y Ciclo de Vida de Validadores (PoSA)",
      "Protocolos de Red y Comunicación P2P (Discovery, Sync, Broadcast)",
      "Mecanismos de Seguridad y Sistema de Reputación (DDoS, Detección de Ataques)",
      "Punto de Entrada y Configuración del Nodo"
    ],
    "auditSummary": {
      "linesOfCode": 5500,
      "filesAudited": 15,
      "auditDuration": "2 días",
      "methodology": [
        "Análisis Estático de Código Go",
        "Revisión Manual de Arquitectura de Consenso y Red P2P",
        "Evaluación de Lógica de Seguridad y Criptografía"
      ],
      "tools": [
        "Análisis de IA de Sentinel",
        "Revisión de Código Manual"
      ]
    },
    "securityFeatures": {
      "accessControl": "Modelo de validadores PoSA con rotación",
      "upgradeability": "Gestionado vía Hard Forks",
      "pausability": false,
      "timelock": false,
      "multisig": true
    },
    "recommendations": [
      "Implementar cifrado de transporte (RLPx) de forma inmediata para proteger toda la comunicación entre nodos.",
      "Completar y habilitar la lógica de detección y penalización de doble voto en el motor de consenso.",
      "Reemplazar la selección de proponente de bloque predecible con un algoritmo ponderado y seudoaleatorio.",
      "Implementar la lógica funcional dentro de los módulos de seguridad P2P (DDoS, detección de ataques)."
    ],
    "gasOptimization": null,
    "auditHash": "f9a6e3b5a1c3d1b7e4a1c5d9e2f4a3b7c8d0e2f1a3b4c5d6e7f8g9h0i1j2k3l4",
    "codeQuality": {
      "coverage": 0,
      "documentation": "Buena",
      "bestPractices": "Parcialmente Seguidas",
      "gasEfficiency": "No Optimizado"
    },
    "securityTimeline": [
      {
        "phase": "Initial",
        "score": 68
      },
      {
        "phase": "Review",
        "score": 78
      },
      {
        "phase": "Final",
        "score": 78
      }
    ]
  },
  {
    "reportId": "CT-ZEND-20250515",
    "logo": "https://static.vecteezy.com/system/resources/thumbnails/050/779/369/small/golden-coin-shining-isolated-on-transparent-background-cutout-png.png",
    "projectName": "Zenith Lend",
    "projectTicker": "ZLEND",
    "client": "Zenith Finance Labs",
    "projectType": "Protocolo de Préstamos (DeFi)",
    "releaseDate": "15 de mayo de 2025",
    "auditFirm": "CypherTrace Security",
    "leadAuditor": "Kenji Tanaka",
    "commitHash": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0",
    "id": "CT-ZEND-20250515",
    "name": "Zenith Lend",
    "description": "Un mercado monetario algorítmico en Arbitrum para prestar y tomar prestados activos cripto.",
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
    "verdict": { "title": "SEGURO CON RECOMENDACIONES", "grade": "B+", "score": 88.0, "summary": "Protocolo robusto que sigue las mejores prácticas DeFi. Un hallazgo de alta severidad fue mitigado exitosamente." },
    "findingsSummary": { "critical": 0, "high": 1, "medium": 3, "low": 5, "informational": 4 },
    "keyFindings": [ { "id": "H-01", "description": "Posible manipulación del oráculo de precios bajo condiciones de extrema volatilidad.", "severity": "Alta", "status": "Mitigado" }, { "id": "M-01", "description": "La función de liquidación puede ser ineficiente en gas durante congestión de red.", "severity": "Media", "status": "Reconocido" } ],
    "verificationPoints": [ { "feature": "Manejo de Colateral", "status": "Verificado", "description": "Los fondos de los usuarios están segregados y seguros." }, { "feature": "Lógica de Préstamos", "status": "Seguro", "description": "Los cálculos de interés son correctos." } ],
    "architecturalStrengths": [{ "title": "Modelo de Gobernanza Claro", "description": "La transición de poder de los administradores a una DAO está bien definida." }],
    "tokenDetails": { "symbol": "ZLEND", "totalSupply": "100,000,000", "decimals": 18, "currentPrice": 4.50, "marketCap": "$450,000,000", "volume24h": "$12,000,000", "change24h": 3.1 },
    "auditScope": ["Contratos de Core Lending Pool", "Contrato de Staking", "Sistema de Oráculos"],
    "vulnerabilities": { "critical": 0, "high": 1, "medium": 3, "low": 5 },
    "auditSummary": { "linesOfCode": 3100, "filesAudited": 25, "auditDuration": "4 semanas", "methodology": ["Revisión Manual", "Análisis Estático", "Fuzzing"], "tools": ["Slither", "Echidna", "Foundry"] },
    "securityFeatures": { "accessControl": "Gobernanza con Timelock", "upgradeability": "Proxy UUPS", "pausability": true, "timelock": true, "multisig": true },
    "recommendations": ["Expandir la suite de pruebas de simulación de mercado", "Implementar un programa de Bug Bounty formal."],
    "gasOptimization": { "before": 210000, "after": 185000, "savings": 11.9 },
    "codeQuality": { "coverage": 95, "documentation": "Buena", "bestPractices": "Seguidas", "gasEfficiency": "Mejorable" },
    "securityTimeline": [ { "phase": "Initial", "score": 70 }, { "phase": "Analysis", "score": 80 }, { "phase": "Review", "score": 85 }, { "phase": "Final", "score": 88.0 } ]
  }
];


// --- 3. Funciones de Acceso a Datos ---
/**
 * Función para obtener datos de auditoría por ID.
 */
export function getAuditById(id: string): AuditData | undefined {
  return audits.find(a => a.reportId === id);
}

/**
 * Función para obtener la lista completa de auditorías.
 */
export function getAllAudits(): AuditData[] {
  return audits;
}