// components/ProjectCard.tsx
import React from 'react';
import { Badge } from "@components/Badge";
import { TrendingUp, TrendingDown, Shield, Star, Clock, ArrowRight } from "lucide-react";

export interface ProjectCardProps {
    id: string;
    logo: string;
    name: string;
    category: string;
    score: number;
    grade: string;
    change: number;
    trend: 'up' | 'down';
    description: string;
    audits: number;
    lastUpdate: string;
    highlights: string[];
    onCardClick: () => void;
    descriptionClassName?: string; // 🔹 NUEVO: para personalizar el tamaño del texto
}

export const ProjectCard = ({
    logo, name, category, score, grade, change, trend,
    description, audits, lastUpdate, highlights,
    onCardClick, descriptionClassName
}: ProjectCardProps) => {
    return (
        <div
            onClick={onCardClick}
            className="group relative overflow-hidden h-full cursor-pointer"
        >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 h-full flex flex-col group-hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-[#55f7ed] rounded-xl flex items-center justify-center">
                            <img src={logo} alt={`${name} logo`} className="w-8 h-8 rounded-full object-contain" />
                        </div>
                        <div>
                            <Badge variant="outline" className="border-gray-500/50 text-gray-300 text-xs mb-1 truncate">
                                {category}
                            </Badge>
                            <h3 className="text-lg font-bold text-white">{name}</h3>
                        </div>
                    </div>
                </div>

                {/* Score */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent">
                            {grade}
                        </span>
                        <span className="text-3xl font-bold text-white">{score.toFixed(1)}</span>
                        <div className="flex items-center space-x-1">
                            {trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
                            <span className={`${change >= 0 ? 'text-green-400' : 'text-red-400'} font-semibold`}>
                                {change >= 0 ? '+' : ''}{change.toFixed(1)}
                            </span>
                            <span className="text-gray-400 text-sm">esta semana</span>
                        </div>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full">
                        <div
                            className="h-full bg-gradient-to-r from-blue-400 to-[#55f7ed] rounded-full"
                            style={{ width: `${score}%` }}
                        ></div>
                    </div>
                </div>

                {/* Description */}
                <p className={`text-gray-300 mb-6 leading-relaxed flex-grow ${descriptionClassName || ''}`}>
                    {description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {highlights.map((highlight, i) => (
                            <Badge key={i} variant="outline" className="border-gray-500/30 text-gray-300 text-xs">
                                {highlight}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center mb-6 text-sm">
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300">{audits} auditorías</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">{lastUpdate}</span>
                    </div>
                </div>

                {/* CTA */}
                <button className="w-full mt-auto bg-gradient-to-r from-gray-500/20 to-gray-400/20 hover:from-gray-500/30 hover:to-gray-400/30 border border-gray-500/30 text-gray-300 font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 group-hover:border-gray-200">
                    <span>Ver perfil y evolución</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
