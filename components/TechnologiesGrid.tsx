import React from 'react';
import { Code, Smartphone, Shield, Link as LinkIcon } from 'lucide-react';

const TechnologiesGrid = () => {
    const technologies = [
        {
            category: 'Smart Contracts',
            icon: Code,
            items: ['Solidity', 'Rust', 'Vyper', 'Move']
        },
        {
            category: 'Applications',
            icon: Smartphone,
            items: ['DApps', 'Mobile Apps', 'Web3 Wallets', 'Browser Extensions']
        },
        {
            category: 'DeFi & Protocols',
            icon: Shield,
            items: ['DeFi Protocols', 'NFT Collections', 'DAOs', 'Governance']
        },
        {
            category: 'Infrastructure',
            icon: LinkIcon,
            items: ['Bridges', 'Layer 2', 'ZK-Proofs', 'Oracles']
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech) => {
                const IconComponent = tech.icon;
                return (
                    <div
                        key={tech.category}
                        className="bg-white p-6 rounded-lg border border-brand-gray-200 hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-[#D3D3D3] rounded-lg flex items-center justify-center mr-3">
                                <IconComponent className="w-5 h-5 text-brand-red" />
                            </div>
                            <h3 className="font-semibold text-lg text-brand-black">
                                {tech.category}
                            </h3>
                        </div>
                        <ul className="space-y-2">
                            {tech.items.map((item) => (
                                <li key={item} className="text-brand-gray-600 text-sm">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default TechnologiesGrid;
