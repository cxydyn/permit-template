import React, { useRef, useState, useEffect } from 'react';
import { X, RotateCcw, Check, PenTool, Type, Sparkles } from 'lucide-react';
import { createSignatureSvg } from '../data/initialPermit';

interface SignatureModalProps {
  isOpen: boolean;
  title: string;
  defaultName?: string;
  initialSignature?: string;
  onClose: () => void;
  onSave: (signatureDataUrl: string, name?: string) => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  title,
  defaultName = '',
  initialSignature = '',
  onClose,
  onSave,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [penColor, setPenColor] = useState('#003366'); // Vopak Blue
  const [penSize, setPenSize] = useState(2.5);
  const [activeTab, setActiveTab] = useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = useState(defaultName);
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    if (isOpen) {
      setTypedName(defaultName);
      setHasDrawn(false);
      setStrokeHistory([]);
      setTimeout(() => {
        initCanvas();
      }, 100);
    }
  }, [isOpen, defaultName]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw baseline guide
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(20, rect.height - 30);
    ctx.lineTo(rect.width - 20, rect.height - 30);
    ctx.stroke();
    ctx.setLineDash([]);

    // Save initial blank state
    const blankImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setStrokeHistory([blankImage]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setStrokeHistory((prev) => [...prev, currentImage]);
  };

  const handleClear = () => {
    initCanvas();
    setHasDrawn(false);
  };

  const handleUndo = () => {
    if (strokeHistory.length <= 1) {
      handleClear();
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = strokeHistory.slice(0, -1);
    const previousState = newHistory[newHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setStrokeHistory(newHistory);
    if (newHistory.length <= 1) {
      setHasDrawn(false);
    }
  };

  const handleApplyPreset = () => {
    const nameToUse = typedName.trim() || defaultName || 'Petugas Vopak';
    const svgDataUrl = createSignatureSvg(nameToUse, penColor);
    onSave(svgDataUrl, nameToUse);
    onClose();
  };

  const handleSave = () => {
    if (activeTab === 'type') {
      const nameToUse = typedName.trim() || defaultName || 'Tanda Tangan';
      const svgDataUrl = createSignatureSvg(nameToUse, penColor);
      onSave(svgDataUrl, nameToUse);
      onClose();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) {
      if (initialSignature) {
        onSave(initialSignature, typedName);
        onClose();
        return;
      }
      // If nothing drawn, apply stylized name
      handleApplyPreset();
      return;
    }

    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl, typedName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-[#003366] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <PenTool className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm tracking-wide">TANDA TANGAN DIGITAL</h3>
              <p className="text-xs text-blue-200">{title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Tanda Tangan"
            className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('draw')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'draw'
                ? 'bg-white border-[#003366] text-[#003366] shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            Gores / Gambar Langsung
          </button>
          <button
            onClick={() => setActiveTab('type')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'type'
                ? 'bg-white border-[#003366] text-[#003366] shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            Ketik Nama (Cursive Kaligrafi)
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {activeTab === 'draw' ? (
            <>
              {/* Controls bar */}
              <div className="flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Warna Tinta:</span>
                  <div className="flex gap-1.5">
                    {[
                      { color: '#003366', label: 'Vopak Navy' },
                      { color: '#1e3a8a', label: 'Blue' },
                      { color: '#111827', label: 'Black' },
                    ].map((c) => (
                      <button
                        key={c.color}
                        onClick={() => setPenColor(c.color)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          penColor === c.color ? 'border-amber-500 scale-110 shadow-xs' : 'border-white'
                        }`}
                        style={{ backgroundColor: c.color }}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium">Ketebalan:</span>
                  <div className="flex gap-1">
                    {[
                      { size: 1.8, label: 'Halus' },
                      { size: 2.6, label: 'Sedang' },
                      { size: 3.8, label: 'Tebal' },
                    ].map((s) => (
                      <button
                        key={s.size}
                        onClick={() => setPenSize(s.size)}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                          penSize === s.size
                            ? 'bg-[#003366] text-white border-[#003366]'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawing Area */}
              <div className="relative border-2 border-dashed border-slate-300 rounded-lg overflow-hidden bg-white shadow-inner">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-44 cursor-crosshair touch-none block"
                />
                {!hasDrawn && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-300 text-xs italic select-none">
                    Gunakan jari atau mouse untuk tanda tangan di sini
                  </div>
                )}
              </div>

              {/* Action buttons under canvas */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUndo}
                    className="flex items-center gap-1 px-2.5 py-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded font-medium transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Batal Goresan (Undo)
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded font-medium transition-colors"
                  >
                    Hapus Semua
                  </button>
                </div>
                <button
                  onClick={handleApplyPreset}
                  className="flex items-center gap-1 text-blue-700 hover:text-blue-900 font-medium underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Gunakan Tanda Tangan Cepat
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4 py-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Pejabat / Pemohon:
                </label>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder="Ketik nama lengkap..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pratinjau Tanda Tangan Digital Cursive:
                </label>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center min-h-[110px]">
                  {typedName.trim() ? (
                    <img
                      src={createSignatureSvg(typedName.trim(), penColor)}
                      alt="Preview"
                      className="max-h-20 object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400 italic">Nama belum dimasukkan</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#003366] hover:bg-[#002244] rounded-lg shadow-sm transition-colors"
          >
            <Check className="w-4 h-4" />
            Terapkan ke Dokumen
          </button>
        </div>
      </div>
    </div>
  );
};
