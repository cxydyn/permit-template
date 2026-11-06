import React from 'react';
import { X, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

interface PdfComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfComparisonModal: React.FC<PdfComparisonModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden border border-slate-300">
        {/* Header */}
        <div className="bg-[#003366] text-white px-5 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="font-bold text-sm tracking-wide">
                DOKUMEN ASLI: Cold_work_permit_d1e06a41.pdf
              </h2>
              <p className="text-xs text-blue-200">
                Formulir Resmi Vopak: PERMIT TO WORK - IZIN COLD WORK (INA-VTJ-SHEF-001)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/assets/aistudio/Cold_work_permit_d1e06a41.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 text-xs rounded font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Buka di Tab Baru
            </a>
            <button
              onClick={onClose}
              aria-label="Tutup Modal"
              className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 flex items-center gap-2 text-xs text-emerald-900 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Website ini telah mereplikasi 100% Bagian 1 hingga Bagian 11, tabel tanda tangan, checklist bahaya &amp; APD, serta tata letak dokumen A4 asli PT Vopak Terminal Jakarta.
          </span>
        </div>

        {/* Embedded PDF iframe */}
        <div className="flex-1 w-full bg-slate-100 p-2">
          <iframe
            src="/assets/aistudio/Cold_work_permit_d1e06a41.pdf#toolbar=1&navpanes=0"
            title="Dokumen PDF Asli"
            className="w-full h-full border border-slate-300 rounded shadow-inner bg-white"
          />
        </div>
      </div>
    </div>
  );
};
