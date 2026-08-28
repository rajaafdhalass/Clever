import { LessonChapter } from '../types';

export const LESSONS_DATA: LessonChapter[] = [
  // === SD KELAS 5 MATEMATIKA ===
  {
    id: 'sd-k5-mat-1',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    title: 'FPB dan KPK',
    intro: 'FPB (Faktor Persekutuan Terbesar) adalah faktor pembagi terbesar yang sama dari dua bilangan atau lebih. KPK (Kelipatan Persekutuan Terkecil) adalah kelipatan terkecil yang sama.',
    points: [
      'Faktor adalah bilangan yang dapat membagi habis suatu bilangan tanpa sisa.',
      'Kelipatan adalah hasil perkalian suatu bilangan dengan bilangan asli (1, 2, 3, ...).',
      'Gunakan FPB untuk membagi barang/makanan ke dalam kantong dengan isi sama banyak.',
      'Gunakan KPK untuk menentukan waktu dua peristiwa berulang (seperti jadwal ronda, les, lampu berkedip) terjadi bersamaan lagi.',
      'Metode pohon faktor (faktorisasi prima): FPB ambil faktor prima yang sama dengan pangkat terkecil; KPK ambil semua faktor prima dengan pangkat terbesar.'
    ],
    example: 'Cari FPB dan KPK dari 12 dan 18:\n12 = 2² × 3\n18 = 2 × 3²\nFPB = 2 × 3 = 6\nKPK = 2² × 3² = 4 × 9 = 36',
    formula: 'FPB = Faktor sama pangkat terkecil | KPK = Semua faktor prima pangkat terbesar',
    tags: ['Bilangan', 'Pohon Faktor', 'Aritmatika Dasar']
  },
  {
    id: 'sd-k5-mat-2',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    title: 'Keliling Bangun Datar',
    intro: 'Keliling bangun datar adalah jumlah seluruh panjang sisi terluar yang membatasi bangun datar tersebut.',
    points: [
      'Persegi: Keliling = 4 × sisi (karena keempat sisinya sama panjang).',
      'Persegi Panjang: Keliling = 2 × (panjang + lebar).',
      'Segitiga: Keliling = sisi a + sisi b + sisi c.',
      'Segi Lima Beraturan: Keliling = 5 × sisi.',
      'Segi Enam Beraturan: Keliling = 6 × sisi.',
      'Bangun gabungan: Jumlahkan HANYA sisi-sisi bagian paling luar yang membatasi bentuk gabungan.'
    ],
    example: 'Persegi panjang dengan panjang 15 cm dan lebar 8 cm:\nKeliling = 2 × (15 + 8) = 2 × 23 = 46 cm.',
    formula: 'K_Persegi = 4 × s | K_PersegiPanjang = 2 × (p + l) | K_Segitiga = a + b + c',
    tags: ['Geometri', 'Sisi', 'Panjang']
  },
  {
    id: 'sd-k5-mat-3',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    title: 'Luas Daerah Bangun Datar',
    intro: 'Luas adalah besarnya daerah atau permukaan bidang yang dibatasi oleh batas-batas sisi bangun datar.',
    points: [
      'Persegi: Luas = sisi × sisi (s²).',
      'Persegi Panjang: Luas = panjang × lebar (p × l).',
      'Segitiga: Luas = ½ × alas × tinggi.',
      'Jajar Genjang: Luas = alas × tinggi.',
      'Belah Ketupat & Layang-layang: Luas = ½ × diagonal 1 × diagonal 2.',
      'Trapesium: Luas = ½ × (jumlah sisi sejajar) × tinggi.',
      'Lingkaran: Luas = π × r² (dengan π = 22/7 atau 3,14).'
    ],
    example: 'Segitiga dengan alas 20 cm dan tinggi 16 cm:\nLuas = ½ × 20 × 16 = 160 cm².',
    formula: 'L_Persegi = s² | L_PersegiPanjang = p × l | L_Segitiga = ½ × a × t | L_Lingkaran = π × r²',
    tags: ['Geometri', 'Luas Permukaan', 'Rumus Bangun']
  },
  {
    id: 'sd-k5-mat-4',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    title: 'Bilangan Cacah Sampai 100.000',
    intro: 'Bilangan cacah adalah himpunan bilangan bulat yang tidak negatif, yaitu {0, 1, 2, 3, 4, ...}. Pada materi ini kita menguasai pembacaan, nilai tempat, dan operasi hitung hingga 100.000.',
    points: [
      'Nilai tempat dari kanan ke kiri: Satuan, Puluhan, Ratusan, Ribuan, Puluhan Ribu.',
      'Contoh 78.765: 7 (Puluhan Ribu = 70.000), 8 (Ribuan = 8.000), 7 (Ratusan = 700), 6 (Puluhan = 60), 5 (Satuan = 5).',
      'Membandingkan bilangan: Bandingkan mulai dari angka dengan nilai tempat paling kiri (paling besar).',
      'Dekomposisi bilangan: 17.852 = 10.000 + 7.000 + 800 + 50 + 2.'
    ],
    example: 'Bilangan 28.768 dibaca: "Dua puluh delapan ribu tujuh ratus enam puluh delapan".',
    formula: 'Nilai Bilangan = (Puluhan Ribu × 10.000) + (Ribuan × 1.000) + (Ratusan × 100) + (Puluhan × 10) + Satuan',
    tags: ['Nilai Tempat', 'Operasi Hitung', 'Dekomposisi']
  },

  // === SD KELAS 6 MATEMATIKA ===
  {
    id: 'sd-k6-mat-1',
    level: 'SD',
    grade: 'Kelas 6',
    subject: 'Matematika',
    title: 'Kubus dan Balok',
    intro: 'Kubus dan balok adalah bangun ruang beraturan 3 dimensi yang dibatasi oleh 6 bidang sisi.',
    points: [
      'Kubus: Memiliki 6 sisi persegi yang kongruen, 12 rusuk sama panjang, dan 8 titik sudut.',
      'Balok: Memiliki 6 sisi (3 pasang sisi sejajar berbentuk persegi panjang), 12 rusuk, dan 8 titik sudut.',
      'Jaring-jaring bangun ruang adalah rangkaian bangun datar yang jika dilipat-lipat menurut rusuknya akan membentuk bangun ruang tersebut.',
      'Volume Kubus = s × s × s = s³.',
      'Volume Balok = panjang × lebar × tinggi (p × l × t).'
    ],
    example: 'Dadu memiliki panjang rusuk 8 cm. Volume kubus = 8 × 8 × 8 = 512 cm³.',
    formula: 'V_Kubus = s³ | V_Balok = p × l × t | LP_Kubus = 6 × s² | LP_Balok = 2(pl + pt + lt)',
    tags: ['Bangun Ruang', 'Dimensi Tiga', 'Volume']
  },
  {
    id: 'sd-k6-mat-2',
    level: 'SD',
    grade: 'Kelas 6',
    subject: 'Matematika',
    title: 'Peluang Kejadian',
    intro: 'Peluang (kemungkinan) menyatakan seberapa besar kemungkinan terjadinya suatu peristiwa.',
    points: [
      'Kejadian Pasti: Peluang bernilai 1 (contoh: Matahari terbit dari timur).',
      'Kejadian Mustahil: Peluang bernilai 0 (contoh: Ikan bernapas dengan paru-paru di darat selamanya).',
      'Kejadian Mungkin (Acak): Peluang bernilai antara 0 dan 1.',
      'Rumus Peluang P(A) = Jumlah titik sampel yang diinginkan n(A) ÷ Total ruang sampel n(S).'
    ],
    example: 'Peluang muncul mata dadu 3 dari dadu bersisi 6 adalah 1/6. Peluang muncul angka genap (2, 4, 6) adalah 3/6 = 1/2.',
    formula: 'P(A) = n(A) / n(S)  (di mana 0 ≤ P(A) ≤ 1)',
    tags: ['Probabilitas', 'Statistika Dasar', 'Peluang']
  },
  {
    id: 'sd-k6-mat-3',
    level: 'SD',
    grade: 'Kelas 6',
    subject: 'Matematika',
    title: 'Rasio dan Perbandingan',
    intro: 'Rasio adalah perbandingan antara dua besaran atau kuantitas yang sejenis.',
    points: [
      'Menyederhanakan rasio: Bagi kedua suku dengan FPB dari keduanya (contoh: 12 : 18 = 2 : 3).',
      'Rasio Senilai: Dua rasio bernilai sama, contoh 4 : 5 senilai dengan 8 : 10.',
      'Rasio Satuan: Rasio di mana suku keduanya bernilai 1 (contoh: 24 km dalam 3 jam = 8 km/jam).',
      'Rasio Bagian terhadap Keseluruhan: Contoh dalam kelas ada 12 laki-laki dan 18 perempuan (total 30). Rasio laki-laki terhadap seluruh kelas = 12 : 30 = 2 : 5.'
    ],
    example: 'Perbandingan 6 buku dan 3 pensil = 6 : 3 disederhanakan menjadi 2 : 1.',
    formula: 'Rasio Sederhana = (a ÷ FPB) : (b ÷ FPB)',
    tags: ['Perbandingan', 'Aritmatika', 'Skala']
  },

  // === SMP KELAS 7 - 9 MATEMATIKA & IPA ===
  {
    id: 'smp-k8-mat-1',
    level: 'SMP',
    grade: 'Kelas 8',
    subject: 'Matematika',
    title: 'Teorema Pythagoras',
    intro: 'Teorema Pythagoras berlaku pada segitiga siku-siku, di mana kuadrat sisi miring (hipotenusa) sama dengan jumlah kuadrat kedua sisi siku-sikunya.',
    points: [
      'Sisi miring (c) selalu merupakan sisi terpanjang dan berhadapan langsung dengan sudut 90°.',
      'Rumus dasar: c² = a² + b²',
      'Mencari sisi siku-siku: a² = c² − b² atau b² = c² − a²',
      'Tripel Pythagoras populer: (3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17).'
    ],
    example: 'Segitiga siku-siku memiliki alas 6 cm dan tinggi 8 cm:\nc = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.',
    formula: 'c² = a² + b² ↔ c = √(a² + b²)',
    tags: ['Geometri', 'Segitiga Siku-siku', 'Aljabar']
  },
  {
    id: 'smp-k9-mat-1',
    level: 'SMP',
    grade: 'Kelas 9',
    subject: 'Matematika',
    title: 'Persamaan Kuadrat',
    intro: 'Persamaan kuadrat adalah persamaan matematika berderajat dua dengan bentuk umum ax² + bx + c = 0 (dengan a ≠ 0).',
    points: [
      'Bentuk umum: ax² + bx + c = 0.',
      'Metode penyelesaian: Pemfaktoran, Melengkapkan Kuadrat Sempurna, dan Rumus ABC.',
      'Diskriminan D = b² − 4ac:',
      '• Jika D > 0: Memiliki 2 akar real berbeda.',
      '• Jika D = 0: Memiliki 2 akar kembar (sama).',
      '• Jika D < 0: Tidak memiliki akar real.'
    ],
    example: '3x² − 12x + 9 = 0\nBagi 3: x² − 4x + 3 = 0\n(x − 1)(x − 3) = 0\nAkar-akar: x₁ = 1 atau x₂ = 3.',
    formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
    tags: ['Aljabar', 'Akar Persamaan', 'Diskriminan']
  },
  {
    id: 'smp-k8-ipa-1',
    level: 'SMP',
    grade: 'Kelas 8',
    subject: 'IPA',
    title: 'Hukum Newton tentang Gerak',
    intro: 'Tiga hukum gerak Newton menjelaskan hubungan antara gaya yang bekerja pada suatu benda dan gerak benda tersebut.',
    points: [
      'Hukum I Newton (Kelembaman/Inersia): Benda cenderung mempertahankan keadaannya (diam atau bergerak lurus konstan) jika resultan gaya = 0 (∑F = 0).',
      'Hukum II Newton: Percepatan berbanding lurus dengan resultan gaya dan berbanding terbalik dengan massa benda (∑F = m × a).',
      'Hukum III Newton (Aksi-Reaksi): Setiap gaya aksi akan menghasilkan gaya reaksi yang sama besar tetapi berlawanan arah (F_aksi = −F_reaksi).'
    ],
    example: 'Sebuah balok bermassa 5 kg ditarik dengan gaya 20 N pada lantai licin. Percepatannya a = F / m = 20 / 5 = 4 m/s².',
    formula: '∑F = 0 (Hukum I) | F = m × a (Hukum II) | F_aksi = -F_reaksi (Hukum III)',
    tags: ['Fisika', 'Dinamika Gerak', 'Gaya']
  },

  // === SMA KELAS 10 - 12 MATEMATIKA & IPA ===
  {
    id: 'sma-k10-mat-1',
    level: 'SMA',
    grade: 'Kelas 10',
    subject: 'Matematika',
    title: 'Trigonometri Dasar & Sudut Istimewa',
    intro: 'Trigonometri mempelajari hubungan antara panjang sisi-sisi dan besar sudut pada segitiga.',
    points: [
      'sin θ = depan / miring (Demi)',
      'cos θ = samping / miring (Sami)',
      'tan θ = depan / samping (Desa) = sin θ / cos θ',
      'Sudut istimewa (0°, 30°, 45°, 60°, 90°):',
      '• sin: 0, 1/2, 1/2√2, 1/2√3, 1',
      '• cos: 1, 1/2√3, 1/2√2, 1/2, 0',
      '• tan: 0, 1/3√3, 1, √3, tak terdefinisi',
      'Identitas dasar: sin²θ + cos²θ = 1'
    ],
    example: 'sin 30° + cos 60° = 1/2 + 1/2 = 1.',
    formula: 'sin²θ + cos²θ = 1 | tan θ = sin θ / cos θ',
    tags: ['Trigonometri', 'Sudut Istimewa', 'Fungsi']
  },
  {
    id: 'sma-k11-mat-1',
    level: 'SMA',
    grade: 'Kelas 11',
    subject: 'Matematika',
    title: 'Turunan Fungsi Aljabar',
    intro: 'Turunan (Diferensial) mengukur tingkat perubahan seketika dari suatu fungsi terhadap variabel independennya.',
    points: [
      'Aturan pangkat: Jika f(x) = a xⁿ, maka f\'(x) = a · n · xⁿ⁻¹.',
      'Turunan konstanta: Jika f(x) = c, maka f\'(x) = 0.',
      'Sifat penjumlahan: (u ± v)\' = u\' ± v\'.',
      'Aturan perkalian: (u · v)\' = u\'v + uv\'.',
      'Aturan pembagian: (u / v)\' = (u\'v − uv\') / v².'
    ],
    example: 'f(x) = 4x³ − 5x² + 7x − 9\nf\'(x) = (4×3)x² − (5×2)x¹ + 7(1) − 0 = 12x² − 10x + 7.',
    formula: 'd/dx [a xⁿ] = n · a · xⁿ⁻¹',
    tags: ['Kalkulus', 'Diferensial', 'Gradien']
  }
];
