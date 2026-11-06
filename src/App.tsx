import React, { useState, useEffect } from 'react';
import { PermitData } from './types/permit';
import { demoPermitData, createEmptyPermit } from './data/initialPermit';
import { PermitDocument } from './components/PermitDocument';
import { PermitToolbar } from './components/PermitToolbar';
import { SignatureModal } from './components/SignatureModal';
import { PdfComparisonModal } from './components/PdfComparisonModal';
import { ShieldCheck, Info } from 'lucide-react';

const STORAGE_KEY = 'vopak_cold_work_permit_data_v1';

export default function App() {
  const [permit, setPermit] = useState<PermitData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return demoPermitData;
  });

  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Signature modal state
  const [sigModal, setSigModal] = useState<{
    isOpen: boolean;
    slotKey: string;
    title: string;
    defaultName: string;
    currentSig?: string;
  }>({
    isOpen: false,
    slotKey: '',
    title: '',
    defaultName: '',
  });

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(permit));
    } catch (err) {
      console.warn('Storage save failed:', err);
    }
  }, [permit]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleLoadDemo = () => {
    setPermit({ ...demoPermitData, updatedAt: new Date().toISOString() });
    showToast('Contoh data lengkap PT Vopak Terminal Jakarta berhasil dimuat!');
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengosongkan seluruh isi formulir?')) {
      setPermit(createEmptyPermit());
      showToast('Formulir berhasil dikosongkan.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAutoFillTime = () => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const dateStr = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())} WIB`;
    const fullDateTime = `${dateStr} ${timeStr}`;

    setPermit((prev) => ({
      ...prev,
      bagian1: {
        ...prev.bagian1,
        perkiraanWaktuMulaiKerja: prev.bagian1.perkiraanWaktuMulaiKerja || fullDateTime,
        berlakuSampai: prev.bagian1.berlakuSampai || `${dateStr} 17:00 WIB`,
        pemilikPekerjaan: {
          ...prev.bagian1.pemilikPekerjaan,
          dateTime: prev.bagian1.pemilikPekerjaan.dateTime || fullDateTime,
        },
        teknisiBerwenang: {
          ...prev.bagian1.teknisiBerwenang,
          dateTime: prev.bagian1.teknisiBerwenang.dateTime || fullDateTime,
        },
      },
      bagian6: {
        pejabatBerwenangRep: {
          ...prev.bagian6.pejabatBerwenangRep,
          dateTime: prev.bagian6.pejabatBerwenangRep.dateTime || fullDateTime,
        },
        pejabatBerwenangApprover: {
          ...prev.bagian6.pejabatBerwenangApprover,
          dateTime: prev.bagian6.pejabatBerwenangApprover.dateTime || fullDateTime,
        },
      },
      bagian7: {
        pemohonContractor: {
          ...prev.bagian7.pemohonContractor,
          tanggal: prev.bagian7.pemohonContractor.tanggal || dateStr,
          waktu: prev.bagian7.pemohonContractor.waktu || timeStr,
        },
        pemilikPekerjaan: {
          ...prev.bagian7.pemilikPekerjaan,
          tanggal: prev.bagian7.pemilikPekerjaan.tanggal || dateStr,
          waktu: prev.bagian7.pemilikPekerjaan.waktu || timeStr,
        },
      },
    }));

    showToast(`Tanggal & waktu otomatis diperbarui ke ${fullDateTime}!`);
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(permit, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Permit_${permit.nomorIzin || 'INA-VTJ-CW'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data draf permit berhasil diunduh (JSON)!');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.bagian1 && parsed.bagian2) {
          setPermit(parsed);
          showToast('Data permit berhasil diimpor!');
        } else {
          alert('Format berkas JSON tidak sesuai untuk formulir Cold Work Permit Vopak.');
        }
      } catch (err) {
        alert('Gagal membaca berkas JSON: ' + (err as Error).message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleOpenSignature = (
    slotKey: string,
    title: string,
    defaultName = '',
    currentSig = ''
  ) => {
    setSigModal({
      isOpen: true,
      slotKey,
      title,
      defaultName,
      currentSig,
    });
  };

  const handleSaveSignature = (sigDataUrl: string, name?: string) => {
    const slot = sigModal.slotKey;

    setPermit((prev) => {
      const next = { ...prev };

      if (slot === 'b1-pemilik') {
        next.bagian1 = {
          ...next.bagian1,
          pemilikPekerjaan: {
            ...next.bagian1.pemilikPekerjaan,
            signatureImage: sigDataUrl,
            name: name || next.bagian1.pemilikPekerjaan.name,
          },
        };
      } else if (slot === 'b1-teknisi') {
        next.bagian1 = {
          ...next.bagian1,
          teknisiBerwenang: {
            ...next.bagian1.teknisiBerwenang,
            signatureImage: sigDataUrl,
            name: name || next.bagian1.teknisiBerwenang.name,
          },
        };
      } else if (slot === 'b6-rep') {
        next.bagian6 = {
          ...next.bagian6,
          pejabatBerwenangRep: {
            ...next.bagian6.pejabatBerwenangRep,
            signatureImage: sigDataUrl,
            name: name || next.bagian6.pejabatBerwenangRep.name,
          },
        };
      } else if (slot === 'b6-approver') {
        next.bagian6 = {
          ...next.bagian6,
          pejabatBerwenangApprover: {
            ...next.bagian6.pejabatBerwenangApprover,
            signatureImage: sigDataUrl,
            name: name || next.bagian6.pejabatBerwenangApprover.name,
          },
        };
      } else if (slot === 'b7-contractor') {
        next.bagian7 = {
          ...next.bagian7,
          pemohonContractor: {
            ...next.bagian7.pemohonContractor,
            signatureImage: sigDataUrl,
            nama: name || next.bagian7.pemohonContractor.nama,
          },
        };
      } else if (slot === 'b7-pemilik') {
        next.bagian7 = {
          ...next.bagian7,
          pemilikPekerjaan: {
            ...next.bagian7.pemilikPekerjaan,
            signatureImage: sigDataUrl,
            nama: name || next.bagian7.pemilikPekerjaan.nama,
          },
        };
      } else if (slot.startsWith('b8-')) {
        const idx = parseInt(slot.replace('b8-', ''), 10);
        if (!isNaN(idx) && next.bagian8.inspections[idx]) {
          const updated = [...next.bagian8.inspections];
          updated[idx] = {
            ...updated[idx],
            tandaTangan: sigDataUrl,
            nama: name || updated[idx].nama,
          };
          next.bagian8 = { ...next.bagian8, inspections: updated };
        }
      } else if (slot.startsWith('b9-pb-')) {
        const rIdx = parseInt(slot.replace('b9-pb-', ''), 10);
        if (next.bagian9.rows[rIdx]) {
          const rows = [...next.bagian9.rows];
          rows[rIdx] = {
            ...rows[rIdx],
            pejabatBerwenang: {
              ...rows[rIdx].pejabatBerwenang,
              tandaTangan: sigDataUrl,
              nama: name || rows[rIdx].pejabatBerwenang.nama,
            },
          };
          next.bagian9 = { ...next.bagian9, rows };
        }
      } else if (slot.startsWith('b9-pem-')) {
        const rIdx = parseInt(slot.replace('b9-pem-', ''), 10);
        if (next.bagian9.rows[rIdx]) {
          const rows = [...next.bagian9.rows];
          rows[rIdx] = {
            ...rows[rIdx],
            pemohon: {
              ...rows[rIdx].pemohon,
              tandaTangan: sigDataUrl,
              nama: name || rows[rIdx].pemohon.nama,
            },
          };
          next.bagian9 = { ...next.bagian9, rows };
        }
      } else if (slot.startsWith('b9-pp-')) {
        const rIdx = parseInt(slot.replace('b9-pp-', ''), 10);
        if (next.bagian9.rows[rIdx]) {
          const rows = [...next.bagian9.rows];
          rows[rIdx] = {
            ...rows[rIdx],
            pemilikPekerjaan: {
              ...rows[rIdx].pemilikPekerjaan,
              tandaTangan: sigDataUrl,
              nama: name || rows[rIdx].pemilikPekerjaan.nama,
            },
          };
          next.bagian9 = { ...next.bagian9, rows };
        }
      } else if (slot === 'b10-spv') {
        next.bagian10 = {
          ...next.bagian10,
          tandaTangan: sigDataUrl,
          nama: name || next.bagian10.nama,
        };
      } else if (slot === 'b11-pemilik') {
        next.bagian11 = {
          ...next.bagian11,
          pemilikPekerjaan: {
            ...next.bagian11.pemilikPekerjaan,
            tandaTangan: sigDataUrl,
            nama: name || next.bagian11.pemilikPekerjaan.nama,
          },
        };
      } else if (slot === 'b11-pejabat') {
        next.bagian11 = {
          ...next.bagian11,
          pejabatBerwenang: {
            ...next.bagian11.pejabatBerwenang,
            tandaTangan: sigDataUrl,
            nama: name || next.bagian11.pejabatBerwenang.nama,
          },
        };
      }

      return next;
    });

    showToast('Tanda tangan digital berhasil diterapkan!');
  };

  return (
    <div className="min-h-screen bg-slate-200/80 flex flex-col antialiased selection:bg-[#003366] selection:text-white">
      {/* Top Application Toolbar */}
      <PermitToolbar
        permit={permit}
        onLoadDemo={handleLoadDemo}
        onReset={handleReset}
        onPrint={handlePrint}
        onOpenPdfComparison={() => setIsPdfModalOpen(true)}
        onAutoFillTime={handleAutoFillTime}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        status={permit.status}
        setStatus={(s) => setPermit((p) => ({ ...p, status: s }))}
      />

      {/* Quick Help / Document Info Notice */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-3 pb-1 no-print">
        <div className="bg-white border border-slate-300 rounded-lg px-4 py-2.5 flex items-center justify-between text-xs text-slate-700 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Formulir Resmi INA-VTJ-SHEF-001</strong> — Semua kolom dan kotak centang dapat diketik/diklik langsung. Klik pada area tanda tangan untuk membubuhkan tanda tangan digital.
            </span>
          </div>
          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="text-blue-700 hover:text-blue-900 font-semibold underline shrink-0 hidden md:inline"
          >
            Bandingkan dengan PDF Asli
          </button>
        </div>
      </div>

      {/* Main Document Area */}
      <main className="flex-1 p-2 sm:p-4 md:p-6 flex justify-center items-start overflow-auto">
        <div
          className="permit-print-container transition-transform duration-150 origin-top"
          style={{
            transform: zoomLevel === 100 ? 'none' : `scale(${zoomLevel / 100})`,
          }}
        >
          <PermitDocument
            data={permit}
            onChange={setPermit}
            onOpenSignature={handleOpenSignature}
          />
        </div>
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#003366] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 border border-blue-400/30 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Signature Modal */}
      <SignatureModal
        isOpen={sigModal.isOpen}
        title={sigModal.title}
        defaultName={sigModal.defaultName}
        initialSignature={sigModal.currentSig}
        onClose={() => setSigModal((prev) => ({ ...prev, isOpen: false }))}
        onSave={handleSaveSignature}
      />

      {/* PDF Comparison Modal */}
      <PdfComparisonModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
}
