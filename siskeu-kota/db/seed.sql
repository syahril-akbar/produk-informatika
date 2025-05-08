-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert sample desa data
INSERT INTO desa (
  id, 
  nama, 
  alamat, 
  telepon, 
  email, 
  website, 
  luas_wilayah, 
  jumlah_dusun, 
  jumlah_rw, 
  jumlah_rt, 
  batas_utara, 
  batas_selatan, 
  batas_timur, 
  batas_barat, 
  sejarah
) VALUES (
  uuid_generate_v4(), 
  'Desa Sukamaju', 
  'Jl. Raya Sukamaju No. 123, Kecamatan Sukamaju, Kabupaten Sukamaju, Provinsi Jawa Tengah', 
  '(0123) 456789', 
  'info@desasukamaju.id', 
  'www.desasukamaju.id', 
  5.25, 
  5, 
  10, 
  25, 
  'Desa Harapan', 
  'Desa Makmur', 
  'Desa Sejahtera', 
  'Desa Damai', 
  'Desa Sukamaju didirikan pada tahun 1945 setelah kemerdekaan Indonesia. Awalnya merupakan pemukiman kecil yang kemudian berkembang menjadi desa yang makmur. Nama Sukamaju berasal dari kata "suka" yang berarti senang dan "maju" yang berarti berkembang, mencerminkan harapan pendiri desa agar masyarakatnya selalu senang dan terus berkembang.'
);

-- Get the desa_id to use in other tables
DO $$
DECLARE
  desa_id UUID;
  user_id UUID;
BEGIN
  -- Get the desa_id
  SELECT id INTO desa_id FROM desa WHERE nama = 'Desa Sukamaju' LIMIT 1;

  -- Insert sample transaksi data
  INSERT INTO transaksi (
    desa_id, 
    tanggal, 
    keterangan, 
    kategori, 
    jumlah, 
    status, 
    sumber, 
    tahun
  ) VALUES 
  (desa_id, '2023-07-15', 'Pencairan Dana Desa Tahap 1', 'Dana Desa', 250000000, 'pendapatan', 'Kementerian Keuangan', '2023'),
  (desa_id, '2023-07-12', 'Pembayaran Proyek Jalan', 'Infrastruktur', 75000000, 'pengeluaran', 'Dana Desa', '2023'),
  (desa_id, '2023-07-10', 'Pembayaran Honor Perangkat Desa', 'Administrasi', 15000000, 'pengeluaran', 'PAD', '2023'),
  (desa_id, '2023-07-05', 'Pendapatan Asli Desa', 'PAD', 35000000, 'pendapatan', 'Retribusi Desa', '2023'),
  (desa_id, '2023-07-03', 'Pembelian Alat Kesehatan Posyandu', 'Kesehatan', 8500000, 'pengeluaran', 'Dana Desa', '2023'),
  (desa_id, '2023-06-28', 'Pembayaran ATK Kantor Desa', 'Administrasi', 3500000, 'pengeluaran', 'Dana Desa', '2023'),
  (desa_id, '2023-06-15', 'Perbaikan Jembatan Dusun Makmur', 'Infrastruktur', 45000000, 'pengeluaran', 'Dana Desa', '2023'),
  (desa_id, '2023-06-10', 'Pencairan Bantuan Provinsi', 'Bantuan', 100000000, 'pendapatan', 'Pemerintah Provinsi', '2023'),
  (desa_id, '2023-05-20', 'Pembelian Komputer Kantor Desa', 'Administrasi', 12000000, 'pengeluaran', 'PAD', '2023'),
  (desa_id, '2023-05-15', 'Pembangunan Posyandu', 'Kesehatan', 60000000, 'pengeluaran', 'Dana Desa', '2023');

  -- Insert sample dokumen data
  INSERT INTO dokumen (
    desa_id, 
    nomor, 
    judul, 
    kategori, 
    tanggal, 
    status, 
    pembuat
  ) VALUES 
  (desa_id, 'SK/001/VII/2023', 'SK Pengangkatan Perangkat Desa', 'Surat Keputusan', '2023-07-15', 'aktif', 'Kepala Desa'),
  (desa_id, 'PD/002/VII/2023', 'Peraturan Desa tentang APBDes 2023', 'Peraturan Desa', '2023-07-10', 'aktif', 'BPD'),
  (desa_id, 'SK/003/VI/2023', 'SK Pembentukan Panitia HUT RI', 'Surat Keputusan', '2023-06-25', 'aktif', 'Kepala Desa'),
  (desa_id, 'LK/001/VI/2023', 'Laporan Keuangan Semester 1 2023', 'Laporan', '2023-06-30', 'aktif', 'Bendahara');

  -- Insert sample laporan data
  INSERT INTO laporan (
    desa_id, 
    judul, 
    jenis, 
    periode, 
    tanggal, 
    pembuat, 
    status
  ) VALUES 
  (desa_id, 'Laporan Keuangan Bulanan Juni 2023', 'Keuangan', 'Bulanan', '2023-07-05', 'Bendahara', 'disetujui'),
  (desa_id, 'Laporan Kegiatan Posyandu Juni 2023', 'Kegiatan', 'Bulanan', '2023-07-03', 'Kader Posyandu', 'disetujui'),
  (desa_id, 'Laporan Realisasi APBDes Triwulan 2 2023', 'Keuangan', 'Triwulan', '2023-07-10', 'Bendahara', 'final');

  -- Insert sample penduduk data
  INSERT INTO penduduk (
    desa_id, 
    nik, 
    nama, 
    tempat_lahir, 
    tanggal_lahir, 
    jenis_kelamin, 
    alamat, 
    rt, 
    rw, 
    agama, 
    status_perkawinan, 
    pekerjaan, 
    kewarganegaraan
  ) VALUES 
  (desa_id, '3301234567890001', 'Budi Santoso', 'Sukamaju', '1980-05-15', 'L', 'Dusun Makmur', '001', '001', 'Islam', 'Kawin', 'Petani', 'WNI'),
  (desa_id, '3301234567890002', 'Siti Rahayu', 'Sukamaju', '1985-10-20', 'P', 'Dusun Makmur', '001', '001', 'Islam', 'Kawin', 'Guru', 'WNI'),
  (desa_id, '3301234567890003', 'Ahmad Hidayat', 'Sukamaju', '1975-03-10', 'L', 'Dusun Sejahtera', '002', '002', 'Islam', 'Kawin', 'Wiraswasta', 'WNI');
END $$;
