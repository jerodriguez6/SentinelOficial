import React, { useState } from 'react';
import { X, Copy, Twitter, Linkedin } from 'lucide-react'; // Usando iconos de lucide-react

const ShareComponent = ({ url, title, onClose }: { url: string; title: string; onClose: () => void; }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        // navigator.clipboard.writeText es la forma moderna, pero puede tener problemas en iframes o contextos no seguros.
        // Usamos un fallback con document.execCommand para mayor compatibilidad.
        try {
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        } catch (err) {
            // Fallback para entornos más antiguos o sin https
            const textArea = document.createElement("textarea");
            textArea.value = url;
            textArea.style.position = "fixed"; // Evita que se vea en pantalla
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Fallback: Oops, no se pudo copiar', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

    return (
        <div className="absolute right-0 bottom-full mb-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 z-20">
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-white">Compartir artículo</h4>
                <button onClick={onClose} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                </button>
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-slate-900 rounded-md">
                    <span className="text-xs text-slate-300 truncate">{url}</span>
                    <button onClick={handleCopy} className="text-blue-400 hover:text-blue-300 text-xs font-semibold flex-shrink-0 ml-2">
                        {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                </div>
                <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-md transition-colors w-full text-left text-white">
                    <Twitter className="w-5 h-5" />
                    <span className="text-sm">Compartir en X</span>
                </a>
                <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-md transition-colors w-full text-left text-white">
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm">Compartir en LinkedIn</span>
                </a>
            </div>
        </div>
    );
};

export default ShareComponent;