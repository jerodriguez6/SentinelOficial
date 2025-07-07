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
  },
  {
    "reportId": "SAI-DEXC-20250715",
    "logo": "https://cdn-icons-png.flaticon.com/512/6001/6001211.png",
    "projectName": "DexCore Swap",
    "projectTicker": "DEXC",
    "client": "Core Finance Labs",
    "projectType": "DEX AMM",
    "releaseDate": "15 de julio de 2025",
    "auditFirm": "Sentinel AI",
    "leadAuditor": "Análisis de IA",
    "commitHash": "b3c8e7a2f9d1b4c6e0f8d2a1b5c8d3e7f9a2b4c6",
    "id": "SAI-DEXC-20250715",
    "name": "DexCore Swap",
    "description": "Un exchange descentralizado en Polygon con un modelo de comisiones dinámicas.",
    "auditDate": "2025-07-15T00:00:00.000Z",
    "tvl": "$8,200,000",
    "status": "Completed",
    "findings": 19,
    "severity": "Alta",
    "blockchain": "Polygon",
    "contractAddress": "0x8a3e4b28f1b9a6c0d7f2b1a5c9d6e4f1a2b3c4d5",
    "website": "https://dexcore.finance",
    "twitter": "https://twitter.com/DexCoreFinance",
    "auditHash": "a8f5e1b2c3d4e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1",
    "verdict": {
      "title": "PRECAUCIÓN: RIESGOS ALTOS DE CENTRALIZACIÓN",
      "grade": "C+",
      "score": 77.5,
      "summary": "La arquitectura del AMM es funcional, pero está opacada por riesgos severos de centralización. El propietario (una EOA) puede pausar todas las operaciones y modificar las comisiones de swap sin un timelock, presentando un riesgo para la confianza y los fondos de los usuarios."
    },
    "findingsSummary": { "critical": 0, "high": 2, "medium": 8, "low": 5, "informational": 4 },
    "keyFindings": [
      { "id": "H-01", "description": "Privilegios de propietario sin restricciones. La cuenta del propietario puede drenar unilateralmente las comisiones acumuladas y pausar el sistema.", "severity": "Alta", "status": "No Resuelto" },
      { "id": "H-02", "description": "El cálculo de comisiones dinámicas puede ser manipulado mediante flash loans para forzar tasas de intercambio desfavorables momentáneamente.", "severity": "Alta", "status": "Reconocido" }
    ],
    "verificationPoints": [
      { "feature": "Lógica de Swap", "status": "Verificado", "description": "Los intercambios de tokens se procesan correctamente según la fórmula del pool." },
      { "feature": "Gestión de Liquidez", "status": "Inseguro", "description": "Las funciones para añadir y quitar liquidez son vulnerables a la inflación de la primera aportación." }
    ],
    "architecturalStrengths": [
      { "title": "Optimización de Gas", "description": "El contrato de swap está bien optimizado para reducir los costos de transacción en la red Polygon." }
    ],
    "tokenDetails": { "symbol": "DEXC", "totalSupply": "250,000,000", "decimals": 18 },
    "auditScope": ["Contrato de Swap Pool", "Contrato de Staking de LP", "Contrato de Fábrica"],
    "auditSummary": { "linesOfCode": 1800, "filesAudited": 12, "auditDuration": "2 semanas", "methodology": ["Análisis Estático", "Revisión Manual", "Fuzzing"], "tools": ["Slither", "Foundry"] },
    "securityFeatures": { "accessControl": "Propietario único (EOA)", "upgradeability": "No actualizable", "pausability": true, "timelock": false, "multisig": false },
    "recommendations": ["Transferir la propiedad a un contrato Timelock o una DAO.", "Implementar contramedidas contra la manipulación por flash loans."],
    "gasOptimization": null,
    "codeQuality": { "coverage": 75, "documentation": "Regular", "bestPractices": "Parcialmente Seguidas", "gasEfficiency": "Optimizado" },
    "securityTimeline": [ { "phase": "Initial", "score": 79 }, { "phase": "Final", "score": 77.5 } ]
  },
  // Proyecto 2 (C)
  {
    "reportId": "SAI-NFTG-20250716",
    "logo": "https://cdn-icons-png.freepik.com/512/814/814435.png",
    "projectName": "Guardian NFT",
    "projectTicker": "GUARD",
    "client": "ArtBlock Protocol",
    "projectType": "Marketplace de NFT",
    "releaseDate": "16 de julio de 2025",
    "auditFirm": "Sentinel AI",
    "leadAuditor": "Análisis de IA",
    "commitHash": "c4d9f8b3g0e2c5d7f1g9e3b2c6d9e4g8h0b3d5d7",
    "id": "SAI-NFTG-20250716",
    "name": "Guardian NFT",
    "description": "Un marketplace para acuñar y comerciar NFTs con un mecanismo de subastas.",
    "auditDate": "2025-07-16T00:00:00.000Z",
    "tvl": "$1,500,000",
    "status": "Completed",
    "findings": 22,
    "severity": "Crítica",
    "blockchain": "Ethereum",
    "contractAddress": "0x9b4f5c39g2c0b7d1e8g3c2b6d0e5g2b3d5e8h1c4",
    "website": "https://guardian-nft.io",
    "twitter": "https://twitter.com/GuardianNFT",
    "auditHash": "d0e1f2a3b4c5d6e7f8g9h0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
    "verdict": {
      "title": "DÉBIL: FALLOS DE DISEÑO Y VULNERABILIDADES SIGNIFICATIVAS",
      "grade": "C",
      "score": 71.0,
      "summary": "El sistema presenta un fallo de diseño crítico en el sistema de subastas que permite a un atacante ganar cualquier subasta sin pagar el precio completo. La falta de validación en la firma de ofertas también compromete la fiabilidad del marketplace."
    },
    "findingsSummary": { "critical": 1, "high": 3, "medium": 7, "low": 8, "informational": 3 },
    "keyFindings": [
      { "id": "C-01", "description": "Vulnerabilidad de reentrada en la función de liquidación de subasta (claimAuction) permite a un postor malicioso reutilizar su puja.", "severity": "Crítica", "status": "Pendiente" },
      { "id": "H-01", "description": "Las ofertas fuera de la cadena (off-chain) no implementan protección contra repetición de firma (EIP-712), permitiendo ataques de replay.", "severity": "Alta", "status": "Pendiente" }
    ],
    "verificationPoints": [
      { "feature": "Acuñación de NFT", "status": "Verificado", "description": "La creación de nuevos NFTs sigue el estándar ERC-721." },
      { "feature": "Sistema de Subastas", "status": "Inseguro", "description": "La lógica de pujas y liquidación es fundamentalmente insegura." }
    ],
    "architecturalStrengths": [],
    "tokenDetails": { "symbol": "GUARD", "totalSupply": "1,000,000", "decimals": 18 },
    "auditScope": ["Contrato de Marketplace", "Contrato de Subastas", "Contrato de Acuñación"],
    "auditSummary": { "linesOfCode": 2500, "filesAudited": 15, "auditDuration": "3 semanas", "methodology": ["Revisión Manual", "Análisis Criptográfico"], "tools": ["Hardhat", "Mythril"] },
    "securityFeatures": { "accessControl": "Roles básicos", "upgradeability": "Proxy UUPS", "pausability": false, "timelock": false, "multisig": false },
    "recommendations": ["Rediseñar completamente el módulo de subastas.", "Implementar el estándar EIP-712 para las firmas de ofertas off-chain."],
    "gasOptimization": { "before": 350000, "after": 320000, "savings": 8.5 },
    "codeQuality": { "coverage": 60, "documentation": "Pobre", "bestPractices": "No Seguidas", "gasEfficiency": "Mejorable" },
    "securityTimeline": [ { "phase": "Initial", "score": 75 }, { "phase": "Final", "score": 71.0 } ]
  },
  // ... 8 proyectos más con estructura similar ...
  // Proyecto 3 (C)
  {
    "reportId": "SAI-LENDZ-20250717",
    "logo": "https://cdn.iconscout.com/icon/premium/png-256-thumb/lending-protocol-5623053-4687588.png",
    "projectName": "LendZ Protocol",
    "projectTicker": "LENDZ",
    "client": "DeFi Innovators",
    "projectType": "Protocolo de Préstamos",
    "releaseDate": "17 de julio de 2025",
    "auditFirm": "Sentinel AI",
    "leadAuditor": "Análisis de IA",
    "commitHash": "e6f1a2b3c4d5e7f8g9h0a1b2c3d4e5f6g7h8",
    "id": "SAI-LENDZ-20250717",
    "name": "LendZ Protocol",
    "description": "Un protocolo de préstamos descentralizado que utiliza un oráculo de precios personalizado.",
    "auditDate": "2025-07-17T00:00:00.000Z",
    "tvl": "$22,000,000",
    "status": "Completed",
    "findings": 15,
    "severity": "Crítica",
    "blockchain": "Avalanche",
    "contractAddress": "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    "website": "https://lendz.protocol",
    "twitter": "https://twitter.com/LendZProtocol",
    "auditHash": "b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2",
    "verdict": {
      "title": "CRÍTICO: ORÁCULO DE PRECIOS MANIPULABLE",
      "grade": "C",
      "score": 73.2,
      "summary": "El protocolo es vulnerable a la manipulación del oráculo de precios. El oráculo se basa en un único exchange (DEX) con baja liquidez, lo que permite a un atacante manipular los precios con flash loans para tomar préstamos sin suficiente colateral y liquidar a otros usuarios injustamente."
    },
    "findingsSummary": { "critical": 1, "high": 1, "medium": 5, "low": 6, "informational": 2 },
    "keyFindings": [
      { "id": "C-01", "description": "El oráculo de precios puede ser manipulado fácilmente con flash loans, comprometiendo todo el sistema de préstamos.", "severity": "Crítica", "status": "Pendiente" },
      { "id": "H-01", "description": "La función de liquidación no comprueba adecuadamente la salud del préstamo antes de proceder, lo que puede llevar a liquidaciones incorrectas.", "severity": "Alta", "status": "Pendiente" }
    ],
    "verificationPoints": [
      { "feature": "Depósito de Colateral", "status": "Verificado", "description": "Los depósitos se manejan correctamente." },
      { "feature": "Cálculo de Intereses", "status": "Verificado", "description": "La tasa de interés se calcula según el modelo esperado." }
    ],
    "architecturalStrengths": [
      { "title": "Interfaz de Usuario Clara", "description": "La estructura de funciones es intuitiva para la integración de front-ends." }
    ],
    "tokenDetails": { "symbol": "LENDZ", "totalSupply": "100,000,000", "decimals": 18 },
    "auditScope": ["Contratos de Lending Pool", "Sistema de Oráculos", "Lógica de Liquidación"],
    "auditSummary": { "linesOfCode": 3200, "filesAudited": 20, "auditDuration": "4 semanas", "methodology": ["Revisión Manual", "Simulación de Ataques", "Análisis Estático"], "tools": ["Slither", "Foundry", "Tenderly"] },
    "securityFeatures": { "accessControl": "Gobernanza a través de Multisig", "upgradeability": "Proxy Transparente", "pausability": true, "timelock": true, "multisig": true },
    "recommendations": ["Integrar un oráculo de precios robusto y resistente a la manipulación, como Chainlink.", "Añadir validaciones adicionales en el proceso de liquidación."],
    "gasOptimization": null,
    "codeQuality": { "coverage": 80, "documentation": "Buena", "bestPractices": "Parcialmente Seguidas", "gasEfficiency": "No Optimizado" },
    "securityTimeline": [ { "phase": "Initial", "score": 78 }, { "phase": "Final", "score": 73.2 } ]
  },
  // Proyecto 4 (C+)
  {
    "reportId": "SAI-DAOV-20250718",
    "logo": "https://cdn.iconscout.com/icon/premium/png-256-thumb/dao-5632429-4693358.png",
    "projectName": "DAO-Vote",
    "projectTicker": "VOTE",
    "client": "Governance Labs",
    "projectType": "Herramienta de Gobernanza (DAO)",
    "releaseDate": "18 de julio de 2025",
    "auditFirm": "Sentinel AI",
    "leadAuditor": "Análisis de IA",
    "commitHash": "f7g2b4d6e9c1a3b5d8f0g3h5i7j9k2l4m6n8",
    "id": "SAI-DAOV-20250718",
    "name": "DAO-Vote",
    "description": "Una plataforma de votación on-chain para DAOs que permite la votación por delegación.",
    "auditDate": "2025-07-18T00:00:00.000Z",
    "tvl": "N/A",
    "status": "Completed",
    "findings": 12,
    "severity": "Alta",
    "blockchain": "Arbitrum",
    "contractAddress": "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
    "website": "https://daovote.org",
    "twitter": "https://twitter.com/DAOVote",
    "auditHash": "c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3",
    "verdict": {
      "title": "PRECAUCIÓN: LÓGICA DE VOTACIÓN VULNERABLE",
      "grade": "C+",
      "score": 76.8,
      "summary": "La plataforma tiene una arquitectura sólida para la gestión de propuestas, pero la lógica de conteo de votos es vulnerable a la manipulación mediante flash loans. Un usuario puede tomar prestado una gran cantidad de tokens de gobernanza, votar y devolver el préstamo en la misma transacción."
    },
    "findingsSummary": { "critical": 0, "high": 1, "medium": 4, "low": 5, "informational": 2 },
    "keyFindings": [
      { "id": "H-01", "description": "El sistema de votación no implementa snapshots de balance, permitiendo que un votante manipule el resultado usando flash loans para adquirir poder de voto temporalmente.", "severity": "Alta", "status": "Pendiente" }
    ],
    "verificationPoints": [
      { "feature": "Creación de Propuestas", "status": "Verificado", "description": "Las propuestas se crean y gestionan de forma segura." },
      { "feature": "Ejecución de Propuestas", "status": "Verificado", "description": "Las propuestas aprobadas se ejecutan correctamente." }
    ],
    "architecturalStrengths": [
      { "title": "Sistema de Delegación Eficiente", "description": "La delegación de votos está optimizada en gas y sigue un patrón estándar." }
    ],
    "tokenDetails": { "symbol": "VOTE", "totalSupply": "10,000,000", "decimals": 18 },
    "auditScope": ["Contrato de Gobernanza", "Contrato de Timelock", "Contrato de Token VOTE"],
    "auditSummary": { "linesOfCode": 1500, "filesAudited": 8, "auditDuration": "1 semana", "methodology": ["Revisión Manual", "Análisis Estático"], "tools": ["Slither", "Hardhat"] },
    "securityFeatures": { "accessControl": "Basado en Token de Gobernanza", "upgradeability": "Proxy UUPS", "pausability": false, "timelock": true, "multisig": true },
    "recommendations": ["Implementar un mecanismo de snapshot (ej. en el bloque de creación de la propuesta) para determinar el poder de voto y mitigar la manipulación por flash loans."],
    "gasOptimization": null,
    "codeQuality": { "coverage": 92, "documentation": "Buena", "bestPractices": "Parcialmente Seguidas", "gasEfficiency": "Mejorable" },
    "securityTimeline": [ { "phase": "Initial", "score": 80 }, { "phase": "Final", "score": 76.8 } ]
  },
  // Proyecto 5 (C)
  {
    "reportId": "SAI-YFARM-20250719",
    "logo": "https://cdn-icons-png.flaticon.com/512/5343/5343206.png",
    "projectName": "YieldFarmer",
    "projectTicker": "YFARM",
    "client": "Anon Farmers",
    "projectType": "Agregador de Rendimiento",
    "releaseDate": "19 de julio de 2025",
    "auditFirm": "Sentinel AI",
    "leadAuditor": "Análisis de IA",
    "commitHash": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8",
    "id": "SAI-YFARM-20250719",
    "name": "YieldFarmer",
    "description": "Un agregador de rendimiento que deposita fondos en protocolos de terceros.",
    "auditDate": "2025-07-19T00:00:00.000Z",
    "tvl": "$5,000,000",
    "status": "Completed",
    "findings": 25,
    "severity": "Alta",
    "blockchain": "Fantom",
    "contractAddress": "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    "website": "https://yield-farmer.fi",
    "twitter": "https://twitter.com/YieldFarmerFi",
    "auditHash": "d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4",
    "verdict": {
      "title": "DÉBIL: CONFIANZA CIEGA EN PROTOCOLOS EXTERNOS",
      "grade": "C",
      "score": 74.1,
      "summary": "El protocolo deposita fondos en otros protocolos DeFi sin validaciones de seguridad adecuadas. Una de las estrategias interactúa con un protocolo externo no auditado que tiene una puerta trasera, permitiendo el drenaje de los fondos depositados por YieldFarmer."
    },
    "findingsSummary": { "critical": 0, "high": 4, "medium": 10, "low": 8, "informational": 3 },
    "keyFindings": [
      { "id": "H-01", "description": "La estrategia 'Alpha' interactúa con un contrato de un tercero que no ha sido auditado y contiene funciones de retiro de emergencia maliciosas.", "severity": "Alta", "status": "No Resuelto" },
      { "id": "H-02", "description": "Las claves del administrador que puede cambiar las estrategias de inversión están almacenadas en un servidor centralizado, creando un único punto de fallo.", "severity": "Alta", "status": "No Resuelto" }
    ],
    "verificationPoints": [
      { "feature": "Depósito y Retiro", "status": "Verificado", "description": "Las funciones de depósito y retiro de los usuarios funcionan correctamente." },
      { "feature": "Selección de Estrategia", "status": "Inseguro", "description": "No hay suficientes controles sobre las estrategias que el administrador puede aprobar." }
    ],
    "architecturalStrengths": [],
    "tokenDetails": { "symbol": "YFARM", "totalSupply": "500,000", "decimals": 18 },
    "auditScope": ["Contratos de Vault", "Contratos de Estrategia", "Control de Acceso"],
    "auditSummary": { "linesOfCode": 4500, "filesAudited": 30, "auditDuration": "3 semanas", "methodology": ["Revisión Manual", "Análisis de Dependencias"], "tools": ["Foundry", "Slither"] },
    "securityFeatures": { "accessControl": "Rol de Administrador centralizado", "upgradeability": "Proxy UUPS", "pausability": true, "timelock": false, "multisig": false },
    "recommendations": ["Implementar una lista blanca de protocolos auditados y seguros para las estrategias.", "Asegurar las claves de administrador con un Gnosis Safe (Multisig)."],
    "gasOptimization": null,
    "codeQuality": { "coverage": 50, "documentation": "Regular", "bestPractices": "No Seguidas", "gasEfficiency": "No Optimizado" },
    "securityTimeline": [ { "phase": "Initial", "score": 76 }, { "phase": "Final", "score": 74.1 } ]
  },
  // Proyecto 6 (C+)
  {
    "reportId": "SAI-BRIDGE-20250720",
    "logo": "https://cdn-icons-png.flaticon.com/512/6897/6897992.png",
    "projectName": "Portal Bridge",
    "projectTicker": "PORT",
    "client": "Interchain Labs",
    "projectType": "Puente Cross-Chain",
    "releaseDate": "20 de julio de 2025",
    "auditFirm": "Sentinel AI",
    "leadAuditor": "Análisis de IA",
    "commitHash": "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9",
    "id": "SAI-BRIDGE-20250720",
    "name": "Portal Bridge",
    "description": "Un puente para transferir activos entre Ethereum y Optimism.",
    "auditDate": "2025-07-20T00:00:00.000Z",
    "tvl": "$55,000,000",
    "status": "Completed",
    "findings": 18,
    "severity": "Alta",
    "blockchain": "Ethereum, Optimism",
    "contractAddress": "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
    "website": "https://portalbridge.com",
    "twitter": "https://twitter.com/PortalBridge",
    "auditHash": "e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5",
    "verdict": {
      "title": "PRECAUCIÓN: VALIDACIÓN DE MENSAJES INSUFICIENTE",
      "grade": "C+",
      "score": 75.5,
      "summary": "La arquitectura del puente es conceptualmente sólida, pero la validación de mensajes cross-chain es débil. Un atacante podría potencialmente falsificar un mensaje desde la cadena de origen para acuñar tokens sin respaldo en la cadena de destino."
    },
    "findingsSummary": { "critical": 0, "high": 2, "medium": 7, "low": 6, "informational": 3 },
    "keyFindings": [
      { "id": "H-01", "description": "Falta de un nonce secuencial en los mensajes, lo que abre la posibilidad de ataques de repetición (replay attacks) en ciertas condiciones.", "severity": "Alta", "status": "Pendiente" },
      { "id": "H-02", "description": "El conjunto de validadores que firman las transacciones es pequeño (3 de 5) y sus claves no se rotan, lo que aumenta el riesgo de colusión o compromiso.", "severity": "Alta", "status": "Reconocido" }
    ],
    "verificationPoints": [
      { "feature": "Bloqueo de Activos (Locking)", "status": "Verificado", "description": "Los activos se bloquean correctamente en la cadena de origen." },
      { "feature": "Acuñación de Activos (Minting)", "status": "Inseguro", "description": "La validación de la firma para acuñar es insuficiente." }
    ],
    "architecturalStrengths": [
      { "title": "Modelo de Contratos Segregado", "description": "La lógica de bloqueo y acuñación está en contratos separados, lo que limita la superficie de ataque." }
    ],
    "tokenDetails": null,
    "auditScope": ["Contrato de Ethereum (L1)", "Contrato de Optimism (L2)", "Lógica de Validadores Off-chain"],
    "auditSummary": { "linesOfCode": 2800, "filesAudited": 18, "auditDuration": "5 semanas", "methodology": ["Revisión Manual", "Análisis Criptográfico"], "tools": ["Hardhat", "Tenderly"] },
    "securityFeatures": { "accessControl": "Basado en firmas de validadores", "upgradeability": "Proxy UUPS con gobernanza", "pausability": true, "timelock": true, "multisig": true },
    "recommendations": ["Implementar un nonce secuencial para cada transferencia.", "Aumentar el número de validadores y establecer un plan de rotación de claves."],
    "gasOptimization": null,
    "codeQuality": { "coverage": 85, "documentation": "Buena", "bestPractices": "Parcialmente Seguidas", "gasEfficiency": "Mejorable" },
    "securityTimeline": [ { "phase": "Initial", "score": 79 }, { "phase": "Final", "score": 75.5 } ]
  },
  // Proyecto 7 (C)
  {
    "reportId": "SAI-STBL-20250721",
    "logo": "https://cdn-icons-png.flaticon.com/512/825/825508.png",
    "projectName": "StableCoinX",
    "projectTicker": "SCX",
    "client": "Pegged Finance",
    "projectType": "Stablecoin Algorítmica",
    "releaseDate": "21 de julio de 2025",
    "auditFirm": "Sentinel AI",
    "leadAuditor": "Análisis de IA",
    "commitHash": "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
    "id": "SAI-STBL-20250721",
    "name": "StableCoinX",
    "description": "Una stablecoin algorítmica parcialmente colateralizada y vinculada al dólar.",
    "auditDate": "2025-07-21T00:00:00.000Z",
    "tvl": "$12,000,000",
    "status": "Completed",
    "findings": 28,
    "severity": "Crítica",
    "blockchain": "Solana",
    "contractAddress": "SCX...AbC",
    "website": "https://stablecoinx.xyz",
    "twitter": "https://twitter.com/StableCoinX",
    "auditHash": "f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6",
    "verdict": {
      "title": "DÉBIL: MECANISMO DE ESTABILIZACIÓN DEFICIENTE",
      "grade": "C",
      "score": 70.5,
      "summary": "El diseño de la stablecoin contiene un bucle de retroalimentación mortal ('death spiral'). En condiciones de alta volatilidad, el mecanismo para estabilizar el peg puede fallar, llevando a una pérdida de paridad irrecuperable y a la insolvencia del sistema."
    },
    "findingsSummary": { "critical": 1, "high": 3, "medium": 12, "low": 10, "informational": 2 },
    "keyFindings": [
      { "id": "C-01", "description": "El mecanismo de re-colateralización depende del token de gobernanza, creando un 'death spiral' cuando el precio de ambos activos cae simultáneamente.", "severity": "Crítica", "status": "No Resuelto" },
      { "id": "H-01", "description": "Las reservas de colateral no están diversificadas, consistiendo en un 95% de un único activo volátil.", "severity": "Alta", "status": "No Resuelto" }
    ],
    "verificationPoints": [
      { "feature": "Acuñación y Canje (Mint/Redeem)", "status": "Inseguro", "description": "Las funciones de acuñación y canje son el núcleo del mecanismo de espiral de la muerte." },
      { "feature": "Cálculo de Ratio de Colateral", "status": "Verificado", "description": "El cálculo en sí es correcto, pero el modelo es defectuoso." }
    ],
    "architecturalStrengths": [],
    "tokenDetails": { "symbol": "SCX", "totalSupply": "12,000,000", "decimals": 6 },
    "auditScope": ["Lógica del Peg", "Mecanismos de Re-colateralización", "Gestión de Reservas"],
    "auditSummary": { "linesOfCode": 5000, "filesAudited": 25, "auditDuration": "6 semanas", "methodology": ["Revisión Manual", "Modelado Económico", "Simulación de Crisis"], "tools": ["Anchor", "Solana CLI"] },
    "securityFeatures": { "accessControl": "Gobernanza centralizada", "upgradeability": "No actualizable", "pausability": true, "timelock": false, "multisig": true },
    "recommendations": ["Rediseñar el mecanismo de estabilización para evitar la dependencia reflexiva.", "Diversificar el colateral y sobrecolateralizar el sistema."],
    "gasOptimization": null,
    "codeQuality": { "coverage": 70, "documentation": "Regular", "bestPractices": "Parcialmente Seguidas", "gasEfficiency": "No Optimizado" },
    "securityTimeline": [ { "phase": "Initial", "score": 72 }, { "phase": "Final", "score": 70.5 } ]
  },
  // Proyecto 8 (C+)
  {
    "reportId": "SAI-GAME-20250722",
    "logo": "https://cdn-icons-png.flaticon.com/512/3039/3039607.png",
    "projectName": "Etherions",
    "projectTicker": "ETHR",
    "client": "GameFi Studios",
    "projectType": "GameFi",
    "releaseDate": "22 de julio de 2025",
    "auditFirm": "Sentinel AI",
    "leadAuditor": "Análisis de IA",
    "commitHash": "d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1",
    "id": "SAI-GAME-20250722",
    "name": "Etherions",
    "description": "Un juego de batallas de monstruos on-chain donde los monstruos son NFTs.",
    "auditDate": "2025-07-22T00:00:00.000Z",
    "tvl": "$2,500,000",
    "status": "Completed",
    "findings": 14,
    "severity": "Alta",
    "blockchain": "Immutable X",
    "contractAddress": "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f",
    "website": "https://etherions.game",
    "twitter": "https://twitter.com/EtherionsGame",
    "auditHash": "a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7",
    "verdict": {
      "title": "PRECAUCIÓN: FUENTE DE ALEATORIEDAD INSEGURA",
      "grade": "C+",
      "score": 77.8,
      "summary": "El juego es funcional y los activos están seguros. Sin embargo, el resultado de las batallas depende de una fuente de aleatoriedad predecible (basada en el block.timestamp), lo que permite a los mineros o validadores influir en los resultados para su propio beneficio."
    },
    "findingsSummary": { "critical": 0, "high": 1, "medium": 5, "low": 6, "informational": 2 },
    "keyFindings": [
      { "id": "H-01", "description": "El generador de números aleatorios (RNG) para determinar los resultados de las batallas es inseguro y puede ser manipulado por los productores de bloques.", "severity": "Alta", "status": "Reconocido" }
    ],
    "verificationPoints": [
      { "feature": "Propiedad de NFT", "status": "Verificado", "description": "Los NFTs de los monstruos son propiedad segura de los jugadores." },
      { "feature": "Lógica de Batalla", "status": "Inseguro", "description": "Los resultados de las batallas no son verdaderamente aleatorios." }
    ],
    "architecturalStrengths": [
      { "title": "Economía del Juego Bien Diseñada", "description": "El sistema de recompensas y la quema de tokens están bien balanceados." }
    ],
    "tokenDetails": { "symbol": "ETHR", "totalSupply": "1,000,000,000", "decimals": 18 },
    "auditScope": ["Contrato de Batalla", "Contrato de NFT (ERC-721)", "Economía del Token"],
    "auditSummary": { "linesOfCode": 2200, "filesAudited": 10, "auditDuration": "2 semanas", "methodology": ["Revisión Manual", "Análisis Estático"], "tools": ["Hardhat", "Slither"] },
    "securityFeatures": { "accessControl": "Roles básicos", "upgradeability": "Proxy UUPS", "pausability": true, "timelock": true, "multisig": true },
    "recommendations": ["Utilizar una solución de VRF (Verifiable Random Function) como Chainlink VRF para obtener aleatoriedad segura y demostrable."],
    "gasOptimization": null,
    "codeQuality": { "coverage": 90, "documentation": "Buena", "bestPractices": "Seguidas", "gasEfficiency": "Optimizado" },
    "securityTimeline": [ { "phase": "Initial", "score": 82 }, { "phase": "Final", "score": 77.8 } ]
  },
  // Proyecto 9 (C)
  {
    "reportId": "SAI-PRIV-20250723",
    "logo": "https://cdn-icons-png.flaticon.com/512/2553/2553706.png",
    "projectName": "Privacy Mixer",
    "projectTicker": "MIX",
    "client": "Anon Devs",
    "projectType": "Mezclador de Privacidad",
    "releaseDate": "23 de julio de 2025",
    "auditFirm": "Sentinel AI",
    "leadAuditor": "Análisis de IA",
    "commitHash": "e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2",
    "id": "SAI-PRIV-20250723",
    "name": "Privacy Mixer",
    "description": "Un mezclador de criptomonedas para mejorar la privacidad de las transacciones.",
    "auditDate": "2025-07-23T00:00:00.000Z",
    "tvl": "$10,000,000",
    "status": "Completed",
    "findings": 20,
    "severity": "Alta",
    "blockchain": "Ethereum",
    "contractAddress": "0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a",
    "website": "N/A",
    "twitter": "N/A",
    "auditHash": "b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8",
    "verdict": {
      "title": "DÉBIL: IMPLEMENTACIÓN CRIPTOGRÁFICA INCORRECTA",
      "grade": "C",
      "score": 72.8,
      "summary": "El concepto del mezclador es bueno, pero la implementación de las pruebas de conocimiento cero (zk-proofs) es defectuosa. La falta de una 'trusted setup ceremony' robusta y la reutilización de nonces en las firmas podrían comprometer la privacidad de los usuarios."
    },
    "findingsSummary": { "critical": 0, "high": 2, "medium": 9, "low": 7, "informational": 2 },
    "keyFindings": [
      { "id": "H-01", "description": "El sistema no invalida las notas de depósito después de su uso, permitiendo que un usuario malicioso pueda intentar un doble gasto.", "severity": "Alta", "status": "Pendiente" },
      { "id": "H-02", "description": "La generación de la prueba zk no protege contra la filtración de metadatos (ej. dirección IP del relayer), debilitando las garantías de privacidad.", "severity": "Alta", "status": "Pendiente" }
    ],
    "verificationPoints": [
      { "feature": "Depósito", "status": "Verificado", "description": "Los depósitos se registran correctamente." },
      { "feature": "Retiro", "status": "Inseguro", "description": "La lógica de retiro es vulnerable a doble gasto y fugas de privacidad." }
    ],
    "architecturalStrengths": [],
    "tokenDetails": null,
    "auditScope": ["Lógica de zk-SNARKs", "Contrato de Depósito y Retiro", "Análisis Criptográfico"],
    "auditSummary": { "linesOfCode": 3500, "filesAudited": 15, "auditDuration": "7 semanas", "methodology": ["Revisión Manual de Criptografía", "Análisis Formal"], "tools": ["Circom", "SnarkJS", "Hardhat"] },
    "securityFeatures": { "accessControl": "Sin control de acceso (protocolo inmutable)", "upgradeability": "No actualizable", "pausability": false, "timelock": false, "multisig": false },
    "recommendations": ["Implementar un sistema de anulación de notas para prevenir el doble gasto.", "Fortalecer la red de relayers para disociar la IP del usuario de la transacción."],
    "gasOptimization": null,
    "codeQuality": { "coverage": 70, "documentation": "Pobre", "bestPractices": "Parcialmente Seguidas", "gasEfficiency": "Mejorable" },
    "securityTimeline": [ { "phase": "Initial", "score": 75 }, { "phase": "Final", "score": 72.8 } ]
  },
  // Proyecto 10 (C+)
  {
    "reportId": "SAI-LSTK-20250724",
    "logo": "https://cdn-icons-png.flaticon.com/512/9944/9944207.png",
    "projectName": "Liquid Stake",
    "projectTicker": "LSTK",
    "client": "Staking Solutions",
    "projectType": "Liquid Staking",
    "releaseDate": "24 de julio de 2025",
    "auditFirm": "Sentinel AI",
    "leadAuditor": "Análisis de IA",
    "commitHash": "f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3",
    "id": "SAI-LSTK-20250724",
    "name": "Liquid Stake",
    "description": "Un protocolo para hacer staking de ETH y recibir a cambio un token líquido (LSTK-ETH).",
    "auditDate": "2025-07-24T00:00:00.000Z",
    "tvl": "$80,000,000",
    "status": "Completed",
    "findings": 16,
    "severity": "Alta",
    "blockchain": "Ethereum",
    "contractAddress": "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
    "website": "https://liquidstake.fi",
    "twitter": "https://twitter.com/LiquidStakeFi",
    "auditHash": "c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9",
    "verdict": {
      "title": "PRECAUCIÓN: RIESGO DE DESVIACIÓN DEL PEG",
      "grade": "C+",
      "score": 76.2,
      "summary": "El protocolo funciona, pero el mecanismo para canjear el token líquido por el ETH original es ineficiente y depende de un pool de liquidez con incentivos débiles. Esto crea un riesgo significativo de que el token líquido pierda su paridad (peg) con el ETH subyacente."
    },
    "findingsSummary": { "critical": 0, "high": 1, "medium": 6, "low": 7, "informational": 2 },
    "keyFindings": [
      { "id": "H-01", "description": "El pool de liquidez para canjear LSTK-ETH por ETH es propenso a agotarse durante eventos de alta volatilidad, lo que provocaría una pérdida de paridad.", "severity": "Alta", "status": "Reconocido" }
    ],
    "verificationPoints": [
      { "feature": "Staking de ETH", "status": "Verificado", "description": "El ETH se deposita correctamente en el contrato de staking de la Beacon Chain." },
      { "feature": "Canje de Token Líquido", "status": "Inseguro", "description": "El mecanismo de canje es frágil y no garantiza la paridad." }
    ],
    "architecturalStrengths": [
      { "title": "Distribución de Recompensas", "description": "La distribución de las recompensas de staking a los tenedores del token líquido es clara y eficiente." }
    ],
    "tokenDetails": { "symbol": "LSTK", "totalSupply": "1,000,000", "decimals": 18 },
    "auditScope": ["Contrato de Staking Pool", "Lógica del Token Líquido", "Mecanismo de Canje"],
    "auditSummary": { "linesOfCode": 1900, "filesAudited": 9, "auditDuration": "3 semanas", "methodology": ["Revisión Manual", "Análisis de Modelo Económico"], "tools": ["Foundry", "Slither"] },
    "securityFeatures": { "accessControl": "Gobernanza Multisig", "upgradeability": "Proxy UUPS", "pausability": true, "timelock": true, "multisig": true },
    "recommendations": ["Diseñar un mecanismo de canje más robusto o mejorar significativamente los incentivos del pool de liquidez para asegurar la paridad del token líquido."],
    "gasOptimization": null,
    "codeQuality": { "coverage": 88, "documentation": "Buena", "bestPractices": "Seguidas", "gasEfficiency": "Optimizado" },
    "securityTimeline": [ { "phase": "Initial", "score": 81 }, { "phase": "Final", "score": 76.2 } ]
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