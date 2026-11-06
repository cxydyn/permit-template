export interface SignatureData {
  name: string;
  position?: string;
  signatureImage?: string; // base64 or drawn svg dataUrl
  dateTime: string;
}

export interface Bagian1Data {
  namaPemohon: string;
  detailDeskripsiPekerjaan: string;
  noWoPo: string;
  kontraktor: string;
  lokasiFasilitas: string;
  peralatanYangDigunakan: string;
  perkiraanWaktuMulaiKerja: string;
  pengawas: string;
  noPeralatan: string;
  jumlahPekerjaYangTerlibat: string;
  berlakuSampai: string;
  departemen: string;
  emailPemohon: string;
  pemilikPekerjaan: SignatureData;
  teknisiBerwenang: SignatureData;
}

export interface Bagian2Data {
  nitrogen: boolean;
  pengangkatanManual: boolean;
  bekerjaDiKetinggian: boolean;
  objekPanas: boolean;
  ergonomi: boolean;
  bahayaTekanan: boolean;
  bahayaTekananValue: string; // e.g. "3.5" Barg
  kimia: boolean;
  penggalianManual: boolean;
  interlockBypass: boolean;
  gergajiColdCut: boolean;
  bahayaBiologi: boolean;
  debu: boolean;
  scaffolding: boolean;
  bising: boolean;
  korosif: boolean;
  terceburKeAirLaut: boolean;
  memakaiHandTools: boolean;
  bendaJatuh: boolean;
  listrikStatis: boolean;
  beracun: boolean;
  lainnya: string;
}

export interface Bagian3Data {
  peralatanValveDiIsolasiTag: boolean;
  peralatanPipaDiDepressurized: boolean;
  penghalangHarusDipasang: boolean;
  kontrakAreaCcrKetikaSelesai: boolean;
  lmra: boolean;
  valveDiRantaiBukaTutup: boolean;
  peralatanPipaDikuras: boolean;
  dibutuhkanTandaPeringatan: boolean;
  disetujuiPeralatanDiperiksa: boolean;
  jikaAdaPencegahanLainnya: string;
  peralatanPipaDitutupBlind: boolean;
  dibersihkanN2AtauUap: boolean;
  peralatanAmanDariKejatuhanMater: boolean;
  terisolasiSecaraElektrik: boolean;
  perpipaanDiPutus: boolean;
  dibilasOlehAir: boolean;
  kontakAreaCcrSebelumMulai: boolean;
}

export interface Bagian4Data {
  // Wajib
  helm: boolean;
  sepatuSafety: boolean;
  bajuPanjangCoverAll: boolean;
  kacamataSafety: boolean;
  // Pelindung Mata, Muka & Badan
  goggleAntiPercikan: boolean;
  halfMaskRespirator: boolean;
  fullFaceRespirator: boolean;
  kerudungKepala: boolean;
  pelindungWajah: boolean;
  chemicalApron: boolean;
  pakaianKimia: boolean;
  sepatuKimia: boolean;
  // Pelindung Tangan
  sarungTanganKulit: boolean;
  sarungTanganKimia: boolean;
  sarungTanganKatun: boolean;
  // Pelindung Pernafasan
  scba: boolean;
  saluranUdara: boolean;
  maskerDebu: boolean;
  // Pelindung lain / Jatuh
  fullBodyHarness: boolean;
  penangkapJatuhLifeLine: boolean;
  lifeJacketPelampung: boolean;
  sabukPengaman: boolean;
  // Pelindung Pendengaran
  earPlug: boolean;
  earMuff: boolean;
  alatPelindungDiriLainnya: string;
}

export interface Bagian5Data {
  dibutuhkanJsa: boolean;
  dibutuhkanHira: boolean;
  sertifikatLotoListrik: boolean;
  sertifikatLotoFisik: boolean;
  sertifikatPenggalian: boolean;
  sertifikatScaffolding: boolean;
  sertifikatPengangkatan: boolean;
  sertifikatRadiasi: boolean;
  sertifikatRoadObstruction: boolean;
  sertifikatDosce: boolean;
  vehicleEntryCertNo: string;
  rencanaPenyelamatan: boolean;
  sertifikatMoc: boolean;
  lampiranGambarPid: boolean;
  toolboxMeeting: boolean;
  lainnya: string;
}

export interface Bagian6Data {
  pejabatBerwenangRep: SignatureData;
  pejabatBerwenangApprover: SignatureData;
}

export interface Bagian7Data {
  pemohonContractor: {
    nama: string;
    tanggal: string;
    waktu: string;
    signatureImage?: string;
  };
  pemilikPekerjaan: {
    nama: string;
    tanggal: string;
    waktu: string;
    signatureImage?: string;
  };
}

export interface InspectionColumn {
  department: string;
  nama: string;
  tandaTangan?: string;
  tglWaktu: string;
}

export interface Bagian8Data {
  inspections: InspectionColumn[];
  catatanInspeksi: string;
}

export interface RevalidationRow {
  id: string;
  sampaiTanggal: string;
  sampaiJam: string;
  pejabatBerwenang: {
    posisi: string;
    nama: string;
    tandaTangan?: string;
    tglWaktu: string;
  };
  pemohon: {
    posisi: string;
    nama: string;
    tandaTangan?: string;
    tglWaktu: string;
  };
  pemilikPekerjaan: {
    posisi: string;
    nama: string;
    tandaTangan?: string;
    tglWaktu: string;
  };
}

export interface Bagian9Data {
  rows: RevalidationRow[];
}

export interface Bagian10Data {
  posisi: string;
  nama: string;
  tandaTangan?: string;
  tglWaktu: string;
  pekerjaanHariIniSelesai: boolean;
  pembersihanAreaDiselesaikan: boolean;
  formIzinDikembalikan: boolean;
  formToolBoxDikembalikan: boolean;
}

export interface Bagian11Data {
  pemilikPekerjaan: {
    tanggalApprove: string;
    tanggalWaktuSelesaiDikembalikan: string;
    nama: string;
    jabatan: string;
    tandaTangan?: string;
  };
  pejabatBerwenang: {
    formIzinDikembalikan: boolean;
    formToolBoxDikembalikan: boolean;
    nama: string;
    jabatan: string;
    tandaTangan?: string;
    tanggalWaktu: string;
  };
}

export interface PermitData {
  id: string;
  nomorIzin: string;
  documentRef: string; // INA-VTJ-SHEF-001
  status: 'Draft' | 'Menunggu Persetujuan' | 'Disetujui / Aktif' | 'Selesai & Ditutup';
  createdAt: string;
  updatedAt: string;
  bagian1: Bagian1Data;
  bagian2: Bagian2Data;
  bagian3: Bagian3Data;
  bagian4: Bagian4Data;
  bagian5: Bagian5Data;
  bagian6: Bagian6Data;
  bagian7: Bagian7Data;
  bagian8: Bagian8Data;
  bagian9: Bagian9Data;
  bagian10: Bagian10Data;
  bagian11: Bagian11Data;
}
