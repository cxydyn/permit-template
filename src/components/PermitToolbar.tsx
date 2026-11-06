import React from 'react';
import {
  Printer,
  FileCheck2,
  RotateCcw,
  Sparkles,
  Download,
  Upload,
  ZoomIn,
  ZoomOut,
  Clock,
  Eye,
  CheckCircle,
} from 'lucide-react';
import { PermitData } from '../types/permit';

interface PermitToolbarProps {
  permit: PermitData;
  onLoadDemo: () => void;
  onReset: () => void;
  onPrint: () => void;
  onOpenPdfComparison: () => void;
  onAutoFillTime: () => void;
  onExportJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  zoomLevel: number;
  setZoomLevel: (z: number) => void;
  status: PermitData['status'];
  setStatus: (s: PermitData['status']) => void;
}

export const PermitToolbar: React.FC<PermitToolbarProps> = ({
  permit,
  onLoadDemo,
  onReset,
  onPrint,
  onOpenPdfComparison,
  onAutoFillTime,
  onExportJson,
  onImportJson,
  zoomLevel,
  setZoomLevel,
  status,
  setStatus,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const getStatusBadge = () => {
    switch (status) {
      case 'Draft':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Menunggu Persetujuan':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Disetujui / Aktif':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Selesai & Ditutup':
        return 'bg-slate-200 text-slate-800 border-slate-400';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs no-print">
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#003366] text-white flex items-center justify-center font-black text-sm tracking-tighter shadow-xs">
            VPK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-slate-900">
                PT VOPAK TERMINAL JAKARTA
              </span>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded border bg-slate-50 text-slate-700">
                INA-VTJ-SHEF-001
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Sistem Digital Izin Kerja Dingin (Cold Work Permit)
            </p>
          </div>
        </div>

        {/* Status & Central Indicators */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-semibold text-slate-700">Status Permit:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PermitData['status'])}
              className={`text-xs font-bold py-1 px-2.5 rounded-md border focus:outline-none cursor-pointer ${getStatusBadge()}`}
            >
              <option value="Draft">Draf Pengajuan</option>
              <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
              <option value="Disetujui / Aktif">Disetujui / Aktif (Valid)</option>
              <option value="Selesai & Ditutup">Selesai &amp; Ditutup</option>
            </select>
          </div>

          <div className="h-4 w-px bg-slate-300" />

          {/* Quick Zoom */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setZoomLevel(Math.max(65, zoomLevel - 10))}
              className="p-1 hover:bg-white rounded text-slate-600 hover:text-slate-900"
              title="Perkecil Tampilan"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] font-semibold text-slate-700">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
              className="p-1 hover:bg-white rounded text-slate-600 hover:text-slate-900"
              title="Perbesar Tampilan"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Compare PDF button */}
          <button
            onClick={onOpenPdfComparison}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#003366] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
            title="Lihat dokumen PDF asli yang diberikan"
          >
            <Eye className="w-3.5 h-3.5 text-[#003366]" />
            <span className="hidden sm:inline">Bandingkan dgn PDF Asli</span>
          </button>

          {/* Demo Data button */}
          <button
            onClick={onLoadDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
            title="Isi formulir dengan contoh data realistis PT Vopak Terminal Jakarta"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Contoh Data Vopak</span>
          </button>

          {/* Print / Save PDF Button */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#003366] hover:bg-[#002244] rounded-lg shadow-sm transition-colors"
            title="Cetak formulir atau simpan sebagai dokumen PDF A4"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Secondary Bar with Quick Utilities */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-1.5 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Quick Shortcuts */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-slate-500">Alat Formulir:</span>
            <button
              onClick={onAutoFillTime}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
              title="Isi otomatis kolom tanggal & waktu dengan waktu saat ini"
            >
              <Clock className="w-3 h-3 text-blue-600" />
              Isi Waktu Sekarang
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-white hover:bg-red-50 border border-slate-200 text-red-600 transition-colors"
              title="Kosongkan seluruh isian formulir"
            >
              <RotateCcw className="w-3 h-3" />
              Kosongkan Form
            </button>
          </div>

          {/* Import / Export & Storage info */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={onImportJson}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              title="Impor draf permit dari file JSON"
            >
              <Upload className="w-3 h-3" />
              Impor JSON
            </button>
            <button
              onClick={onExportJson}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              title="Simpan cadangan data permit ke file JSON"
            >
              <Download className="w-3 h-3" />
              Cadangkan (JSON)
            </button>

            <span className="text-slate-300">|</span>

            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
              <CheckCircle className="w-3 h-3" />
              Tersimpan Otomatis
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
