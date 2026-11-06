import React from 'react';
import { PermitData } from '../types/permit';
import { Check, Edit3 } from 'lucide-react';

interface PermitDocumentProps {
  data: PermitData;
  onChange: (updater: (prev: PermitData) => PermitData) => void;
  onOpenSignature: (slotKey: string, title: string, defaultName?: string, currentSig?: string) => void;
  readOnly?: boolean;
}

export const PermitDocument: React.FC<PermitDocumentProps> = ({
  data,
  onChange,
  onOpenSignature,
  readOnly = false,
}) => {
  // Helpers for deep updates
  const updateB1 = (field: string, value: any) => {
    onChange((prev) => ({
      ...prev,
      bagian1: { ...prev.bagian1, [field]: value },
    }));
  };

  const updateB2 = (field: string, value: any) => {
    onChange((prev) => ({
      ...prev,
      bagian2: { ...prev.bagian2, [field]: value },
    }));
  };

  const updateB3 = (field: string, value: any) => {
    onChange((prev) => ({
      ...prev,
      bagian3: { ...prev.bagian3, [field]: value },
    }));
  };

  const updateB4 = (field: string, value: any) => {
    onChange((prev) => ({
      ...prev,
      bagian4: { ...prev.bagian4, [field]: value },
    }));
  };

  const updateB5 = (field: string, value: any) => {
    onChange((prev) => ({
      ...prev,
      bagian5: { ...prev.bagian5, [field]: value },
    }));
  };

  const updateB10 = (field: string, value: any) => {
    onChange((prev) => ({
      ...prev,
      bagian10: { ...prev.bagian10, [field]: value },
    }));
  };

  const renderCheckbox = (
    checked: boolean,
    onToggle: () => void,
    label: React.ReactNode,
    className = ''
  ) => {
    return (
      <label
        onClick={(e) => {
          if (readOnly) return;
          e.preventDefault();
          onToggle();
        }}
        className={`inline-flex items-center gap-1.5 cursor-pointer select-none text-[10px] leading-tight text-black hover:text-blue-900 group ${className}`}
      >
        <span
          className={`w-3.5 h-3.5 min-w-[14px] min-h-[14px] border border-black flex items-center justify-center bg-white transition-colors ${
            !readOnly && 'group-hover:border-blue-700'
          }`}
        >
          {checked && <Check className="w-3.5 h-3.5 text-black stroke-[3.5]" />}
        </span>
        <span className="font-medium text-black">{label}</span>
      </label>
    );
  };

  const renderSignatureBox = (
    sigImage: string | undefined,
    slotKey: string,
    slotTitle: string,
    defaultName: string,
    height = 'h-10'
  ) => {
    return (
      <div
        onClick={() => {
          if (!readOnly) onOpenSignature(slotKey, slotTitle, defaultName, sigImage);
        }}
        className={`relative ${height} w-full border-b border-black flex items-center justify-center cursor-pointer group bg-transparent hover:bg-amber-50/50 transition-colors`}
        title={readOnly ? '' : 'Klik untuk tanda tangan digital'}
      >
        {sigImage ? (
          <img
            src={sigImage}
            alt="Signature"
            className="max-h-full max-w-full object-contain pointer-events-none"
          />
        ) : (
          <span className="text-[10px] text-slate-300 italic group-hover:text-blue-600 flex items-center gap-1 no-print">
            <Edit3 className="w-3 h-3 opacity-60" /> Tanda tangan di sini
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white text-black font-sans text-[10.5px] leading-tight select-text print:p-0 print:m-0 print:border-none print:shadow-none shadow-md border border-black mx-auto max-w-[1080px]">
      {/* ============================================================== */}
      {/* HEADER SECTION */}
      {/* ============================================================== */}
      <div className="border-b-2 border-black">
        {/* Top bar with Logo, Title, Slogan */}
        <div className="grid grid-cols-12 border-b border-black">
          {/* Logo Box */}
          <div className="col-span-2 p-2 flex flex-col justify-center items-start border-r border-black">
            <div className="text-2xl font-black tracking-tight text-[#003366] leading-none">
              VOPAK
            </div>
            <div className="text-[8px] font-bold text-slate-600 tracking-wider uppercase mt-0.5">
              Terminal Jakarta
            </div>
          </div>

          {/* Title & Slogan Center-Right */}
          <div className="col-span-10 flex flex-col">
            <div className="flex items-center justify-between px-3 py-1 border-b border-black">
              <h1 className="text-lg font-black tracking-widest text-black uppercase">
                PERMIT TO WORK
              </h1>
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-bold uppercase">NOMOR IZIN :</span>
                <input
                  type="text"
                  value={data.nomorIzin}
                  disabled={readOnly}
                  onChange={(e) => onChange((p) => ({ ...p, nomorIzin: e.target.value }))}
                  className="w-44 px-1.5 py-0.5 border border-black font-mono font-bold text-[11px] bg-white focus:bg-amber-50 focus:outline-none"
                  placeholder="INA-VTJ-CW-..."
                />
              </div>
            </div>

            {/* Slogan Bar (Red Warning Slogan from PDF) */}
            <div className="px-3 py-1 flex items-center justify-center bg-white">
              <span className="text-[9px] font-bold italic text-red-600 text-center tracking-tight leading-tight">
                &ldquo;TIDAK ADA PEKERJAAN YANG SANGAT MENDESAK SEHINGGA KITA TIDAK BISA MELUANGKAN WAKTU UNTUK MELAKUKANNYA DENGAN AMAN&rdquo;
              </span>
            </div>
          </div>
        </div>

        {/* Sub Header: TIPE IZIN : IZIN COLD WORK | INA-VTJ-SHEF-001 */}
        <div className="grid grid-cols-12 bg-white text-black font-bold text-[11px] py-1 px-2 border-t border-black">
          <div className="col-span-2 flex items-center">
            <span>TIPE IZIN :</span>
          </div>
          <div className="col-span-8 flex items-center justify-center">
            <span className="bg-[#198744] text-white px-6 py-0.5 font-black tracking-wider text-xs uppercase border border-black shadow-xs">
              IZIN COLD WORK
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-end font-mono text-[10px] tracking-wider text-black font-black">
            INA-VTJ-SHEF-001
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BAGIAN 1: PENGAJUAN IZIN */}
      {/* ============================================================== */}
      <div className="border-b border-black">
        <div className="bg-[#198744] text-white px-2 py-0.5 font-bold text-[10px] uppercase tracking-wide border-b border-black flex justify-between items-center">
          <span>BAGIAN 1 - PENGAJUAN IZIN-diisi OLEH PEMOHON / PEMIMPIN KERJA ( INPUT MENGGUNAKAN SISTEM)</span>
        </div>

        {/* Bagian 1 Grid Form */}
        <div className="grid grid-cols-12 divide-x divide-black border-b border-black text-[9.5px]">
          {/* Column 1: Info fields */}
          <div className="col-span-3 divide-y divide-black">
            <div className="p-1">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">NAMA PEMOHON</div>
              <input
                type="text"
                value={data.bagian1.namaPemohon}
                disabled={readOnly}
                onChange={(e) => updateB1('namaPemohon', e.target.value)}
                placeholder="Nama Pemohon..."
                className="w-full font-semibold bg-transparent focus:bg-amber-50 focus:outline-none"
              />
            </div>
            <div className="p-1">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">LOKASI / FASILITAS</div>
              <input
                type="text"
                value={data.bagian1.lokasiFasilitas}
                disabled={readOnly}
                onChange={(e) => updateB1('lokasiFasilitas', e.target.value)}
                placeholder="Lokasi Fasilitas..."
                className="w-full font-semibold bg-transparent focus:bg-amber-50 focus:outline-none"
              />
            </div>
            <div className="p-1">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">NO. PERALATAN</div>
              <input
                type="text"
                value={data.bagian1.noPeralatan}
                disabled={readOnly}
                onChange={(e) => updateB1('noPeralatan', e.target.value)}
                placeholder="No. Alat / Tag..."
                className="w-full font-semibold bg-transparent focus:bg-amber-50 focus:outline-none"
              />
            </div>
            <div className="p-1">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">EMAIL PEMOHON</div>
              <input
                type="email"
                value={data.bagian1.emailPemohon}
                disabled={readOnly}
                onChange={(e) => updateB1('emailPemohon', e.target.value)}
                placeholder="email@perusahaan.com"
                className="w-full font-medium bg-transparent focus:bg-amber-50 focus:outline-none"
              />
            </div>
          </div>

          {/* Column 2: Detail Pekerjaan & Peralatan */}
          <div className="col-span-4 divide-y divide-black">
            <div className="p-1 min-h-[58px]">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">DETAIL DESKRIPSI PEKERJAAN</div>
              <textarea
                rows={2}
                value={data.bagian1.detailDeskripsiPekerjaan}
                disabled={readOnly}
                onChange={(e) => updateB1('detailDeskripsiPekerjaan', e.target.value)}
                placeholder="Rincian pekerjaan dingin yang akan dilaksanakan..."
                className="w-full font-medium text-[9.5px] bg-transparent focus:bg-amber-50 focus:outline-none resize-none leading-tight"
              />
            </div>
            <div className="p-1">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">PERALATAN YANG DIGUNAKAN</div>
              <input
                type="text"
                value={data.bagian1.peralatanYangDigunakan}
                disabled={readOnly}
                onChange={(e) => updateB1('peralatanYangDigunakan', e.target.value)}
                placeholder="Daftar peralatan/tools..."
                className="w-full font-medium bg-transparent focus:bg-amber-50 focus:outline-none"
              />
            </div>
            <div className="p-1">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">JUMLAH PEKERJA YANG TERLIBAT</div>
              <input
                type="text"
                value={data.bagian1.jumlahPekerjaYangTerlibat}
                disabled={readOnly}
                onChange={(e) => updateB1('jumlahPekerjaYangTerlibat', e.target.value)}
                placeholder="Contoh: 4 Orang..."
                className="w-full font-medium bg-transparent focus:bg-amber-50 focus:outline-none"
              />
            </div>
          </div>

          {/* Column 3: WO & Waktu */}
          <div className="col-span-2 divide-y divide-black">
            <div className="p-1">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">NO. WO / PO</div>
              <input
                type="text"
                value={data.bagian1.noWoPo}
                disabled={readOnly}
                onChange={(e) => updateB1('noWoPo', e.target.value)}
                placeholder="WO-..."
                className="w-full font-semibold bg-transparent focus:bg-amber-50 focus:outline-none"
              />
            </div>
            <div className="p-1">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">PERKIRAAN WAKTU MULAI KERJA</div>
              <input
                type="text"
                value={data.bagian1.perkiraanWaktuMulaiKerja}
                disabled={readOnly}
                onChange={(e) => updateB1('perkiraanWaktuMulaiKerja', e.target.value)}
                placeholder="DD/MM/YYYY HH:MM"
                className="w-full font-medium bg-transparent focus:bg-amber-50 focus:outline-none"
              />
            </div>
            <div className="p-1">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">BERLAKU SAMPAI</div>
              <input
                type="text"
                value={data.bagian1.berlakuSampai}
                disabled={readOnly}
                onChange={(e) => updateB1('berlakuSampai', e.target.value)}
                placeholder="DD/MM/YYYY HH:MM"
                className="w-full font-medium bg-transparent focus:bg-amber-50 focus:outline-none"
              />
            </div>
          </div>

          {/* Column 4: Kontraktor, Pengawas, Departemen */}
          <div className="col-span-3 divide-y divide-black">
            <div className="p-1">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">KONTRAKTOR</div>
              <input
                type="text"
                value={data.bagian1.kontraktor}
                disabled={readOnly}
                onChange={(e) => updateB1('kontraktor', e.target.value)}
                placeholder="Nama Kontraktor..."
                className="w-full font-semibold bg-transparent focus:bg-amber-50 focus:outline-none"
              />
            </div>
            <div className="p-1">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">PENGAWAS</div>
              <input
                type="text"
                value={data.bagian1.pengawas}
                disabled={readOnly}
                onChange={(e) => updateB1('pengawas', e.target.value)}
                placeholder="Nama Pengawas..."
                className="w-full font-semibold bg-transparent focus:bg-amber-50 focus:outline-none"
              />
            </div>
            <div className="p-1">
              <div className="font-bold text-[8.5px] uppercase text-slate-700">DEPARTEMEN</div>
              <input
                type="text"
                value={data.bagian1.departemen}
                disabled={readOnly}
                onChange={(e) => updateB1('departemen', e.target.value)}
                placeholder="Maintenance / Ops..."
                className="w-full font-semibold bg-transparent focus:bg-amber-50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bagian 1: Pemilik Pekerjaan & Teknisi Berwenang Signoff */}
        <div className="grid grid-cols-2 divide-x divide-black text-[9.5px]">
          {/* Box Pemilik Pekerjaan */}
          <div className="p-1.5 flex flex-col justify-between">
            <div className="font-bold text-center border-b border-black pb-0.5 mb-1 bg-slate-50 uppercase text-[9.5px]">
              PEMILIK PEKERJAAN
            </div>
            <p className="text-[8.5px] leading-tight text-slate-800 italic mb-1 text-center">
              Saya memahami kondisi dan tindakan pencegahan sebagaimana disebutkan JSA dan setuju untuk mematuhinya dan menjelaskannya kepada semua orang yang mengerjakan pekerjaan ini
            </p>
            <div className="grid grid-cols-2 gap-x-2 pt-1">
              <div>
                <span className="font-bold text-[8.5px]">Nama : </span>
                <input
                  type="text"
                  value={data.bagian1.pemilikPekerjaan.name}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      bagian1: {
                        ...prev.bagian1,
                        pemilikPekerjaan: { ...prev.bagian1.pemilikPekerjaan, name: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none font-semibold text-[9.5px]"
                />
                <span className="font-bold text-[8.5px] block mt-1">Jabatan : </span>
                <input
                  type="text"
                  value={data.bagian1.pemilikPekerjaan.position || ''}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      bagian1: {
                        ...prev.bagian1,
                        pemilikPekerjaan: { ...prev.bagian1.pemilikPekerjaan, position: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[9px]"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-bold text-[8.5px]">Tanda tangan :</span>
                  {renderSignatureBox(
                    data.bagian1.pemilikPekerjaan.signatureImage,
                    'b1-pemilik',
                    'Pemilik Pekerjaan (Bagian 1)',
                    data.bagian1.pemilikPekerjaan.name
                  )}
                </div>
                <div className="mt-1">
                  <span className="font-bold text-[8.5px]">Tanggal/Waktu : </span>
                  <input
                    type="text"
                    value={data.bagian1.pemilikPekerjaan.dateTime}
                    disabled={readOnly}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        bagian1: {
                          ...prev.bagian1,
                          pemilikPekerjaan: { ...prev.bagian1.pemilikPekerjaan, dateTime: e.target.value },
                        },
                      }))
                    }
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Box Teknisi Berwenang */}
          <div className="p-1.5 flex flex-col justify-between">
            <div className="font-bold text-center border-b border-black pb-0.5 mb-1 bg-slate-50 uppercase text-[9.5px]">
              TEKNISI BERWENANG
            </div>
            <p className="text-[8.5px] leading-tight text-slate-800 italic mb-1 text-center">
              Saya telah memeriksa area dan peralatan dan material yang akan digunakan &amp; dikerjakan layak, dan pekerjaan yang diminta dapat dilakukan dengan aman.
            </p>
            <div className="grid grid-cols-2 gap-x-2 pt-1">
              <div>
                <span className="font-bold text-[8.5px]">Nama : </span>
                <input
                  type="text"
                  value={data.bagian1.teknisiBerwenang.name}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      bagian1: {
                        ...prev.bagian1,
                        teknisiBerwenang: { ...prev.bagian1.teknisiBerwenang, name: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none font-semibold text-[9.5px]"
                />
                <span className="font-bold text-[8.5px] block mt-1">Jabatan : </span>
                <input
                  type="text"
                  value={data.bagian1.teknisiBerwenang.position || ''}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      bagian1: {
                        ...prev.bagian1,
                        teknisiBerwenang: { ...prev.bagian1.teknisiBerwenang, position: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[9px]"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-bold text-[8.5px]">Tanda tangan :</span>
                  {renderSignatureBox(
                    data.bagian1.teknisiBerwenang.signatureImage,
                    'b1-teknisi',
                    'Teknisi Berwenang (Bagian 1)',
                    data.bagian1.teknisiBerwenang.name
                  )}
                </div>
                <div className="mt-1">
                  <span className="font-bold text-[8.5px]">Tanggal/Waktu : </span>
                  <input
                    type="text"
                    value={data.bagian1.teknisiBerwenang.dateTime}
                    disabled={readOnly}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        bagian1: {
                          ...prev.bagian1,
                          teknisiBerwenang: { ...prev.bagian1.teknisiBerwenang, dateTime: e.target.value },
                        },
                      }))
                    }
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BAGIAN 2: BAHAYA / BAHAYA DARI KEGIATAN */}
      {/* ============================================================== */}
      <div className="border-b border-black">
        <div className="bg-[#198744] text-white px-2 py-0.5 font-bold text-[10px] uppercase tracking-wide border-b border-black">
          BAGIAN 2 - BAHAYA / BAHAYA DARI KEGIATAN ( diisi OLEH PEJABAT BERWENANG) - CENTANG ( √) JIKA DITERAPKAN ( INPUT MENGGUNAKAN SISTEM)
        </div>
        <div className="grid grid-cols-6 p-1.5 gap-x-2 gap-y-1 text-[9.5px]">
          {/* Col 1 */}
          <div className="space-y-1">
            {renderCheckbox(data.bagian2.nitrogen, () => updateB2('nitrogen', !data.bagian2.nitrogen), 'Nitrogen')}
            {renderCheckbox(data.bagian2.kimia, () => updateB2('kimia', !data.bagian2.kimia), 'Kimia')}
            {renderCheckbox(data.bagian2.debu, () => updateB2('debu', !data.bagian2.debu), 'Debu')}
            {renderCheckbox(data.bagian2.memakaiHandTools, () => updateB2('memakaiHandTools', !data.bagian2.memakaiHandTools), 'Memakai Hand Tools')}
          </div>

          {/* Col 2 */}
          <div className="space-y-1">
            {renderCheckbox(data.bagian2.pengangkatanManual, () => updateB2('pengangkatanManual', !data.bagian2.pengangkatanManual), 'Pengangkatan/Manual')}
            {renderCheckbox(data.bagian2.penggalianManual, () => updateB2('penggalianManual', !data.bagian2.penggalianManual), 'Penggalian Manual')}
            {renderCheckbox(data.bagian2.scaffolding, () => updateB2('scaffolding', !data.bagian2.scaffolding), 'Scaffolding')}
            {renderCheckbox(data.bagian2.bendaJatuh, () => updateB2('bendaJatuh', !data.bagian2.bendaJatuh), 'Benda Jatuh')}
          </div>

          {/* Col 3 */}
          <div className="space-y-1">
            {renderCheckbox(data.bagian2.bekerjaDiKetinggian, () => updateB2('bekerjaDiKetinggian', !data.bagian2.bekerjaDiKetinggian), 'Bekerja di Ketinggian')}
            {renderCheckbox(data.bagian2.interlockBypass, () => updateB2('interlockBypass', !data.bagian2.interlockBypass), 'Interlock Bypass')}
            {renderCheckbox(data.bagian2.bising, () => updateB2('bising', !data.bagian2.bising), 'Bising')}
            {renderCheckbox(data.bagian2.listrikStatis, () => updateB2('listrikStatis', !data.bagian2.listrikStatis), 'Listrik Statis')}
          </div>

          {/* Col 4 */}
          <div className="space-y-1">
            {renderCheckbox(data.bagian2.objekPanas, () => updateB2('objekPanas', !data.bagian2.objekPanas), 'Objek Panas')}
            {renderCheckbox(data.bagian2.gergajiColdCut, () => updateB2('gergajiColdCut', !data.bagian2.gergajiColdCut), 'Gergaji / Cold Cut')}
            {renderCheckbox(data.bagian2.korosif, () => updateB2('korosif', !data.bagian2.korosif), 'Korosif')}
            {renderCheckbox(data.bagian2.beracun, () => updateB2('beracun', !data.bagian2.beracun), 'Beracun')}
          </div>

          {/* Col 5 */}
          <div className="space-y-1">
            {renderCheckbox(data.bagian2.ergonomi, () => updateB2('ergonomi', !data.bagian2.ergonomi), 'Ergonomi')}
            {renderCheckbox(data.bagian2.bahayaBiologi, () => updateB2('bahayaBiologi', !data.bagian2.bahayaBiologi), 'Bahaya Biologi')}
            {renderCheckbox(data.bagian2.terceburKeAirLaut, () => updateB2('terceburKeAirLaut', !data.bagian2.terceburKeAirLaut), 'Tercebur ke air/laut')}
          </div>

          {/* Col 6 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1">
              {renderCheckbox(data.bagian2.bahayaTekanan, () => updateB2('bahayaTekanan', !data.bagian2.bahayaTekanan), 'Bahaya Tekanan')}
              <input
                type="text"
                value={data.bagian2.bahayaTekananValue}
                disabled={readOnly}
                onChange={(e) => updateB2('bahayaTekananValue', e.target.value)}
                placeholder="..."
                className="w-12 px-1 text-[9px] border-b border-black text-center bg-transparent focus:outline-none"
              />
              <span className="text-[9px]">Barg</span>
            </div>
            <div>
              <span className="font-semibold text-[9px]">Lainnya:</span>
              <input
                type="text"
                value={data.bagian2.lainnya}
                disabled={readOnly}
                onChange={(e) => updateB2('lainnya', e.target.value)}
                placeholder="Bahaya lainnya..."
                className="w-full text-[9px] border-b border-dotted border-black bg-transparent focus:outline-none mt-0.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BAGIAN 3: PERSIAPAN AREA KERJA / TINDAKAN PENCEGAHAN */}
      {/* ============================================================== */}
      <div className="border-b border-black">
        <div className="bg-[#198744] text-white px-2 py-0.5 font-bold text-[10px] uppercase tracking-wide border-b border-black">
          BAGIAN 3 - PERSIAPAN AREA KERJA / TINDAKAN PENCEGAHAN YANG DILAKUKAN (diisi OLEH PEJABAT BERWENANG) - CENTANG ( √) JIKA DITERAPKAN ( INPUT MENGGUNAKAN SISTEM)
        </div>
        <div className="grid grid-cols-5 p-1.5 gap-x-2 text-[9px]">
          {/* Col 1 */}
          <div className="space-y-1">
            {renderCheckbox(data.bagian3.peralatanValveDiIsolasiTag, () => updateB3('peralatanValveDiIsolasiTag', !data.bagian3.peralatanValveDiIsolasiTag), 'Peralatan Valve di Isolasi & Tag')}
            {renderCheckbox(data.bagian3.valveDiRantaiBukaTutup, () => updateB3('valveDiRantaiBukaTutup', !data.bagian3.valveDiRantaiBukaTutup), 'Valve di Rantai Buka / Tutup')}
            {renderCheckbox(data.bagian3.peralatanPipaDitutupBlind, () => updateB3('peralatanPipaDitutupBlind', !data.bagian3.peralatanPipaDitutupBlind), 'Peralatan / Pipa ditutup Blind')}
            {renderCheckbox(data.bagian3.perpipaanDiPutus, () => updateB3('perpipaanDiPutus', !data.bagian3.perpipaanDiPutus), 'Perpipaan di Putus')}
          </div>

          {/* Col 2 */}
          <div className="space-y-1">
            {renderCheckbox(data.bagian3.peralatanPipaDiDepressurized, () => updateB3('peralatanPipaDiDepressurized', !data.bagian3.peralatanPipaDiDepressurized), 'Peralatan / Pipa di Depressurized')}
            {renderCheckbox(data.bagian3.peralatanPipaDikuras, () => updateB3('peralatanPipaDikuras', !data.bagian3.peralatanPipaDikuras), 'Peralatan / Pipa dikuras')}
            {renderCheckbox(data.bagian3.dibersihkanN2AtauUap, () => updateB3('dibersihkanN2AtauUap', !data.bagian3.dibersihkanN2AtauUap), 'Dibersihkan oleh N2 / Dibersihkan Uap')}
            {renderCheckbox(data.bagian3.dibilasOlehAir, () => updateB3('dibilasOlehAir', !data.bagian3.dibilasOlehAir), 'dibilas Oleh Air')}
          </div>

          {/* Col 3 */}
          <div className="space-y-1">
            {renderCheckbox(data.bagian3.penghalangHarusDipasang, () => updateB3('penghalangHarusDipasang', !data.bagian3.penghalangHarusDipasang), 'Penghalang Harus dipasang')}
            {renderCheckbox(data.bagian3.dibutuhkanTandaPeringatan, () => updateB3('dibutuhkanTandaPeringatan', !data.bagian3.dibutuhkanTandaPeringatan), 'Di Butuhkan Tanda Peringatan')}
            {renderCheckbox(data.bagian3.peralatanAmanDariKejatuhanMater, () => updateB3('peralatanAmanDariKejatuhanMater', !data.bagian3.peralatanAmanDariKejatuhanMater), 'Peralatan Aman / Aman dari Kejatuhan Mater')}
            {renderCheckbox(data.bagian3.kontakAreaCcrSebelumMulai, () => updateB3('kontakAreaCcrSebelumMulai', !data.bagian3.kontakAreaCcrSebelumMulai), 'Kontak Area / CCR Operator Sebelum Pekerjaan dimulai')}
          </div>

          {/* Col 4 */}
          <div className="space-y-1">
            {renderCheckbox(data.bagian3.kontrakAreaCcrKetikaSelesai, () => updateB3('kontrakAreaCcrKetikaSelesai', !data.bagian3.kontrakAreaCcrKetikaSelesai), 'Kontak Area / CCR Operator Ketika Selesai')}
            {renderCheckbox(data.bagian3.disetujuiPeralatanDiperiksa, () => updateB3('disetujuiPeralatanDiperiksa', !data.bagian3.disetujuiPeralatanDiperiksa), 'Di Setujui / Peralatan Yang Digunakan diperiksa')}
            {renderCheckbox(data.bagian3.terisolasiSecaraElektrik, () => updateB3('terisolasiSecaraElektrik', !data.bagian3.terisolasiSecaraElektrik), 'Terisolasi secara elektrik dan ditandai')}
          </div>

          {/* Col 5: LMRA & Jika ada pencegahan lainnya */}
          <div className="space-y-1.5">
            {renderCheckbox(data.bagian3.lmra, () => updateB3('lmra', !data.bagian3.lmra), 'LMRA :')}
            <div>
              <span className="font-semibold text-[8.5px] block">Jika ada Pencegahan Lainnya:</span>
              <textarea
                rows={2}
                value={data.bagian3.jikaAdaPencegahanLainnya}
                disabled={readOnly}
                onChange={(e) => updateB3('jikaAdaPencegahanLainnya', e.target.value)}
                placeholder="Tindakan pencegahan lainnya..."
                className="w-full text-[8.5px] border border-black p-1 bg-transparent focus:bg-amber-50 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BAGIAN 4: ALAT PELINDUNG DIRI (APD) */}
      {/* ============================================================== */}
      <div className="border-b border-black">
        <div className="bg-[#198744] text-white px-2 py-0.5 font-bold text-[10px] uppercase tracking-wide border-b border-black">
          BAGIAN 4 - ALAT PELINDUNG DIRI (diisi OLEH PEJABAT BERWENANG) - CENTANG (√) JIKA DITERAPKAN ( INPUT MENGGUNAKAN SISTEM)
        </div>
        <div className="grid grid-cols-6 divide-x divide-black p-1 text-[9px]">
          {/* Wajib */}
          <div className="px-1 space-y-1">
            <div className="font-bold text-[9px] uppercase border-b border-black pb-0.5 mb-1 text-slate-800">
              Wajib:
            </div>
            {renderCheckbox(data.bagian4.helm, () => updateB4('helm', !data.bagian4.helm), 'Helm')}
            {renderCheckbox(data.bagian4.sepatuSafety, () => updateB4('sepatuSafety', !data.bagian4.sepatuSafety), 'Sepatu Safety')}
            {renderCheckbox(data.bagian4.bajuPanjangCoverAll, () => updateB4('bajuPanjangCoverAll', !data.bagian4.bajuPanjangCoverAll), 'Baju Panjang/Cover All')}
            {renderCheckbox(data.bagian4.kacamataSafety, () => updateB4('kacamataSafety', !data.bagian4.kacamataSafety), 'Kacamata Safety')}
          </div>

          {/* Pelindung Mata, Muka & Badan */}
          <div className="px-1 space-y-1">
            <div className="font-bold text-[9px] uppercase border-b border-black pb-0.5 mb-1 text-slate-800">
              Pelindung Mata, Muka &amp; Badan:
            </div>
            {renderCheckbox(data.bagian4.goggleAntiPercikan, () => updateB4('goggleAntiPercikan', !data.bagian4.goggleAntiPercikan), 'Goggle Anti Percikan')}
            {renderCheckbox(data.bagian4.halfMaskRespirator, () => updateB4('halfMaskRespirator', !data.bagian4.halfMaskRespirator), 'Half Mask Respirator')}
            {renderCheckbox(data.bagian4.fullFaceRespirator, () => updateB4('fullFaceRespirator', !data.bagian4.fullFaceRespirator), 'Full Face Respirator')}
            {renderCheckbox(data.bagian4.kerudungKepala, () => updateB4('kerudungKepala', !data.bagian4.kerudungKepala), 'Kerudung Kepala')}
            {renderCheckbox(data.bagian4.pelindungWajah, () => updateB4('pelindungWajah', !data.bagian4.pelindungWajah), 'Pelindung Wajah')}
            {renderCheckbox(data.bagian4.chemicalApron, () => updateB4('chemicalApron', !data.bagian4.chemicalApron), 'Chemical Apron')}
            {renderCheckbox(data.bagian4.pakaianKimia, () => updateB4('pakaianKimia', !data.bagian4.pakaianKimia), 'Pakaian Kimia')}
            {renderCheckbox(data.bagian4.sepatuKimia, () => updateB4('sepatuKimia', !data.bagian4.sepatuKimia), 'Sepatu Kimia')}
          </div>

          {/* Pelindung Tangan */}
          <div className="px-1 space-y-1">
            <div className="font-bold text-[9px] uppercase border-b border-black pb-0.5 mb-1 text-slate-800">
              Pelindung Tangan:
            </div>
            {renderCheckbox(data.bagian4.sarungTanganKulit, () => updateB4('sarungTanganKulit', !data.bagian4.sarungTanganKulit), 'Sarung Tangan Kulit')}
            {renderCheckbox(data.bagian4.sarungTanganKimia, () => updateB4('sarungTanganKimia', !data.bagian4.sarungTanganKimia), 'Sarung Tangan Kimia')}
            {renderCheckbox(data.bagian4.sarungTanganKatun, () => updateB4('sarungTanganKatun', !data.bagian4.sarungTanganKatun), 'Sarung Tangan Katun')}
          </div>

          {/* Pelindung Pernafasan */}
          <div className="px-1 space-y-1">
            <div className="font-bold text-[9px] uppercase border-b border-black pb-0.5 mb-1 text-slate-800">
              Pelindung Pernafasan:
            </div>
            {renderCheckbox(data.bagian4.scba, () => updateB4('scba', !data.bagian4.scba), 'SCBA')}
            {renderCheckbox(data.bagian4.saluranUdara, () => updateB4('saluranUdara', !data.bagian4.saluranUdara), 'Saluran Udara')}
            {renderCheckbox(data.bagian4.maskerDebu, () => updateB4('maskerDebu', !data.bagian4.maskerDebu), 'Masker Debu')}
          </div>

          {/* Pelindung lain/Jatuh */}
          <div className="px-1 space-y-1">
            <div className="font-bold text-[9px] uppercase border-b border-black pb-0.5 mb-1 text-slate-800">
              Pelindung lain/Jatuh:
            </div>
            {renderCheckbox(data.bagian4.fullBodyHarness, () => updateB4('fullBodyHarness', !data.bagian4.fullBodyHarness), 'Full Body Harness (Double lanyard)')}
            {renderCheckbox(data.bagian4.penangkapJatuhLifeLine, () => updateB4('penangkapJatuhLifeLine', !data.bagian4.penangkapJatuhLifeLine), 'Penangkap Jatuh/life line')}
            {renderCheckbox(data.bagian4.lifeJacketPelampung, () => updateB4('lifeJacketPelampung', !data.bagian4.lifeJacketPelampung), 'Life Jacket/Pelampung')}
            {renderCheckbox(data.bagian4.sabukPengaman, () => updateB4('sabukPengaman', !data.bagian4.sabukPengaman), 'Sabuk Pengaman')}
          </div>

          {/* Pelindung Pendengaran & Lainnya */}
          <div className="px-1 space-y-1">
            <div className="font-bold text-[9px] uppercase border-b border-black pb-0.5 mb-1 text-slate-800">
              Pelindung Pendengaran:
            </div>
            {renderCheckbox(data.bagian4.earPlug, () => updateB4('earPlug', !data.bagian4.earPlug), 'Ear Plug')}
            {renderCheckbox(data.bagian4.earMuff, () => updateB4('earMuff', !data.bagian4.earMuff), 'Ear Muff')}
            <div className="pt-1">
              <span className="font-bold text-[8.5px] block">Alat Pelindung Diri: Lainnya :</span>
              <input
                type="text"
                value={data.bagian4.alatPelindungDiriLainnya}
                disabled={readOnly}
                onChange={(e) => updateB4('alatPelindungDiriLainnya', e.target.value)}
                placeholder="..."
                className="w-full text-[8.5px] border-b border-dotted border-black bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BAGIAN 5: DOKUMEN PENDUKUNG */}
      {/* ============================================================== */}
      <div className="border-b border-black">
        <div className="bg-[#198744] text-white px-2 py-0.5 font-bold text-[10px] uppercase tracking-wide border-b border-black">
          BAGIAN 5 - DOKUMEN PENDUKUNG/DOKUMEN (diisi OLEH PEJABAT BERWENANG) - CENTANG ( √ ) JIKA DITERAPKAN ( INPUT MENGGUNAKAN SISTEM)
        </div>
        <div className="grid grid-cols-4 p-1.5 gap-x-2 text-[9px]">
          {/* Col 1 */}
          <div className="space-y-1">
            {renderCheckbox(data.bagian5.dibutuhkanJsa, () => updateB5('dibutuhkanJsa', !data.bagian5.dibutuhkanJsa), 'Dibutuhkan JSA')}
            {renderCheckbox(data.bagian5.dibutuhkanHira, () => updateB5('dibutuhkanHira', !data.bagian5.dibutuhkanHira), 'Dibutuhkan HIRA')}
            {renderCheckbox(data.bagian5.sertifikatLotoListrik, () => updateB5('sertifikatLotoListrik', !data.bagian5.sertifikatLotoListrik), 'Sertifikat LOTO Listrik')}
            {renderCheckbox(data.bagian5.sertifikatLotoFisik, () => updateB5('sertifikatLotoFisik', !data.bagian5.sertifikatLotoFisik), 'Sertifikat LOTO Fisik')}
            {renderCheckbox(data.bagian5.sertifikatPenggalian, () => updateB5('sertifikatPenggalian', !data.bagian5.sertifikatPenggalian), 'Sertifikat Penggalian')}
          </div>

          {/* Col 2 */}
          <div className="space-y-1">
            {renderCheckbox(data.bagian5.sertifikatScaffolding, () => updateB5('sertifikatScaffolding', !data.bagian5.sertifikatScaffolding), 'Sertifikat Scaffolding')}
            {renderCheckbox(data.bagian5.sertifikatPengangkatan, () => updateB5('sertifikatPengangkatan', !data.bagian5.sertifikatPengangkatan), 'Sertifikat Pengangkatan')}
            {renderCheckbox(data.bagian5.sertifikatRadiasi, () => updateB5('sertifikatRadiasi', !data.bagian5.sertifikatRadiasi), 'Sertifikat Radiasi')}
            {renderCheckbox(data.bagian5.sertifikatRoadObstruction, () => updateB5('sertifikatRoadObstruction', !data.bagian5.sertifikatRoadObstruction), 'Sertifikat Road Obstruction')}
            {renderCheckbox(data.bagian5.sertifikatDosce, () => updateB5('sertifikatDosce', !data.bagian5.sertifikatDosce), 'Sertifikat DoSCE')}
          </div>

          {/* Col 3 */}
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[8.5px]">Vehicle Entry Cert No.</span>
              <input
                type="text"
                value={data.bagian5.vehicleEntryCertNo}
                disabled={readOnly}
                onChange={(e) => updateB5('vehicleEntryCertNo', e.target.value)}
                placeholder="..."
                className="w-24 text-[8.5px] border-b border-black bg-transparent focus:outline-none"
              />
            </div>
            {renderCheckbox(data.bagian5.rencanaPenyelamatan, () => updateB5('rencanaPenyelamatan', !data.bagian5.rencanaPenyelamatan), 'Rencana Penyelamatan')}
            {renderCheckbox(data.bagian5.sertifikatMoc, () => updateB5('sertifikatMoc', !data.bagian5.sertifikatMoc), 'Sertifikat MOC')}
            {renderCheckbox(data.bagian5.lampiranGambarPid, () => updateB5('lampiranGambarPid', !data.bagian5.lampiranGambarPid), 'Lampiran Gambar/P&ID.')}
            {renderCheckbox(data.bagian5.toolboxMeeting, () => updateB5('toolboxMeeting', !data.bagian5.toolboxMeeting), 'Toolbox Meeting')}
          </div>

          {/* Col 4 */}
          <div className="space-y-1">
            <span className="font-bold text-[8.5px] block">Lainnya:</span>
            <textarea
              rows={3}
              value={data.bagian5.lainnya}
              disabled={readOnly}
              onChange={(e) => updateB5('lainnya', e.target.value)}
              placeholder="Dokumen pendukung lainnya..."
              className="w-full text-[8.5px] border border-black p-1 bg-transparent focus:bg-amber-50 focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BAGIAN 6: PERSETUJUAN SEBELUM PEKERJAAN DIMULAI */}
      {/* ============================================================== */}
      <div className="border-b border-black">
        <div className="bg-[#198744] text-white px-2 py-0.5 font-bold text-[10px] uppercase tracking-wide border-b border-black">
          BAGIAN 6 - PERSETUJUAN SEBELUM PEKERJAAN DIMULAI ( INPUT MENGGUNAKAN SISTEM)
        </div>
        <div className="grid grid-cols-2 divide-x divide-black text-[9.5px]">
          {/* Pejabat Berwenang Representative */}
          <div className="p-1.5 flex flex-col justify-between">
            <div className="font-bold text-center border-b border-black pb-0.5 mb-1 bg-slate-50 uppercase text-[9.5px]">
              PEJABAT BERWENANG REPRESENTATIVE / Aproving Authority Representative
            </div>
            <p className="text-[8.5px] leading-tight text-slate-800 italic mb-1 text-center">
              Saya secara pribadi telah memeriksa area dan peralatan yang akan dikerjakan dan saya puas pekerjaan yang diminta dapat dilakukan dengan aman
            </p>
            <div className="grid grid-cols-2 gap-x-2 pt-1">
              <div>
                <span className="font-bold text-[8.5px]">Nama : </span>
                <input
                  type="text"
                  value={data.bagian6.pejabatBerwenangRep.name}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      bagian6: {
                        ...prev.bagian6,
                        pejabatBerwenangRep: { ...prev.bagian6.pejabatBerwenangRep, name: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none font-semibold text-[9.5px]"
                />
                <span className="font-bold text-[8.5px] block mt-1">Jabatan : </span>
                <input
                  type="text"
                  value={data.bagian6.pejabatBerwenangRep.position || ''}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      bagian6: {
                        ...prev.bagian6,
                        pejabatBerwenangRep: { ...prev.bagian6.pejabatBerwenangRep, position: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[9px]"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-bold text-[8.5px]">Tanda tangan :</span>
                  {renderSignatureBox(
                    data.bagian6.pejabatBerwenangRep.signatureImage,
                    'b6-rep',
                    'Approving Authority Representative',
                    data.bagian6.pejabatBerwenangRep.name
                  )}
                </div>
                <div className="mt-1">
                  <span className="font-bold text-[8.5px]">Tanggal/Waktu : </span>
                  <input
                    type="text"
                    value={data.bagian6.pejabatBerwenangRep.dateTime}
                    disabled={readOnly}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        bagian6: {
                          ...prev.bagian6,
                          pejabatBerwenangRep: { ...prev.bagian6.pejabatBerwenangRep, dateTime: e.target.value },
                        },
                      }))
                    }
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pejabat Berwenang / Approving Authority */}
          <div className="p-1.5 flex flex-col justify-between">
            <div className="font-bold text-center border-b border-black pb-0.5 mb-1 bg-slate-50 uppercase text-[9.5px]">
              PEJABAT BERWENANG / Aproving Authority
            </div>
            <p className="text-[8.5px] leading-tight text-slate-800 italic mb-1 text-center">
              Saya telah memeriksa lokasi kerja, menilai bahaya yg terkait dengan pekerjaan tersebut dan memastikan ada kontrol. Saya puas, pekerjaan dapat dilakukan dg aman
            </p>
            <div className="grid grid-cols-2 gap-x-2 pt-1">
              <div>
                <span className="font-bold text-[8.5px]">Nama : </span>
                <input
                  type="text"
                  value={data.bagian6.pejabatBerwenangApprover.name}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      bagian6: {
                        ...prev.bagian6,
                        pejabatBerwenangApprover: { ...prev.bagian6.pejabatBerwenangApprover, name: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none font-semibold text-[9.5px]"
                />
                <span className="font-bold text-[8.5px] block mt-1">Jabatan : </span>
                <input
                  type="text"
                  value={data.bagian6.pejabatBerwenangApprover.position || ''}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      bagian6: {
                        ...prev.bagian6,
                        pejabatBerwenangApprover: { ...prev.bagian6.pejabatBerwenangApprover, position: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[9px]"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-bold text-[8.5px]">Tanda tangan :</span>
                  {renderSignatureBox(
                    data.bagian6.pejabatBerwenangApprover.signatureImage,
                    'b6-approver',
                    'Approving Authority (Pejabat Berwenang)',
                    data.bagian6.pejabatBerwenangApprover.name
                  )}
                </div>
                <div className="mt-1">
                  <span className="font-bold text-[8.5px]">Tanggal/Waktu : </span>
                  <input
                    type="text"
                    value={data.bagian6.pejabatBerwenangApprover.dateTime}
                    disabled={readOnly}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        bagian6: {
                          ...prev.bagian6,
                          pejabatBerwenangApprover: { ...prev.bagian6.pejabatBerwenangApprover, dateTime: e.target.value },
                        },
                      }))
                    }
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BAGIAN 7: PEMOHON MENYETUJUI SETELAH PERMIT DIKELUARKAN */}
      {/* ============================================================== */}
      <div className="border-b border-black">
        <div className="bg-[#198744] text-white px-2 py-0.5 font-bold text-[10px] uppercase tracking-wide border-b border-black">
          BAGIAN 7- PEMOHON MENYETUJUI DAN MENANDATANGANI SETELAH PERMIT DI KELUARKAN OLEH PEJABAT BERWENANG ( DIISI MANUAL)
        </div>
        <div className="grid grid-cols-2 divide-x divide-black text-[9.5px]">
          {/* Pemohon / Contractor */}
          <div className="p-1.5 flex flex-col justify-between">
            <div className="font-bold text-center border-b border-black pb-0.5 mb-1 bg-slate-50 uppercase text-[9.5px]">
              PEMOHON/CONTRACTOR
            </div>
            <p className="text-[8.5px] leading-tight text-slate-800 italic mb-1 text-center">
              Saya memahami kondisi dan tindakan pencegahan sebagaimana disebutkan di atas dan setuju untuk mematuhinya dan menjelaskannya kepada semua orang yang bekerja dalam pekerjaan ini.
            </p>
            <div className="grid grid-cols-2 gap-x-2 pt-1">
              <div>
                <span className="font-bold text-[8.5px]">Nama : </span>
                <input
                  type="text"
                  value={data.bagian7.pemohonContractor.nama}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      bagian7: {
                        ...prev.bagian7,
                        pemohonContractor: { ...prev.bagian7.pemohonContractor, nama: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none font-semibold text-[9.5px]"
                />
                <span className="font-bold text-[8.5px] block mt-1">Tanggal : </span>
                <input
                  type="text"
                  value={data.bagian7.pemohonContractor.tanggal}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      bagian7: {
                        ...prev.bagian7,
                        pemohonContractor: { ...prev.bagian7.pemohonContractor, tanggal: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-bold text-[8.5px]">Tanda tangan :</span>
                  {renderSignatureBox(
                    data.bagian7.pemohonContractor.signatureImage,
                    'b7-contractor',
                    'Pemohon / Contractor (Bagian 7)',
                    data.bagian7.pemohonContractor.nama
                  )}
                </div>
                <div className="mt-1">
                  <span className="font-bold text-[8.5px]">Waktu : </span>
                  <input
                    type="text"
                    value={data.bagian7.pemohonContractor.waktu}
                    disabled={readOnly}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        bagian7: {
                          ...prev.bagian7,
                          pemohonContractor: { ...prev.bagian7.pemohonContractor, waktu: e.target.value },
                        },
                      }))
                    }
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pemilik Pekerjaan */}
          <div className="p-1.5 flex flex-col justify-between">
            <div className="font-bold text-center border-b border-black pb-0.5 mb-1 bg-slate-50 uppercase text-[9.5px]">
              PEMILIK PEKERJAAN
            </div>
            <p className="text-[8.5px] leading-tight text-slate-800 italic mb-1 text-center">
              Saya telah memeriksa lokasi kerja, dan melakukan Tool Box meeting dengan team dilapangan.
            </p>
            <div className="grid grid-cols-2 gap-x-2 pt-1">
              <div>
                <span className="font-bold text-[8.5px]">Nama : </span>
                <input
                  type="text"
                  value={data.bagian7.pemilikPekerjaan.nama}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      bagian7: {
                        ...prev.bagian7,
                        pemilikPekerjaan: { ...prev.bagian7.pemilikPekerjaan, nama: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none font-semibold text-[9.5px]"
                />
                <span className="font-bold text-[8.5px] block mt-1">Tanggal : </span>
                <input
                  type="text"
                  value={data.bagian7.pemilikPekerjaan.tanggal}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      bagian7: {
                        ...prev.bagian7,
                        pemilikPekerjaan: { ...prev.bagian7.pemilikPekerjaan, tanggal: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-bold text-[8.5px]">Tanda tangan :</span>
                  {renderSignatureBox(
                    data.bagian7.pemilikPekerjaan.signatureImage,
                    'b7-pemilik',
                    'Pemilik Pekerjaan (Bagian 7)',
                    data.bagian7.pemilikPekerjaan.nama
                  )}
                </div>
                <div className="mt-1">
                  <span className="font-bold text-[8.5px]">Waktu : </span>
                  <input
                    type="text"
                    value={data.bagian7.pemilikPekerjaan.waktu}
                    disabled={readOnly}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        bagian7: {
                          ...prev.bagian7,
                          pemilikPekerjaan: { ...prev.bagian7.pemilikPekerjaan, waktu: e.target.value },
                        },
                      }))
                    }
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BAGIAN 8: PERMIT INSPECTION */}
      {/* ============================================================== */}
      <div className="border-b border-black">
        <div className="bg-[#198744] text-white px-2 py-0.5 font-bold text-[10px] uppercase tracking-wide border-b border-black">
          BAGIAN 8 - PERMIT INSPECTION (DIISI MANUAL DI LAPANGAN)
        </div>
        <div className="grid grid-cols-6 divide-x divide-black text-[9px]">
          {/* 5 Inspection department columns */}
          {data.bagian8.inspections.map((col, idx) => (
            <div key={idx} className="p-1 flex flex-col justify-between min-h-[90px]">
              <div>
                <div className="font-bold text-center border-b border-black pb-0.5 mb-1 bg-slate-50 uppercase text-[8.5px]">
                  {col.department}
                </div>
                <div>
                  <span className="font-bold text-[8px]">Nama: </span>
                  <input
                    type="text"
                    value={col.nama}
                    disabled={readOnly}
                    onChange={(e) => {
                      const newInspections = [...data.bagian8.inspections];
                      newInspections[idx] = { ...col, nama: e.target.value };
                      onChange((p) => ({
                        ...p,
                        bagian8: { ...p.bagian8, inspections: newInspections },
                      }));
                    }}
                    placeholder="..."
                    className="w-full text-[8.5px] border-b border-dotted border-black bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <span className="font-bold text-[8px] block mt-0.5">Tanda Tangan :</span>
                {renderSignatureBox(
                  col.tandaTangan,
                  `b8-${idx}`,
                  `Inspeksi ${col.department}`,
                  col.nama,
                  'h-8'
                )}
                <div className="mt-1">
                  <span className="font-bold text-[8px]">Tgl/Waktu : </span>
                  <input
                    type="text"
                    value={col.tglWaktu}
                    disabled={readOnly}
                    onChange={(e) => {
                      const newInspections = [...data.bagian8.inspections];
                      newInspections[idx] = { ...col, tglWaktu: e.target.value };
                      onChange((p) => ({
                        ...p,
                        bagian8: { ...p.bagian8, inspections: newInspections },
                      }));
                    }}
                    placeholder="..."
                    className="w-full text-[8px] border-b border-dotted border-black bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Col 6: Catatan Inspeksi */}
          <div className="p-1 flex flex-col justify-between">
            <div className="font-bold text-center border-b border-black pb-0.5 mb-1 bg-slate-50 uppercase text-[8.5px]">
              CATATAN INSPEKSI
            </div>
            <textarea
              rows={4}
              value={data.bagian8.catatanInspeksi}
              disabled={readOnly}
              onChange={(e) =>
                onChange((p) => ({
                  ...p,
                  bagian8: { ...p.bagian8, catatanInspeksi: e.target.value },
                }))
              }
              placeholder="Catatan hasil inspeksi..."
              className="w-full h-full text-[8.5px] bg-transparent focus:bg-amber-50 focus:outline-none resize-none p-0.5 leading-tight"
            />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BAGIAN 9 & BAGIAN 10: SIDE BY SIDE AS SHOWN IN PDF */}
      {/* ============================================================== */}
      <div className="border-b border-black grid grid-cols-12 divide-x divide-black">
        {/* BAGIAN 9 (Left, col-span-7) */}
        <div className="col-span-7 flex flex-col justify-between">
          <div className="bg-[#198744] text-white px-2 py-0.5 font-bold text-[10px] uppercase tracking-wide border-b border-black">
            BAGIAN 9 - REVALIDASI / PENGAJUAN PERPANJANGAN (DIISI MANUAL)
          </div>

          <div className="divide-y divide-black text-[8.5px]">
            {/* Header sub-row */}
            <div className="grid grid-cols-12 font-bold text-center bg-slate-50 divide-x divide-black py-0.5">
              <div className="col-span-3">SAMPAI: TANGGAL &amp; JAM</div>
              <div className="col-span-9">DISETUJUI OLEH :</div>
            </div>

            <div className="grid grid-cols-12 font-semibold text-center divide-x divide-black py-0.5 bg-slate-100/60 text-[8px]">
              <div className="col-span-3">TGL / JAM</div>
              <div className="col-span-3">PEJABAT BERWENANG</div>
              <div className="col-span-3">PEMOHON</div>
              <div className="col-span-3">PEMILIK PEKERJAAN</div>
            </div>

            {/* Revalidation Rows */}
            {data.bagian9.rows.map((row, rIdx) => (
              <div key={row.id} className="grid grid-cols-12 divide-x divide-black p-1 text-[8px]">
                {/* Sampai: Tanggal & Jam */}
                <div className="col-span-3 space-y-1 pr-1">
                  <div>
                    <span className="font-bold">TANGGAL:</span>
                    <input
                      type="text"
                      value={row.sampaiTanggal}
                      disabled={readOnly}
                      onChange={(e) => {
                        const newRows = [...data.bagian9.rows];
                        newRows[rIdx] = { ...row, sampaiTanggal: e.target.value };
                        onChange((p) => ({ ...p, bagian9: { rows: newRows } }));
                      }}
                      placeholder="DD/MM/YYYY"
                      className="w-full border-b border-dotted border-black bg-transparent focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="font-bold">JAM:</span>
                    <input
                      type="text"
                      value={row.sampaiJam}
                      disabled={readOnly}
                      onChange={(e) => {
                        const newRows = [...data.bagian9.rows];
                        newRows[rIdx] = { ...row, sampaiJam: e.target.value };
                        onChange((p) => ({ ...p, bagian9: { rows: newRows } }));
                      }}
                      placeholder="HH:MM WIB"
                      className="w-full border-b border-dotted border-black bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Pejabat Berwenang */}
                <div className="col-span-3 px-1 space-y-0.5">
                  <div className="truncate">
                    <span className="font-bold">Posisi: </span>
                    <input
                      type="text"
                      value={row.pejabatBerwenang.posisi}
                      disabled={readOnly}
                      onChange={(e) => {
                        const newRows = [...data.bagian9.rows];
                        newRows[rIdx] = {
                          ...row,
                          pejabatBerwenang: { ...row.pejabatBerwenang, posisi: e.target.value },
                        };
                        onChange((p) => ({ ...p, bagian9: { rows: newRows } }));
                      }}
                      placeholder="..."
                      className="border-b border-dotted border-black w-20 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="truncate">
                    <span className="font-bold">Nama: </span>
                    <input
                      type="text"
                      value={row.pejabatBerwenang.nama}
                      disabled={readOnly}
                      onChange={(e) => {
                        const newRows = [...data.bagian9.rows];
                        newRows[rIdx] = {
                          ...row,
                          pejabatBerwenang: { ...row.pejabatBerwenang, nama: e.target.value },
                        };
                        onChange((p) => ({ ...p, bagian9: { rows: newRows } }));
                      }}
                      placeholder="..."
                      className="border-b border-dotted border-black w-20 bg-transparent focus:outline-none font-semibold"
                    />
                  </div>
                  {renderSignatureBox(
                    row.pejabatBerwenang.tandaTangan,
                    `b9-pb-${rIdx}`,
                    'Revalidasi - Pejabat Berwenang',
                    row.pejabatBerwenang.nama,
                    'h-7'
                  )}
                  <div className="truncate">
                    <span className="font-bold">Tgl/Waktu: </span>
                    <input
                      type="text"
                      value={row.pejabatBerwenang.tglWaktu}
                      disabled={readOnly}
                      onChange={(e) => {
                        const newRows = [...data.bagian9.rows];
                        newRows[rIdx] = {
                          ...row,
                          pejabatBerwenang: { ...row.pejabatBerwenang, tglWaktu: e.target.value },
                        };
                        onChange((p) => ({ ...p, bagian9: { rows: newRows } }));
                      }}
                      placeholder="..."
                      className="border-b border-dotted border-black w-16 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Pemohon */}
                <div className="col-span-3 px-1 space-y-0.5">
                  <div className="truncate">
                    <span className="font-bold">Posisi: </span>
                    <input
                      type="text"
                      value={row.pemohon.posisi}
                      disabled={readOnly}
                      onChange={(e) => {
                        const newRows = [...data.bagian9.rows];
                        newRows[rIdx] = {
                          ...row,
                          pemohon: { ...row.pemohon, posisi: e.target.value },
                        };
                        onChange((p) => ({ ...p, bagian9: { rows: newRows } }));
                      }}
                      placeholder="..."
                      className="border-b border-dotted border-black w-20 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="truncate">
                    <span className="font-bold">Nama: </span>
                    <input
                      type="text"
                      value={row.pemohon.nama}
                      disabled={readOnly}
                      onChange={(e) => {
                        const newRows = [...data.bagian9.rows];
                        newRows[rIdx] = {
                          ...row,
                          pemohon: { ...row.pemohon, nama: e.target.value },
                        };
                        onChange((p) => ({ ...p, bagian9: { rows: newRows } }));
                      }}
                      placeholder="..."
                      className="border-b border-dotted border-black w-20 bg-transparent focus:outline-none font-semibold"
                    />
                  </div>
                  {renderSignatureBox(
                    row.pemohon.tandaTangan,
                    `b9-pem-${rIdx}`,
                    'Revalidasi - Pemohon',
                    row.pemohon.nama,
                    'h-7'
                  )}
                  <div className="truncate">
                    <span className="font-bold">Tgl/Waktu: </span>
                    <input
                      type="text"
                      value={row.pemohon.tglWaktu}
                      disabled={readOnly}
                      onChange={(e) => {
                        const newRows = [...data.bagian9.rows];
                        newRows[rIdx] = {
                          ...row,
                          pemohon: { ...row.pemohon, tglWaktu: e.target.value },
                        };
                        onChange((p) => ({ ...p, bagian9: { rows: newRows } }));
                      }}
                      placeholder="..."
                      className="border-b border-dotted border-black w-16 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Pemilik Pekerjaan */}
                <div className="col-span-3 px-1 space-y-0.5">
                  <div className="truncate">
                    <span className="font-bold">Posisi: </span>
                    <input
                      type="text"
                      value={row.pemilikPekerjaan.posisi}
                      disabled={readOnly}
                      onChange={(e) => {
                        const newRows = [...data.bagian9.rows];
                        newRows[rIdx] = {
                          ...row,
                          pemilikPekerjaan: { ...row.pemilikPekerjaan, posisi: e.target.value },
                        };
                        onChange((p) => ({ ...p, bagian9: { rows: newRows } }));
                      }}
                      placeholder="..."
                      className="border-b border-dotted border-black w-20 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="truncate">
                    <span className="font-bold">Nama: </span>
                    <input
                      type="text"
                      value={row.pemilikPekerjaan.nama}
                      disabled={readOnly}
                      onChange={(e) => {
                        const newRows = [...data.bagian9.rows];
                        newRows[rIdx] = {
                          ...row,
                          pemilikPekerjaan: { ...row.pemilikPekerjaan, nama: e.target.value },
                        };
                        onChange((p) => ({ ...p, bagian9: { rows: newRows } }));
                      }}
                      placeholder="..."
                      className="border-b border-dotted border-black w-20 bg-transparent focus:outline-none font-semibold"
                    />
                  </div>
                  {renderSignatureBox(
                    row.pemilikPekerjaan.tandaTangan,
                    `b9-pp-${rIdx}`,
                    'Revalidasi - Pemilik Pekerjaan',
                    row.pemilikPekerjaan.nama,
                    'h-7'
                  )}
                  <div className="truncate">
                    <span className="font-bold">Tgl/Waktu: </span>
                    <input
                      type="text"
                      value={row.pemilikPekerjaan.tglWaktu}
                      disabled={readOnly}
                      onChange={(e) => {
                        const newRows = [...data.bagian9.rows];
                        newRows[rIdx] = {
                          ...row,
                          pemilikPekerjaan: { ...row.pemilikPekerjaan, tglWaktu: e.target.value },
                        };
                        onChange((p) => ({ ...p, bagian9: { rows: newRows } }));
                      }}
                      placeholder="..."
                      className="border-b border-dotted border-black w-16 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BAGIAN 10 (Right, col-span-5) */}
        <div className="col-span-5 flex flex-col justify-between">
          <div className="bg-[#198744] text-white px-2 py-0.5 font-bold text-[10px] uppercase tracking-wide border-b border-black">
            BAGIAN 10 - PERNYATAAN IZIN KERJA HARI INI SELESAI (DIISI MANUAL)
          </div>

          <div className="grid grid-cols-2 divide-x divide-black p-1.5 text-[9px] h-full items-stretch">
            {/* Left box: Site Spv / Pemohon details */}
            <div className="space-y-1 pr-1.5 flex flex-col justify-between">
              <div>
                <div className="font-bold text-[8.5px] uppercase border-b border-black pb-0.5 mb-1 bg-slate-50 text-center">
                  PEKERJAAN HARI INI SELESAI
                  <span className="block text-[7.5px] font-normal text-slate-700">SITE SPV./PEMOHON</span>
                </div>
                <div>
                  <span className="font-bold text-[8px]">Posisi: </span>
                  <input
                    type="text"
                    value={data.bagian10.posisi}
                    disabled={readOnly}
                    onChange={(e) => updateB10('posisi', e.target.value)}
                    placeholder="..."
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                  />
                </div>
                <div className="mt-0.5">
                  <span className="font-bold text-[8px]">Nama: </span>
                  <input
                    type="text"
                    value={data.bagian10.nama}
                    disabled={readOnly}
                    onChange={(e) => updateB10('nama', e.target.value)}
                    placeholder="..."
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none font-semibold text-[8.5px]"
                  />
                </div>
              </div>

              <div>
                <span className="font-bold text-[8px] block mt-0.5">Tanda Tangan :</span>
                {renderSignatureBox(
                  data.bagian10.tandaTangan,
                  'b10-spv',
                  'Pernyataan Hari Ini Selesai (Bagian 10)',
                  data.bagian10.nama,
                  'h-8'
                )}
                <div className="mt-1">
                  <span className="font-bold text-[8px]">Tgl/Waktu : </span>
                  <input
                    type="text"
                    value={data.bagian10.tglWaktu}
                    disabled={readOnly}
                    onChange={(e) => updateB10('tglWaktu', e.target.value)}
                    placeholder="..."
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8px]"
                  />
                </div>
              </div>
            </div>

            {/* Right box: 4 checkboxes */}
            <div className="pl-1.5 space-y-2 flex flex-col justify-center">
              {renderCheckbox(
                data.bagian10.pekerjaanHariIniSelesai,
                () => updateB10('pekerjaanHariIniSelesai', !data.bagian10.pekerjaanHariIniSelesai),
                'Pekerjaan Hari ini Selesai'
              )}
              {renderCheckbox(
                data.bagian10.pembersihanAreaDiselesaikan,
                () => updateB10('pembersihanAreaDiselesaikan', !data.bagian10.pembersihanAreaDiselesaikan),
                'Pembersihan Area DiselesaikaN'
              )}
              {renderCheckbox(
                data.bagian10.formIzinDikembalikan,
                () => updateB10('formIzinDikembalikan', !data.bagian10.formIzinDikembalikan),
                'Form Izin dikembalikan'
              )}
              {renderCheckbox(
                data.bagian10.formToolBoxDikembalikan,
                () => updateB10('formToolBoxDikembalikan', !data.bagian10.formToolBoxDikembalikan),
                'Form Tool Box Dikembalikan'
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BAGIAN 11: SERAH TERIMA / PENGEMBALIAN PERMIT */}
      {/* ============================================================== */}
      <div className="border-b-2 border-black">
        <div className="bg-[#198744] text-white px-2 py-0.5 font-bold text-[10px] uppercase tracking-wide border-b border-black">
          BAGIAN 11 - SERAH TERIMA /PENGEMBALIAN PERMIT ( INPUT MENGGUNAKAN SISTEM)
        </div>
        <div className="grid grid-cols-2 divide-x divide-black text-[9.5px]">
          {/* Pemilik Pekerjaan */}
          <div className="p-1.5 flex flex-col justify-between">
            <div className="font-bold text-center border-b border-black pb-0.5 mb-1 bg-slate-50 uppercase text-[9.5px]">
              PEMILIK PEKERJAAN
            </div>
            <p className="text-[8.5px] leading-tight text-slate-800 italic mb-1 text-center">
              Saya telah setuju menyelesaikan pekerjaan sesuai dengan jam berikut dan akan melakukan housekeeping serta sistem dikembalikan dalam keadaan aman / normal
            </p>
            <div className="grid grid-cols-2 gap-x-2 pt-1">
              <div>
                <span className="font-bold text-[8px] block">Tanggal Approve : </span>
                <input
                  type="text"
                  value={data.bagian11.pemilikPekerjaan.tanggalApprove}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((p) => ({
                      ...p,
                      bagian11: {
                        ...p.bagian11,
                        pemilikPekerjaan: { ...p.bagian11.pemilikPekerjaan, tanggalApprove: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                />
                <span className="font-bold text-[8px] block mt-1">Tanggal/Waktu Izin Selesai &amp; dikembalikan : </span>
                <input
                  type="text"
                  value={data.bagian11.pemilikPekerjaan.tanggalWaktuSelesaiDikembalikan}
                  disabled={readOnly}
                  onChange={(e) =>
                    onChange((p) => ({
                      ...p,
                      bagian11: {
                        ...p.bagian11,
                        pemilikPekerjaan: { ...p.bagian11.pemilikPekerjaan, tanggalWaktuSelesaiDikembalikan: e.target.value },
                      },
                    }))
                  }
                  className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-bold text-[8px]">Nama : </span>
                  <input
                    type="text"
                    value={data.bagian11.pemilikPekerjaan.nama}
                    disabled={readOnly}
                    onChange={(e) =>
                      onChange((p) => ({
                        ...p,
                        bagian11: {
                          ...p.bagian11,
                          pemilikPekerjaan: { ...p.bagian11.pemilikPekerjaan, nama: e.target.value },
                        },
                      }))
                    }
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none font-semibold text-[9px]"
                  />
                  <span className="font-bold text-[8px] block mt-0.5">Jabatan : </span>
                  <input
                    type="text"
                    value={data.bagian11.pemilikPekerjaan.jabatan}
                    disabled={readOnly}
                    onChange={(e) =>
                      onChange((p) => ({
                        ...p,
                        bagian11: {
                          ...p.bagian11,
                          pemilikPekerjaan: { ...p.bagian11.pemilikPekerjaan, jabatan: e.target.value },
                        },
                      }))
                    }
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                  />
                </div>
                <div className="mt-1">
                  {renderSignatureBox(
                    data.bagian11.pemilikPekerjaan.tandaTangan,
                    'b11-pemilik',
                    'Serah Terima - Pemilik Pekerjaan',
                    data.bagian11.pemilikPekerjaan.nama,
                    'h-7'
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pejabat Berwenang / Approving Authority */}
          <div className="p-1.5 flex flex-col justify-between">
            <div className="font-bold text-center border-b border-black pb-0.5 mb-1 bg-slate-50 uppercase text-[9.5px]">
              PEJABAT BERWENANG / Aproving Authority
            </div>
            <p className="text-[8.5px] leading-tight text-slate-800 italic mb-1 text-center">
              Saya telah memeriksa lokasi kerja telah di-housekeeping dan sistem dikembalikan dalam keadaan normal. Form dibawah berikut telah dikembalikan:
            </p>
            <div className="grid grid-cols-2 gap-x-2 pt-1">
              <div className="space-y-1.5">
                {renderCheckbox(
                  data.bagian11.pejabatBerwenang.formIzinDikembalikan,
                  () =>
                    onChange((p) => ({
                      ...p,
                      bagian11: {
                        ...p.bagian11,
                        pejabatBerwenang: {
                          ...p.bagian11.pejabatBerwenang,
                          formIzinDikembalikan: !p.bagian11.pejabatBerwenang.formIzinDikembalikan,
                        },
                      },
                    })),
                  'Form Izin dikembalikan'
                )}
                {renderCheckbox(
                  data.bagian11.pejabatBerwenang.formToolBoxDikembalikan,
                  () =>
                    onChange((p) => ({
                      ...p,
                      bagian11: {
                        ...p.bagian11,
                        pejabatBerwenang: {
                          ...p.bagian11.pejabatBerwenang,
                          formToolBoxDikembalikan: !p.bagian11.pejabatBerwenang.formToolBoxDikembalikan,
                        },
                      },
                    })),
                  'Form Tool Box Dikembalikan'
                )}
                <div className="pt-1">
                  <span className="font-bold text-[8px]">Tanggal/Waktu : </span>
                  <input
                    type="text"
                    value={data.bagian11.pejabatBerwenang.tanggalWaktu}
                    disabled={readOnly}
                    onChange={(e) =>
                      onChange((p) => ({
                        ...p,
                        bagian11: {
                          ...p.bagian11,
                          pejabatBerwenang: { ...p.bagian11.pejabatBerwenang, tanggalWaktu: e.target.value },
                        },
                      }))
                    }
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-bold text-[8px]">Nama : </span>
                  <input
                    type="text"
                    value={data.bagian11.pejabatBerwenang.nama}
                    disabled={readOnly}
                    onChange={(e) =>
                      onChange((p) => ({
                        ...p,
                        bagian11: {
                          ...p.bagian11,
                          pejabatBerwenang: { ...p.bagian11.pejabatBerwenang, nama: e.target.value },
                        },
                      }))
                    }
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none font-semibold text-[9px]"
                  />
                  <span className="font-bold text-[8px] block mt-0.5">Jabatan : </span>
                  <input
                    type="text"
                    value={data.bagian11.pejabatBerwenang.jabatan}
                    disabled={readOnly}
                    onChange={(e) =>
                      onChange((p) => ({
                        ...p,
                        bagian11: {
                          ...p.bagian11,
                          pejabatBerwenang: { ...p.bagian11.pejabatBerwenang, jabatan: e.target.value },
                        },
                      }))
                    }
                    className="border-b border-dotted border-black w-full bg-transparent focus:outline-none text-[8.5px]"
                  />
                </div>
                <div className="mt-1">
                  {renderSignatureBox(
                    data.bagian11.pejabatBerwenang.tandaTangan,
                    'b11-pejabat',
                    'Serah Terima - Pejabat Berwenang',
                    data.bagian11.pejabatBerwenang.nama,
                    'h-7'
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM FOOTER WARNING BAR (RED) */}
      {/* ============================================================== */}
      <div className="bg-[#b91c1c] text-white py-1.5 px-3 text-center font-black text-[10px] tracking-widest uppercase border-t border-black">
        STOP BEKERJA DAN EVAKUASI AREA KETIKA MENDENGAR ALARM BAHAYA
      </div>
    </div>
  );
};
