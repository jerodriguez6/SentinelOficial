// Fichero: /lib/types.ts

export interface AuditData {
    // --- Campos Originales ---
    reportId: string;
    logo: string;
    projectName: string;
    projectTicker: string;
    client: string;
    category: string;
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