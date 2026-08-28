import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // === SD KELAS 5: FPB DAN KPK ===
  {
    id: 'fpb-kpk-1',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Kelipatan persekutuan terkecil (KPK) dari 9 dan 15 yaitu ...',
    options: ['3', '24', '45', '90'],
    answer: 2,
    explanation: 'Faktorisasi prima 9 = 3², dan 15 = 3 × 5. KPK diambil pangkat terbesar = 3² × 5 = 9 × 5 = 45.'
  },
  {
    id: 'fpb-kpk-2',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Tentukan KPK dari 25 dan 30!',
    options: ['55', '150', '5', '120'],
    answer: 1,
    explanation: '25 = 5², 30 = 2 × 3 × 5. KPK = 2 × 3 × 5² = 6 × 25 = 150.'
  },
  {
    id: 'fpb-kpk-3',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Tentukan KPK dari 12, 24, dan 60!',
    options: ['120', '60', '12', '240'],
    answer: 0,
    explanation: '12 = 2² × 3, 24 = 2³ × 3, 60 = 2² × 3 × 5. KPK = 2³ × 3 × 5 = 8 × 3 × 5 = 120.'
  },
  {
    id: 'fpb-kpk-4',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Tentukan FPB dari 18 dan 36!',
    options: ['36', '18', '9', '72'],
    answer: 1,
    explanation: '18 = 2 × 3², 36 = 2² × 3². FPB = 2 × 3² = 18.'
  },
  {
    id: 'fpb-kpk-5',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Faktor persekutuan terbesar (FPB) dari 4 dan 28 yaitu ...',
    options: ['112', '4', '28', '56'],
    answer: 1,
    explanation: 'Faktor 4 = {1, 2, 4}, faktor 28 = {1, 2, 4, 7, 14, 28}. FPB = 4.'
  },
  {
    id: 'fpb-kpk-6',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Tentukan FPB dari 12, 48, dan 60!',
    options: ['4', '60', '12', '3'],
    answer: 2,
    explanation: '12 = 2² × 3, 48 = 2⁴ × 3, 60 = 2² × 3 × 5. FPB = 2² × 3 = 12.'
  },
  {
    id: 'fpb-kpk-7',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Bilangan berikut yang termasuk kelipatan 7 yaitu ...',
    options: ['137', '64', '154', '72'],
    answer: 2,
    explanation: '154 ÷ 7 = 22 (habis dibagi), sehingga 154 adalah kelipatan 7.'
  },
  {
    id: 'fpb-kpk-8',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Bilangan berikut yang merupakan kelipatan persekutuan 2 dan 6 yaitu ...',
    options: ['2, 6, 12, 24, 36', '2, 4, 6, 8, 10', '6, 9, 12, 15, 18', '6, 12, 18, 24'],
    answer: 3,
    explanation: 'Kelipatan persekutuan dari 2 dan 6 adalah kelipatan dari 6, yaitu 6, 12, 18, 24, dst.'
  },
  {
    id: 'fpb-kpk-9',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Faktor dari bilangan 18 yaitu ...',
    options: ['2, 3, 6, 12, dan 18', '1, 2, 4, 6, dan 18', '2, 3, 6, 9, dan 18', '1, 2, 3, 6, 9, dan 18'],
    answer: 3,
    explanation: '18 = 1×18 = 2×9 = 3×6. Semua faktornya adalah 1, 2, 3, 6, 9, dan 18.'
  },
  {
    id: 'fpb-kpk-10',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Bilangan yang faktor-faktornya 1, 2, 3, 4, 6, 8, 12, 16, 24, dan 48 yaitu ...',
    options: ['24', '48', '96', '192'],
    answer: 1,
    explanation: 'Bilangan tersebut adalah 48.'
  },
  {
    id: 'fpb-kpk-11',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Bilangan prima yang terletak antara 10 dan 20 adalah ...',
    options: ['11, 13, 15, 17, dan 19', '11, 13, dan 17', '11, 15, dan 19', '11, 13, 17, dan 19'],
    answer: 3,
    explanation: '11, 13, 17, dan 19 hanya memiliki 2 faktor (1 dan bilangan itu sendiri).'
  },
  {
    id: 'fpb-kpk-12',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Rizki berlatih setiap 4 hari sekali dan Noval setiap 5 hari sekali. Jika bersama pada 9 Juni, mereka bersama lagi pada tanggal ...',
    options: ['18 Juni', '13 Juni', '14 Juni', '29 Juni'],
    answer: 3,
    explanation: 'KPK dari 4 dan 5 adalah 20. Tanggal 9 Juni + 20 hari = 29 Juni.'
  },
  {
    id: 'fpb-kpk-13',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Nayla memiliki 36 permen dan 72 roti yang akan dimasukkan ke keranjang dengan isi sama banyak. Banyak keranjang terbanyak yang diperlukan adalah ...',
    options: ['12', '24', '36', '72'],
    answer: 2,
    explanation: 'Mencari FPB dari 36 dan 72. FPB(36, 72) = 36.'
  },
  {
    id: 'fpb-kpk-14',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'FPB dan KPK',
    question: 'Lampu hijau menyala setiap 6 menit dan lampu kuning setiap 8 menit. Jika bersamaan pukul 09.00, keduanya menyala lagi pukul ...',
    options: ['09.24', '09.48', '10.24', '10.48'],
    answer: 0,
    explanation: 'KPK(6, 8) = 24 menit. Pukul 09.00 + 24 menit = 09.24.'
  },

  // === SD KELAS 5: KELILING BANGUN DATAR ===
  {
    id: 'keliling-k5-1',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Keliling Bangun Datar',
    question: 'Yang dimaksud dengan keliling bangun datar adalah …. ',
    options: ['Luas seluruh bangun', 'Jumlah panjang seluruh sisi bangun', 'Panjang salah satu sisi bangun', 'Banyaknya sudut bangun'],
    answer: 1,
    explanation: 'Keliling adalah total panjang garis tepi/sisi terluar yang membatasi bangun datar.'
  },
  {
    id: 'keliling-k5-2',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Keliling Bangun Datar',
    question: 'Sebuah segitiga memiliki panjang sisi 8 cm, 7 cm, dan 9 cm. Keliling segitiga tersebut adalah …. ',
    options: ['22 cm', '23 cm', '24 cm', '25 cm'],
    answer: 2,
    explanation: 'Keliling segitiga = s1 + s2 + s3 = 8 + 7 + 9 = 24 cm.'
  },
  {
    id: 'keliling-k5-3',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Keliling Bangun Datar',
    question: 'Sebuah persegi memiliki panjang sisi 12 cm. Keliling persegi tersebut adalah …. ',
    options: ['24 cm', '36 cm', '48 cm', '144 cm'],
    answer: 2,
    explanation: 'Keliling persegi = 4 × s = 4 × 12 cm = 48 cm.'
  },
  {
    id: 'keliling-k5-4',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Keliling Bangun Datar',
    question: 'Sebuah persegi panjang memiliki panjang 15 cm dan lebar 8 cm. Kelilingnya adalah …. ',
    options: ['38 cm', '42 cm', '46 cm', '48 cm'],
    answer: 2,
    explanation: 'Keliling persegi panjang = 2 × (p + l) = 2 × (15 + 8) = 2 × 23 = 46 cm.'
  },
  {
    id: 'keliling-k5-6',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Keliling Bangun Datar',
    question: 'Sebuah segi lima beraturan memiliki panjang setiap sisi 9 cm. Keliling bangun tersebut adalah …. ',
    options: ['36 cm', '40 cm', '45 cm', '50 cm'],
    answer: 2,
    explanation: 'Keliling segi lima beraturan = 5 × s = 5 × 9 cm = 45 cm.'
  },
  {
    id: 'keliling-k5-12',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Keliling Bangun Datar',
    question: 'Sebuah segitiga sama sisi memiliki keliling 36 cm. Panjang setiap sisinya adalah …. ',
    options: ['10 cm', '11 cm', '12 cm', '13 cm'],
    answer: 2,
    explanation: 'Segitiga sama sisi memiliki 3 sisi sama panjang. Panjang sisi = 36 ÷ 3 = 12 cm.'
  },
  {
    id: 'keliling-k5-17',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Keliling Bangun Datar',
    question: 'Sebuah persegi memiliki keliling 64 cm. Panjang setiap sisinya adalah …. ',
    options: ['14 cm', '16 cm', '18 cm', '20 cm'],
    answer: 1,
    explanation: 'Panjang sisi persegi = Keliling ÷ 4 = 64 ÷ 4 = 16 cm.'
  },
  {
    id: 'keliling-k5-24',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Keliling Bangun Datar',
    question: 'Seorang ayah akan memasang pagar di sekeliling kebun berbentuk persegi panjang dengan panjang 18 m dan lebar 10 m. Panjang pagar yang diperlukan adalah …. ',
    options: ['28 m', '36 m', '56 m', '60 m'],
    answer: 2,
    explanation: 'Keliling = 2 × (18 + 10) = 2 × 28 = 56 meter.'
  },

  // === SD KELAS 5: LUAS DAERAH BANGUN DATAR ===
  {
    id: 'luas-k5-1',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Luas Daerah Bangun Datar',
    question: 'Sebuah persegi memiliki sisi 18 cm. Luas persegi tersebut adalah …. ',
    options: ['324 cm²', '72 cm²', '144 cm²', '36 cm²'],
    answer: 0,
    explanation: 'Luas persegi = s × s = 18 × 18 = 324 cm².'
  },
  {
    id: 'luas-k5-2',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Luas Daerah Bangun Datar',
    question: 'Sebuah persegi panjang memiliki panjang 24 cm dan lebar 15 cm. Luasnya adalah …. ',
    options: ['360 cm²', '390 cm²', '300 cm²', '420 cm²'],
    answer: 0,
    explanation: 'Luas persegi panjang = p × l = 24 × 15 = 360 cm².'
  },
  {
    id: 'luas-k5-3',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Luas Daerah Bangun Datar',
    question: 'Sebuah segitiga memiliki alas 20 cm dan tinggi 16 cm. Luasnya adalah …. ',
    options: ['160 cm²', '320 cm²', '180 cm²', '640 cm²'],
    answer: 0,
    explanation: 'Luas segitiga = ½ × alas × tinggi = ½ × 20 × 16 = 160 cm².'
  },
  {
    id: 'luas-k5-4',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Luas Daerah Bangun Datar',
    question: 'Sebuah jajar genjang memiliki alas 28 cm dan tinggi 15 cm. Luasnya adalah …. ',
    options: ['420 cm²', '390 cm²', '210 cm²', '450 cm²'],
    answer: 0,
    explanation: 'Luas jajar genjang = alas × tinggi = 28 × 15 = 420 cm².'
  },
  {
    id: 'luas-k5-8',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Luas Daerah Bangun Datar',
    question: 'Sebuah lingkaran memiliki jari-jari 14 cm. Jika π = 22/7, luas lingkaran tersebut adalah …. ',
    options: ['616 cm²', '308 cm²', '154 cm²', '440 cm²'],
    answer: 0,
    explanation: 'Luas lingkaran = π × r² = 22/7 × 14 × 14 = 22 × 2 × 14 = 616 cm².'
  },
  {
    id: 'luas-k5-10',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Luas Daerah Bangun Datar',
    question: 'Luas sebuah persegi adalah 625 cm². Panjang sisinya adalah …. ',
    options: ['20 cm', '25 cm', '30 cm', '35 cm'],
    answer: 1,
    explanation: 'Panjang sisi = √625 = 25 cm.'
  },

  // === SD KELAS 5: BILANGAN CACAH SAMPAI 100.000 ===
  {
    id: 'cacah-1',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Bilangan Cacah Sampai 100.000',
    question: 'Dinda membeli minuman teh seharga Rp28.768,00. Harga tersebut dibaca …. ',
    options: [
      'Dua puluh delapan ribu tujuh ratus enam puluh delapan',
      'Dua puluh tujuh ratus enam puluh delapan',
      'Dua puluh delapan ribu tujuh ratus lima puluh delapan',
      'Dua puluh sembilan ribu tujuh ratus enam puluh delapan'
    ],
    answer: 0,
    explanation: '28.768 dibaca Dua puluh delapan ribu tujuh ratus enam puluh delapan rupiah.'
  },
  {
    id: 'cacah-2',
    level: 'SD',
    grade: 'Kelas 5',
    subject: 'Matematika',
    chapter: 'Bilangan Cacah Sampai 100.000',
    question: 'Nilai tempat angka 5 dari bilangan 95.834 adalah …. ',
    options: ['Ratusan ribu', 'Ribuan', 'Ratusan', 'Puluhan ribu'],
    answer: 1,
    explanation: '9 menempati puluhan ribu, 5 menempati ribuan, 8 ratusan, 3 puluhan, 4 satuan.'
  },

  // === SD KELAS 6: KUBUS DAN BALOK ===
  {
    id: 'kubus-1',
    level: 'SD',
    grade: 'Kelas 6',
    subject: 'Matematika',
    chapter: 'Kubus dan Balok',
    question: 'Kubus memiliki … sisi berbentuk persegi.',
    options: ['4', '5', '6', '8'],
    answer: 2,
    explanation: 'Kubus memiliki 6 sisi berbentuk persegi yang kongruen (sama dan sebangun).'
  },
  {
    id: 'kubus-2',
    level: 'SD',
    grade: 'Kelas 6',
    subject: 'Matematika',
    chapter: 'Kubus dan Balok',
    question: 'Kubus dan balok sama-sama memiliki …. ',
    options: [
      '6 sisi, 12 rusuk, dan 8 titik sudut',
      '5 sisi, 12 rusuk, dan 8 titik sudut',
      '6 sisi, 8 rusuk, dan 12 titik sudut',
      '8 sisi, 12 rusuk, dan 6 titik sudut'
    ],
    answer: 0,
    explanation: 'Baik kubus maupun balok memiliki 6 sisi, 12 rusuk, dan 8 titik sudut.'
  },

  // === SD KELAS 6: PELUANG & RASIO ===
  {
    id: 'peluang-1',
    level: 'SD',
    grade: 'Kelas 6',
    subject: 'Matematika',
    chapter: 'Peluang',
    question: 'Sebuah dadu memiliki enam sisi bernomor 1 sampai 6. Peluang muncul angka 3 adalah ....',
    options: ['1/2', '1/3', '1/6', '1/4'],
    answer: 2,
    explanation: 'Banyak sisi bernomor 3 adalah 1, total sisi ada 6. Jadi peluangnya 1/6.'
  },
  {
    id: 'rasio-1',
    level: 'SD',
    grade: 'Kelas 6',
    subject: 'Matematika',
    chapter: 'Rasio',
    question: 'Rasio 12 : 18 dalam bentuk paling sederhana adalah …. ',
    options: ['6 : 9', '3 : 2', '2 : 3', '4 : 6'],
    answer: 2,
    explanation: 'Bagi kedua bilangan dengan FPB-nya (6): 12 ÷ 6 = 2 dan 18 ÷ 6 = 3. Jadi 2 : 3.'
  },

  // === SMP KELAS 7 - 9: MATEMATIKA & IPA ===
  {
    id: 'smp-aljabar-1',
    level: 'SMP',
    grade: 'Kelas 9',
    subject: 'Matematika',
    chapter: 'Persamaan Kuadrat',
    question: 'Hasil penyelesaian dari 3x² − 12x + 9 = 0 adalah ...',
    options: ['x = 1 atau x = 3', 'x = 1 atau x = −3', 'x = −1 atau x = 3', 'x = −1 atau x = −3'],
    answer: 0,
    explanation: 'Bagi kedua ruas dengan 3: x² − 4x + 3 = 0 -> (x − 1)(x − 3) = 0 -> x = 1 atau x = 3.'
  },
  {
    id: 'smp-phytagoras-1',
    level: 'SMP',
    grade: 'Kelas 8',
    subject: 'Matematika',
    chapter: 'Teorema Pythagoras',
    question: 'Sebuah segitiga siku-siku memiliki panjang sisi siku-siku 6 cm dan 8 cm. Panjang sisi miringnya adalah ...',
    options: ['9 cm', '10 cm', '12 cm', '14 cm'],
    answer: 1,
    explanation: 'c = √(a² + b²) = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.'
  },
  {
    id: 'smp-ipa-1',
    level: 'SMP',
    grade: 'Kelas 7',
    subject: 'IPA',
    chapter: 'Sistem Organisasi Kehidupan',
    question: 'Unit terkecil dari struktur makhluk hidup disebut ...',
    options: ['Jaringan', 'Organ', 'Sel', 'Sistem Organ'],
    answer: 2,
    explanation: 'Sel merupakan unit struktural dan fungsional terkecil dari makhluk hidup.'
  },
  {
    id: 'smp-ipa-2',
    level: 'SMP',
    grade: 'Kelas 8',
    subject: 'IPA',
    chapter: 'Gaya dan Gerak (Hukum Newton)',
    question: 'Hukum Newton I berbunyi bahwa benda akan tetap diam atau bergerak lurus beraturan jika ...',
    options: [
      'Gaya gesek lebih besar dari gaya dorong',
      'Resultan gaya yang bekerja pada benda sama dengan nol',
      'Massa benda semakin berat',
      'Benda mengalami percepatan konstan'
    ],
    answer: 1,
    explanation: 'Hukum I Newton (Kelembaman): ∑F = 0, benda diam tetap diam, benda bergerak tetap bergerak dengan kecepatan konstan.'
  },

  // === SMA KELAS 10 - 12: MATEMATIKA & FISIKA ===
  {
    id: 'sma-trigo-1',
    level: 'SMA',
    grade: 'Kelas 10',
    subject: 'Matematika',
    chapter: 'Trigonometri',
    question: 'Nilai dari sin 30° + cos 60° adalah ...',
    options: ['½', '1', '√3', '0'],
    answer: 1,
    explanation: 'sin 30° = 1/2 dan cos 60° = 1/2. Jadi 1/2 + 1/2 = 1.'
  },
  {
    id: 'sma-turunan-1',
    level: 'SMA',
    grade: 'Kelas 11',
    subject: 'Matematika',
    chapter: 'Turunan Fungsi Aljabar',
    question: 'Turunan pertama dari f(x) = 4x³ − 5x² + 7x − 9 adalah ...',
    options: [
      '12x² − 10x + 7',
      '12x² − 5x + 7',
      '4x² − 10x + 7',
      '12x³ − 10x² + 7'
    ],
    answer: 0,
    explanation: 'f\'(x) = d/dx (4x³) − d/dx (5x²) + d/dx (7x) − d/dx (9) = 12x² − 10x + 7.'
  },
  {
    id: 'sma-fisika-1',
    level: 'SMA',
    grade: 'Kelas 12',
    subject: 'IPA',
    chapter: 'Fisika Kuantum & Relativitas',
    question: 'Rumus kesetaraan massa dan energi yang dikemukakan oleh Albert Einstein adalah ...',
    options: ['E = ½ m v²', 'E = m g h', 'E = m c²', 'E = F × s'],
    answer: 2,
    explanation: 'E = m c², di mana E adalah energi, m adalah massa, dan c adalah kecepatan cahaya di ruang hampa.'
  }
];
