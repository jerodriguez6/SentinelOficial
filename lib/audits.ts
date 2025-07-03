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
      "reportId": "SENTINEL-OMDB-20250629",
      "logo": "https://omdblockchain.com/wp-content/uploads/2025/05/cropped-OMDBBlockchain-180x180.png",
      "projectName": "OMDB Blockchain",
      "projectTicker": "OMDB",
      "client": "OneMillionsDollar.com LLC",
      "projectType": "Blockchain L1, EVM, Red P2P",
      "releaseDate": "29 de junio de 2025",
      "auditFirm": "Sentinel AI",
      "leadAuditor": "Equipo de Análisis Arquitectónico",
      "commitHash": "N/A",
      "id": "SENTINEL-OMDB-20250629",
      "name": "OMDB Blockchain",
      "description": "Una blockchain L1 con un diseño arquitectónico maduro y una visión de producto clara, actualmente en fase de estabilización de su núcleo.",
      "auditDate": "2025-06-29T00:00:00.000Z",
      "tvl": "N/A",
      "status": "Completed",
      "findings": 9,
      "severity": "Crítica",
      "blockchain": "Go-Ethereum Fork",
      "contractAddress": "N/A (Auditoría de Capa 1)",
      "website": "https://onemillionsdollar.com",
      "twitter": "",
      "auditHash": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
      "verdict": { "title": "DISEÑO MADURO, IMPLEMENTACIÓN INCOMPLETA", "grade": "B-", "score": 78, "summary": "El proyecto demuestra una visión arquitectónica avanzada pero varios componentes centrales se encuentran en una fase de desarrollo temprana." },
      "findingsSummary": { "critical": 1, "high": 3, "medium": 1, "low": 2, "informational": 2 },
      "keyFindings": [
        { "id": "C-01", "description": "Falla Fundamental en el Consenso PoSA: El Poder de Voto es Ignorado", "severity": "Crítica", "status": "Sin Mitigar" },
        { "id": "H-01", "description": "Proceso de Compilación Inestable Requiere Parches Temporales", "severity": "Alta", "status": "Sin Mitigar" }
      ],
      "verificationPoints": [
        { "feature": "Consenso Proof of Staked Authority (PoSA)", "status": "FALLA DE IMPLEMENTACIÓN", "description": "La implementación actual ignora el 'stake', operando como un simple PoA." },
        { "feature": "Stack de Monitoreo y DevOps", "status": "ROBUSTO", "description": "La planificación para operaciones es de nivel de producción." }
      ],
      "architecturalStrengths": [
        { "title": "Planificación Operacional (DevOps) de Alto Nivel", "description": "La configuración para producción demuestra una excelente preparación para el despliegue." },
        { "title": "Diseño Avanzado de Componentes Críticos", "description": "El diseño conceptual del servidor RPC, motor de precios EIP-1559 y seguridad P2P es robusto." }
      ],
      "tokenDetails": { "symbol": "OMDB", "totalSupply": "Definido en Génesis", "decimals": 18, "currentPrice": null, "marketCap": "N/A", "volume24h": "N/A", "change24h": null },
      "auditScope": ["Revisión del código Go.", "Análisis de archivos YAML.", "Scripts de Docker y Shell.", "Archivo de inicialización (genesis.json)."],
      "vulnerabilities": { "critical": 1, "high": 3, "medium": 1, "low": 2 },
      "auditSummary": { "linesOfCode": 15000, "filesAudited": 150, "auditDuration": "2 Semanas", "methodology": ["Revisión Manual", "Análisis Arquitectónico"], "tools": ["Análisis Estático", "Revisión Manual"] },
      "securityFeatures": { "accessControl": "Modelo de validadores permisionado (KYC)", "upgradeability": "Actualizaciones de nodo (Hard Fork)", "pausability": false, "timelock": false, "multisig": false },
      "recommendations": ["Corregir la lógica de consenso en 'consensus/voting.go'.", "Refactorizar 'storage/state_db.go' para estabilizar la compilación.", "Implementar funcionalidad completa de precompilados EVM."],
      "gasOptimization": null,
      "codeQuality": { "coverage": 85, "documentation": "Buena", "bestPractices": "Parcialmente Seguidas", "gasEfficiency": "Mejorable" },
      "securityTimeline": [
        { "phase": "Initial", "score": 40 },
        { "phase": "Analysis", "score": 65 },
        { "phase": "Review", "score": 70 },
        { "phase": "Final", "score": 78 }
      ]
    },
    {
      "reportId": "CT-ZEND-20250515",
      "logo": "https://zenith-lend.finance/logo.png",
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