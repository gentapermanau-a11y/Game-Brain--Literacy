import { Question, Category, Major, Difficulty } from '../types';

export interface CategoryMeta {
  id: Category;
  name: string;
  icon: string;
  major: Major;
  desc: string;
  color: string;
}

export interface MajorMeta {
  id: Major;
  name: string;
  badge: string;
  icon: string;
  desc: string;
  color: string;
}

export const MAJORS_META: MajorMeta[] = [
  {
    id: 'ALL',
    name: 'SEMUA JURUSAN',
    badge: 'SMK ALL',
    icon: 'Sparkles',
    desc: 'Campuran seluruh materi kejuruan & pelajaran umum SMK',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'RPL',
    name: 'RPL / REKAYASA PERANGKAT LUNAK',
    badge: 'RPL / PPLG',
    icon: 'CodeXml',
    desc: 'Pemrograman, Web, Database, Algoritma, Git, OOP, UI/UX & AI',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'TKJ',
    name: 'TKJ / TEKNIK JARINGAN KOMPUTER',
    badge: 'TKJ / TJKT',
    icon: 'Network',
    desc: 'Jaringan Komputer, IP, Subnetting, Router, Server & Keamanan',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'DKV',
    name: 'DKV / DESAIN KOMUNIKASI VISUAL',
    badge: 'DKV / GRAFIKA',
    icon: 'Palette',
    desc: 'Desain Grafis, Tipografi, Warna, Photoshop, Illustrator & Branding',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'ANIMASI',
    name: 'ANIMASI & 3D',
    badge: 'ANIMASI',
    icon: 'Film',
    desc: '2D/3D Animation, Blender, Keyframe, Rigging & Storyboard',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'AKL',
    name: 'AKL / AKUNTANSI & KEUANGAN',
    badge: 'AKL',
    icon: 'Calculator',
    desc: 'Akuntansi Dasar, Jurnal, Neraca, Laporan Keuangan & Pajak',
    color: 'from-emerald-600 to-green-700',
  },
  {
    id: 'MPLB',
    name: 'MPLB / MANAJEMEN PERKANTORAN',
    badge: 'MPLB / OTKP',
    icon: 'Briefcase',
    desc: 'Administrasi, Kearsipan, Surat Menyurat & Office Komputer',
    color: 'from-blue-600 to-sky-700',
  },
  {
    id: 'UMUM',
    name: 'PELAJARAN UMUM SMK',
    badge: 'UMUM',
    icon: 'GraduationCap',
    desc: 'Matematika SMK, B. Inggris, B. Indonesia, PPKN & Sejarah',
    color: 'from-violet-500 to-purple-700',
  },
];

export const CATEGORIES_META: CategoryMeta[] = [
  { id: 'ALL', name: 'SEMUA MATERI', icon: 'Sparkles', major: 'ALL', desc: 'Soal diacak dari seluruh mata pelajaran & kejuruan SMK', color: 'text-pink-400' },
  { id: 'RPL', name: 'Informatika & RPL', icon: 'CodeXml', major: 'RPL', desc: 'SDLC, Konsep Software, Agile & Rekayasa Perangkat Lunak', color: 'text-cyan-400' },
  { id: 'PROGRAMMING', name: 'Pemrograman & OOP', icon: 'Cpu', major: 'RPL', desc: 'Logika pemrograman, tipe data, OOP, class & inheritance', color: 'text-blue-400' },
  { id: 'WEB_DEV', name: 'Web Development', icon: 'Globe', major: 'RPL', desc: 'Frontend, backend, client-server, REST API & JSON', color: 'text-sky-400' },
  { id: 'DATABASE', name: 'Database & Basis Data', icon: 'Database', major: 'RPL', desc: 'SQL query, DDL, DML, Normalisasi & Relasi RDBMS', color: 'text-emerald-400' },
  { id: 'HTML_CSS', name: 'HTML & CSS', icon: 'Layout', major: 'RPL', desc: 'Tag semantik, Flexbox, CSS Grid, Box Model & Responsive UI', color: 'text-amber-400' },
  { id: 'JAVASCRIPT', name: 'JavaScript', icon: 'Zap', major: 'RPL', desc: 'ES6+, DOM Manipulation, Event Handling, Array & Async', color: 'text-yellow-400' },
  { id: 'PHP', name: 'PHP & Backend', icon: 'Server', major: 'RPL', desc: 'Sintaks PHP, $_POST, $_GET, Session, Cookie & Database PDO', color: 'text-indigo-400' },
  { id: 'GIT_GITHUB', name: 'Git & GitHub', icon: 'GitBranch', major: 'RPL', desc: 'Version control, commit, branch, merge, pull request & conflict', color: 'text-rose-400' },
  { id: 'ALGORITHM', name: 'Algoritma & Logika', icon: 'Binary', major: 'RPL', desc: 'Flowchart, pseudocode, searching, sorting & struktur data', color: 'text-purple-400' },
  { id: 'UI_UX', name: 'UI / UX Design', icon: 'Layers', major: 'RPL', desc: 'User experience, wireframe, prototype, heurisitik & Figma', color: 'text-pink-400' },
  { id: 'NETWORK', name: 'Jaringan Komputer', icon: 'Network', major: 'TKJ', desc: 'IP Address, Subnetting, OSI Layer, Router, Switch & TCP/IP', color: 'text-teal-400' },
  { id: 'COMPUTER_SYSTEM', name: 'Sistem Komputer', icon: 'HardDrive', major: 'TKJ', desc: 'Hardware, Arsitektur CPU, RAM, BIOS/UEFI & OS Linux/Windows', color: 'text-cyan-400' },
  { id: 'CYBER_SECURITY', name: 'Keamanan Siber Dasar', icon: 'ShieldAlert', major: 'TKJ', desc: 'Firewall, Enkripsi, Hashing, Malware, Phishing & SQL Injection', color: 'text-red-400' },
  { id: 'GRAPHIC_DESIGN', name: 'Desain Grafis', icon: 'Palette', major: 'DKV', desc: 'Nirmana, Tipografi, Warna CMYK/RGB, Photoshop & Illustrator', color: 'text-fuchsia-400' },
  { id: 'MULTIMEDIA', name: 'Multimedia', icon: 'Clapperboard', major: 'DKV', desc: 'Audio editing, Video editing, Format file grafis & Rendering', color: 'text-orange-400' },
  { id: 'BLENDER_3D', name: 'Blender & 3D', icon: 'Film', major: 'ANIMASI', desc: '3D Modeling, Mesh, Extrude, Modifier, Material, Rigging & Eevee/Cycles', color: 'text-amber-400' },
  { id: 'GAME_DEV', name: 'Game Development', icon: 'Gamepad2', major: 'ANIMASI', desc: 'Game engine, Collision detection, Sprite, Physics & Game Loop', color: 'text-lime-400' },
  { id: 'AI', name: 'AI & Kecerdasan Buatan', icon: 'Bot', major: 'RPL', desc: 'Machine learning, Neural network, Prompt engineering & Computer Vision', color: 'text-blue-400' },
  { id: 'ACCOUNTING_AKL', name: 'Akuntansi Dasar (AKL)', icon: 'Calculator', major: 'AKL', desc: 'Persamaan akuntansi, Debit-Kredit, Jurnal Umum, Buku Besar & Neraca', color: 'text-emerald-400' },
  { id: 'OFFICE_MPLB', name: 'Manajemen Perkantoran (MPLB)', icon: 'Briefcase', major: 'MPLB', desc: 'Surat dinas resmi, Kearsipan dokumen, MS Word Mail Merge & Etika kantor', color: 'text-sky-400' },
  { id: 'MATH_SMK', name: 'Matematika SMK', icon: 'Variable', major: 'UMUM', desc: 'Matriks, Trigonometri, Logaritma, Peluang, Barisan & Deret', color: 'text-yellow-400' },
  { id: 'ENGLISH', name: 'Bahasa Inggris SMK', icon: 'Languages', major: 'UMUM', desc: 'Technical terms, Dialog kerja, Passive voice & Instruction manuals', color: 'text-indigo-400' },
  { id: 'INDONESIAN', name: 'Bahasa Indonesia', icon: 'BookOpen', major: 'UMUM', desc: 'Surat lamaran kerja, Teks LHO, Kalimat efektif & Ejaan EYD V', color: 'text-rose-400' },
  { id: 'PPKN', name: 'PPKN & Etika Digital', icon: 'ShieldCheck', major: 'UMUM', desc: 'Nilai Pancasila, Hak cipta perangkat lunak & UU ITE', color: 'text-teal-400' },
  { id: 'HISTORY', name: 'Sejarah Indonesia', icon: 'Landmark', major: 'UMUM', desc: 'Sejarah kemerdekaan, revolusi industri & peristiwa penting', color: 'text-amber-400' },
  { id: 'GENERAL_KNOWLEDGE', name: 'Pengetahuan Umum IT', icon: 'Globe', major: 'UMUM', desc: 'Tokoh teknologi dunia, sejarah internet & tren masa depan', color: 'text-sky-400' },
];

export const QUESTION_BANK: Question[] = [
  // =========================================================================
  // 1. INFORMATIKA & RPL (Rekayasa Perangkat Lunak)
  // =========================================================================
  {
    id: 'rpl_01',
    category: 'RPL',
    categoryName: 'Informatika & RPL',
    major: 'RPL',
    difficulty: 'easy',
    question: 'Model SDLC (Software Development Life Cycle) yang menjalankan setiap tahap secara berurutan dan linier dari analisis hingga perawatan adalah?',
    options: ['Waterfall Model', 'Agile Scrum', 'Extreme Programming', 'Spiral Model'],
    answer: 0,
    explanation: 'Model Waterfall adalah metode pengembangan linier klasik di mana setiap fase harus diselesaikan sepenuhnya sebelum beralih ke fase berikutnya.',
  },
  {
    id: 'rpl_02',
    category: 'RPL',
    categoryName: 'Informatika & RPL',
    major: 'RPL',
    difficulty: 'easy',
    question: 'Dokumen formal yang memuat seluruh spesifikasi kebutuhan fungsional dan non-fungsional aplikasi sebelum dibuat dinamakan?',
    options: ['SRS (Software Requirements Specification)', 'API Documentation', 'Source Code Repository', 'User Acceptance Form'],
    answer: 0,
    explanation: 'SRS mendokumentasikan secara rinci tujuan, kebutuhan pengguna, fitur fungsional, dan batasan perangkat lunak yang akan dibangun.',
  },
  {
    id: 'rpl_03',
    category: 'RPL',
    categoryName: 'Informatika & RPL',
    major: 'RPL',
    difficulty: 'medium',
    question: 'Dalam metodologi Agile Scrum, rapat harian berdurasi singkat sekitar 15 menit untuk menyelaraskan progres tim disebut?',
    options: ['Daily Standup / Daily Scrum', 'Sprint Planning Meeting', 'Sprint Retrospective', 'Backlog Refinement'],
    answer: 0,
    explanation: 'Daily Standup adalah rapat sinkronisasi harian tim scrum (15 menit) untuk menjawab: apa yang telah dikerjakan, apa yang akan dikerjakan, dan hambatan.',
  },
  {
    id: 'rpl_04',
    category: 'RPL',
    categoryName: 'Informatika & RPL',
    major: 'RPL',
    difficulty: 'medium',
    question: 'Diagram UML yang berfokus menggambarkan urutan pertukaran pesan (message passing) antar objek sepanjang garis waktu (lifeline) adalah?',
    options: ['Sequence Diagram', 'Use Case Diagram', 'Class Diagram', 'Deployment Diagram'],
    answer: 0,
    explanation: 'Sequence Diagram adalah diagram interaksi UML yang memperlihatkan bagaimana objek berkolaborasi dalam urutan waktu tertentu.',
  },
  {
    id: 'rpl_05',
    category: 'RPL',
    categoryName: 'Informatika & RPL',
    major: 'RPL',
    difficulty: 'hard',
    question: 'Studi Kasus: Sebuah tim pengembang SMK ingin menerapkan Continuous Integration (CI/CD). Langkah yang paling tepat pada tahap Continuous Integration adalah?',
    options: [
      'Menjalankan otomatisasi Unit Testing dan Build setiap ada commit atau Pull Request baru',
      'Mengunggah file ZIP manual melalui FTP ke shared hosting setiap akhir bulan',
      'Membuat backup database manual di flashdisk setiap jam istirahat',
      'Menulis seluruh kode langsung di server produksi tanpa version control'
    ],
    answer: 0,
    explanation: 'Continuous Integration (CI) mengotomatiskan proses merge, build, dan automated testing setiap ada kode baru yang di-push ke repository.',
  },
  {
    id: 'rpl_06',
    category: 'RPL',
    categoryName: 'Informatika & RPL',
    major: 'RPL',
    difficulty: 'hard',
    question: 'Dalam pengujian perangkat lunak, perbedaan utama antara Black Box Testing dan White Box Testing adalah?',
    options: [
      'Black Box menguji fungsi dari sisi input-output tanpa melihat kode internal, sedangkan White Box menguji struktur alur logika kode program',
      'Black Box hanya untuk aplikasi tema gelap, White Box untuk tema terang',
      'Black Box dilakukan oleh client saja, White Box dilakukan oleh sistem operasi',
      'White Box tidak memerlukan source code sama sekali'
    ],
    answer: 0,
    explanation: 'Black Box Testing menguji fungsionalitas software tanpa mengetahui struktur kode internal, sedangkan White Box menganalisis jalur kode dan logika internal.',
  },

  // =========================================================================
  // 2. PEMROGRAMAN & OOP
  // =========================================================================
  {
    id: 'prog_01',
    category: 'PROGRAMMING',
    categoryName: 'Pemrograman & OOP',
    major: 'RPL',
    difficulty: 'easy',
    question: 'Prinsip OOP di mana sebuah class turunan dapat mewarisi properti dan method dari class induk disebut?',
    options: ['Inheritance (Pewarisan)', 'Encapsulation (Pembungkusan)', 'Polymorphism', 'Abstraction'],
    answer: 0,
    explanation: 'Inheritance memungkinkan child class mewarisi atribut dan method dari parent class sehingga meningkatkan code reusability.',
  },
  {
    id: 'prog_02',
    category: 'PROGRAMMING',
    categoryName: 'Pemrograman & OOP',
    major: 'RPL',
    difficulty: 'easy',
    question: 'Struktur data yang bekerja dengan mekanisme LIFO (Last In, First Out) adalah?',
    options: ['Stack (Tumpukan)', 'Queue (Antrean)', 'Array', 'Linked List'],
    answer: 0,
    explanation: 'Stack menerapkan LIFO di mana elemen yang terakhir dimasukkan (push) adalah elemen pertama yang akan dikeluarkan (pop).',
  },
  {
    id: 'prog_03',
    category: 'PROGRAMMING',
    categoryName: 'Pemrograman & OOP',
    major: 'RPL',
    difficulty: 'medium',
    codeSnippet: 'let a = 10;\nlet b = 3;\nlet c = a % b;\nconsole.log(c);',
    question: 'Analisis Kode: Apa output dari kode JavaScript di bawah ini?\nlet a = 10; let b = 3; let c = a % b; console.log(c);',
    options: ['1', '3', '3.33', '0'],
    answer: 0,
    explanation: 'Operator modulus (%) menghasilkan sisa pembagian bilangan bulat. 10 dibagi 3 menghasilkan 3 dengan sisa 1.',
  },
  {
    id: 'prog_04',
    category: 'PROGRAMMING',
    categoryName: 'Pemrograman & OOP',
    major: 'RPL',
    difficulty: 'medium',
    codeSnippet: 'let total = 0;\nfor (let i = 1; i <= 4; i++) {\n  total += i;\n}\nconsole.log(total);',
    question: 'Analisis Kode: Berapakah nilai variabel `total` setelah perulangan for selesai dieksekusi?\nfor (let i = 1; i <= 4; i++) { total += i; }',
    options: ['10', '4', '15', '24'],
    answer: 0,
    explanation: 'Perulangan menjumlahkan nilai i: 1 + 2 + 3 + 4 = 10.',
  },
  {
    id: 'prog_05',
    category: 'PROGRAMMING',
    categoryName: 'Pemrograman & OOP',
    major: 'RPL',
    difficulty: 'hard',
    question: 'Dalam konsep OOP, apa perbedaan mendasar antara Overloading dan Overriding?',
    options: [
      'Overloading memiliki nama method sama tetapi parameter berbeda dalam satu kelas, sedangkan Overriding menulis ulang method parent class pada child class',
      'Overloading untuk menghapus method, Overriding untuk menambah file baru',
      'Overriding hanya bisa digunakan pada variabel tipe boolean',
      'Keduanya adalah konsep yang identik tanpa ada perbedaan'
    ],
    answer: 0,
    explanation: 'Method Overloading adalah polimorfisme statis (nama sama, parameter/tipe beda), sedangkan Method Overriding adalah polimorfisme dinamis pada hierarki inheritance.',
  },
  {
    id: 'prog_06',
    category: 'PROGRAMMING',
    categoryName: 'Pemrograman & OOP',
    major: 'RPL',
    difficulty: 'hard',
    question: 'Studi Kasus: Programmer ingin membatasi agar suatu class hanya bisa dibuat tepat satu instansi (single instance) di seluruh siklus hidup aplikasi. Design pattern yang wajib digunakan adalah?',
    options: ['Singleton Pattern', 'Factory Method Pattern', 'Observer Pattern', 'Adapter Pattern'],
    answer: 0,
    explanation: 'Singleton Pattern menjamin bahwa sebuah kelas hanya memiliki satu instance dan menyediakan titik akses global ke instance tersebut.',
  },

  // =========================================================================
  // 3. WEB DEVELOPMENT & REST API
  // =========================================================================
  {
    id: 'web_01',
    category: 'WEB_DEV',
    categoryName: 'Web Development',
    major: 'RPL',
    difficulty: 'easy',
    question: 'Format pertukaran data ringan berbasis teks yang umum digunakan pada RESTful API dan mudah dibaca manusia maupun mesin adalah?',
    options: ['JSON (JavaScript Object Notation)', 'TXT', 'DOCX', 'EXE'],
    answer: 0,
    explanation: 'JSON adalah format standar industri pertukaran data pada Web API modern karena sintaksnya yang ringan dan kompatibel dengan berbagai bahasa.',
  },
  {
    id: 'web_02',
    category: 'WEB_DEV',
    categoryName: 'Web Development',
    major: 'RPL',
    difficulty: 'easy',
    question: 'HTTP Method yang digunakan untuk mengirim data baru ke server dalam pembuatan akun atau formulir pendaftaran adalah?',
    options: ['POST', 'GET', 'HEAD', 'OPTIONS'],
    answer: 0,
    explanation: 'HTTP POST digunakan untuk mengirimkan payload data baru ke server untuk diproses dan disimpan.',
  },
  {
    id: 'web_03',
    category: 'WEB_DEV',
    categoryName: 'Web Development',
    major: 'RPL',
    difficulty: 'medium',
    question: 'HTTP Status Code yang menandakan bahwa resource/halaman yang diminta klien tidak ditemukan pada server adalah?',
    options: ['404 Not Found', '200 OK', '500 Internal Server Error', '403 Forbidden'],
    answer: 0,
    explanation: 'Kode 404 menandakan server tidak dapat menemukan URI/halaman yang diminta oleh klien.',
  },
  {
    id: 'web_04',
    category: 'WEB_DEV',
    categoryName: 'Web Development',
    major: 'RPL',
    difficulty: 'medium',
    question: 'Dalam arsitektur Client-Server, peran web server seperti Nginx atau Apache adalah?',
    options: [
      'Menerima request HTTP dari browser klien dan mengembalikan response berupa file HTML/CSS/JS atau data JSON',
      'Menggambar desain grafis spanduk secara otomatis',
      'Menyimpan file di motherboard komputer lokal klien',
      'Menghubungkan kabel fiber optik ke tiang listrik'
    ],
    answer: 0,
    explanation: 'Web server melayani permintaan HTTP/HTTPS dari klien (browser) dan mengirimkan konten web atau meneruskannya ke backend handler.',
  },
  {
    id: 'web_05',
    category: 'WEB_DEV',
    categoryName: 'Web Development',
    major: 'RPL',
    difficulty: 'hard',
    question: 'Studi Kasus: Saat frontend React mengakses API backend Express di domain berbeda, browser memblokir request dengan pesan "CORS error". Cara penanganan yang benar pada backend adalah?',
    options: [
      'Menambahkan header response `Access-Control-Allow-Origin` yang mengizinkan origin frontend tersebut',
      'Menghapus seluruh file database MySQL di server',
      'Mengubah ekstensi file React menjadi .exe',
      'Mematikan koneksi internet laptop'
    ],
    answer: 0,
    explanation: 'Cross-Origin Resource Sharing (CORS) diatur oleh server dengan menyertakan header Access-Control-Allow-Origin pada HTTP response.',
  },

  // =========================================================================
  // 4. DATABASE & BASIS DATA
  // =========================================================================
  {
    id: 'db_01',
    category: 'DATABASE',
    categoryName: 'Database & Basis Data',
    major: 'RPL',
    difficulty: 'easy',
    question: 'Perintah SQL (DML) yang digunakan untuk mengambil dan menampilkan data dari tabel database adalah?',
    options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    answer: 0,
    explanation: 'SELECT digunakan untuk meminta/mengambil baris data tertentu dari satu atau lebih tabel dalam basis data.',
  },
  {
    id: 'db_02',
    category: 'DATABASE',
    categoryName: 'Database & Basis Data',
    major: 'RPL',
    difficulty: 'easy',
    question: 'Atribut atau kolom dalam tabel yang nilainya unik dan digunakan sebagai identitas utama setiap baris data adalah?',
    options: ['Primary Key', 'Foreign Key', 'Composite Index', 'Default Null'],
    answer: 0,
    explanation: 'Primary Key adalah kolom kunci unik yang menjamin tidak ada dua record yang memiliki nilai identitas sama dalam satu tabel.',
  },
  {
    id: 'db_03',
    category: 'DATABASE',
    categoryName: 'Database & Basis Data',
    major: 'RPL',
    difficulty: 'medium',
    question: 'Klausa SQL yang digunakan untuk mengurutkan hasil query berdasarkan kolom tertentu secara menurun (dari terbesar ke terkecil) adalah?',
    options: ['ORDER BY nama_kolom DESC', 'ORDER BY nama_kolom ASC', 'GROUP BY nama_kolom', 'HAVING nama_kolom'],
    answer: 0,
    explanation: 'Klausa ORDER BY ... DESC mengurutkan data secara Descending (menurun dari Z-A atau angka terbesar ke terkecil).',
  },
  {
    id: 'db_04',
    category: 'DATABASE',
    categoryName: 'Database & Basis Data',
    major: 'RPL',
    difficulty: 'medium',
    question: 'Tujuan utama dari proses Normalisasi Database (1NF, 2NF, 3NF) adalah?',
    options: [
      'Menghilangkan redundansi data (duplikasi yang tidak perlu) dan mencegah anomali manipulasi data',
      'Mengganti bahasa SQL dengan bahasa HTML',
      'Memperbesar ukuran file database agar memori cepat penuh',
      'Menghapus semua password admin di server'
    ],
    answer: 0,
    explanation: 'Normalisasi mengorganisasi kolom dan tabel database untuk meminimalkan redundansi data serta menjaga integritas relasi.',
  },
  {
    id: 'db_05',
    category: 'DATABASE',
    categoryName: 'Database & Basis Data',
    major: 'RPL',
    difficulty: 'hard',
    question: 'Studi Kasus: Diberikan tabel `siswa` (id_siswa, nama, id_jurusan) dan tabel `jurusan` (id_jurusan, nama_jurusan). Perintah SQL untuk menampilkan nama siswa beserta nama jurusannya menggunakan relasi adalah?',
    options: [
      'SELECT siswa.nama, jurusan.nama_jurusan FROM siswa INNER JOIN jurusan ON siswa.id_jurusan = jurusan.id_jurusan;',
      'SELECT * FROM siswa, jurusan WHERE 1=1;',
      'CREATE TABLE siswa_jurusan AS SELECT * FROM siswa;',
      'INSERT INTO siswa VALUES (nama_jurusan);'
    ],
    answer: 0,
    explanation: 'INNER JOIN menghubungkan baris tabel siswa dan jurusan berdasarkan nilai foreign key yang cocok (siswa.id_jurusan = jurusan.id_jurusan).',
  },

  // =========================================================================
  // 5. HTML & CSS
  // =========================================================================
  {
    id: 'html_01',
    category: 'HTML_CSS',
    categoryName: 'HTML & CSS',
    major: 'RPL',
    difficulty: 'easy',
    question: 'Tag HTML yang digunakan untuk membuat tautan atau hyperlink ke halaman lain adalah?',
    options: ['<a href="...">', '<link src="...">', '<img url="...">', '<href to="...">'],
    answer: 0,
    explanation: 'Tag <a> (anchor tag) dengan atribut href digunakan untuk membuat tautan aktif ke halaman web atau dokumen lain.',
  },
  {
    id: 'html_02',
    category: 'HTML_CSS',
    categoryName: 'HTML & CSS',
    major: 'RPL',
    difficulty: 'easy',
    question: 'Properti CSS yang digunakan untuk mengatur jarak ruang kosong di dalam batas (border) sebuah elemen box adalah?',
    options: ['padding', 'margin', 'display', 'position'],
    answer: 0,
    explanation: 'Padding adalah ruang di antara konten elemen dan border-nya, sedangkan margin adalah ruang di luar border.',
  },
  {
    id: 'html_03',
    category: 'HTML_CSS',
    categoryName: 'HTML & CSS',
    major: 'RPL',
    difficulty: 'medium',
    question: 'Dalam CSS Flexbox, properti yang digunakan untuk meratakan item anak secara horizontal di sepanjang sumbu utama (main axis) adalah?',
    options: ['justify-content', 'align-items', 'flex-direction', 'align-content'],
    answer: 0,
    explanation: '`justify-content` mengatur perataan item pada main axis (horizontal secara default flex-row), sedangkan `align-items` mengatur cross axis.',
  },
  {
    id: 'html_04',
    category: 'HTML_CSS',
    categoryName: 'HTML & CSS',
    major: 'RPL',
    difficulty: 'medium',
    question: 'Mengapa penggunaan `box-sizing: border-box;` sangat disukai dalam CSS modern?',
    options: [
      'Karena ukuran padding dan border sudah termasuk dalam total width dan height elemen, sehingga tata letak tidak rusak',
      'Karena mengubah seluruh font menjadi tulisan tebal otomatis',
      'Karena menghapus semua gambar di halaman',
      'Karena mempercepat loading video YouTube'
    ],
    answer: 0,
    explanation: 'Dengan `border-box`, lebar elemen = content + padding + border sehingga perhitungan tata letak responsif menjadi sangat presisi.',
  },
  {
    id: 'html_05',
    category: 'HTML_CSS',
    categoryName: 'HTML & CSS',
    major: 'RPL',
    difficulty: 'hard',
    question: 'Studi Kasus: Desainer web ingin agar tata letak beralih dari 3 kolom ke 1 kolom jika layar ponsel lebarnya di bawah 768px. Sintaks CSS Media Query yang tepat adalah?',
    options: [
      '@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }',
      '@screen mobile-only { column: 1; }',
      'if (window.width < 768) { css.grid = 1; }',
      '@media screen and (min-resolution: 768) { flex: none; }'
    ],
    answer: 0,
    explanation: '`@media (max-width: 768px)` adalah standar CSS Media Query untuk menerapkan gaya CSS responsif pada resolusi layar tertentu.',
  },

  // =========================================================================
  // 6. JAVASCRIPT
  // =========================================================================
  {
    id: 'js_01',
    category: 'JAVASCRIPT',
    categoryName: 'JavaScript',
    major: 'RPL',
    difficulty: 'easy',
    question: 'Kata kunci JavaScript modern (ES6) yang digunakan untuk mendeklarasikan variabel yang nilainya tidak dapat diubah (konstan) adalah?',
    options: ['const', 'let', 'var', 'define'],
    answer: 0,
    explanation: '`const` digunakan untuk mendeklarasikan variabel konstanta yang tidak dapat di-reassign setelah inisialisasi.',
  },
  {
    id: 'js_02',
    category: 'JAVASCRIPT',
    categoryName: 'JavaScript',
    major: 'RPL',
    difficulty: 'easy',
    codeSnippet: 'let x = "5";\nlet y = 5;\nconsole.log(x === y);',
    question: 'Analisis Kode: Apa hasil output dari perbandingan tipe data berikut?\nlet x = "5"; let y = 5; console.log(x === y);',
    options: ['false', 'true', 'undefined', 'NaN'],
    answer: 0,
    explanation: 'Operator `===` (strict equality) memeriksa nilai dan tipe data sekaligus. String "5" tidak sama tipenya dengan number 5, sehingga bernilai false.',
  },
  {
    id: 'js_03',
    category: 'JAVASCRIPT',
    categoryName: 'JavaScript',
    major: 'RPL',
    difficulty: 'medium',
    question: 'Method Array JavaScript yang digunakan untuk membuat array baru dengan mengubah setiap elemen melalui fungsi callback adalah?',
    options: ['map()', 'filter()', 'forEach()', 'reduce()'],
    answer: 0,
    explanation: '`Array.prototype.map()` mengembalikan array baru berisi hasil pemanggilan fungsi callback pada setiap elemen array asal.',
  },
  {
    id: 'js_04',
    category: 'JAVASCRIPT',
    categoryName: 'JavaScript',
    major: 'RPL',
    difficulty: 'hard',
    codeSnippet: 'const angka = [1, 2, 3, 4, 5];\nconst hasil = angka.filter(n => n % 2 === 0);\nconsole.log(hasil);',
    question: 'Analisis Kode: Berapakah isi array `hasil` setelah kode di bawah dijalankan?\nconst angka = [1, 2, 3, 4, 5];\nconst hasil = angka.filter(n => n % 2 === 0);',
    options: ['[2, 4]', '[1, 3, 5]', '[2, 4, 6]', '[false, true, false, true, false]'],
    answer: 0,
    explanation: '`filter()` menyaring elemen yang memenuhi kondisi `n % 2 === 0` (bilangan genap), yaitu angka 2 dan 4.',
  },

  // =========================================================================
  // 7. PHP & BACKEND
  // =========================================================================
  {
    id: 'php_01',
    category: 'PHP',
    categoryName: 'PHP & Backend',
    major: 'RPL',
    difficulty: 'easy',
    question: 'Setiap variabel dalam sintaks bahasa pemrograman PHP wajib diawali dengan simbol tanda?',
    options: ['$ (Tanda Dollar)', '# (Tanda Pagar)', '@ (Tanda At)', '& (Tanda Dan)'],
    answer: 0,
    explanation: 'Di PHP, semua variabel diawali dengan simbol `$` seperti `$nama_siswa` atau `$nilai`.',
  },
  {
    id: 'php_02',
    category: 'PHP',
    categoryName: 'PHP & Backend',
    major: 'RPL',
    difficulty: 'medium',
    question: 'Superglobal array PHP yang digunakan untuk mengambil data sensitif seperti password dari form HTML dengan method POST adalah?',
    options: ['$_POST', '$_GET', '$_SESSION', '$_ENV'],
    answer: 0,
    explanation: '`$_POST` mengumpulkan nilai dari form HTML dengan `method="POST"` sehingga data tidak terekspos di URL browser.',
  },
  {
    id: 'php_03',
    category: 'PHP',
    categoryName: 'PHP & Backend',
    major: 'RPL',
    difficulty: 'hard',
    question: 'Mengapa disarankan menggunakan PDO Prepared Statement saat melakukan query input pengguna ke database di PHP?',
    options: [
      'Untuk mencegah serangan SQL Injection dengan memisahkan kode query dan data input pengguna',
      'Agar file PHP bisa berjalan tanpa web server',
      'Untuk mengubah database menjadi file Excel otomatis',
      'Karena sintaks MySQL biasa sudah tidak bisa digunakan sama sekali'
    ],
    answer: 0,
    explanation: 'Prepared statement memisahkan kompilasi query SQL dari data parameter sehingga karakter input jahat tidak dapat dieksekusi sebagai query (anti SQLi).',
  },

  // =========================================================================
  // 8. GIT & GITHUB
  // =========================================================================
  {
    id: 'git_01',
    category: 'GIT_GITHUB',
    categoryName: 'Git & GitHub',
    major: 'RPL',
    difficulty: 'easy',
    question: 'Perintah Git yang digunakan untuk menyimpan snapshot perubahan file yang sudah di-staging ke dalam commit history lokal adalah?',
    options: ['git commit -m "pesan"', 'git push origin main', 'git clone <url>', 'git pull'],
    answer: 0,
    explanation: '`git commit -m "pesan"` menyimpan snapshot perubahan dari staging area ke riwayat commit lokal repository.',
  },
  {
    id: 'git_02',
    category: 'GIT_GITHUB',
    categoryName: 'Git & GitHub',
    major: 'RPL',
    difficulty: 'medium',
    question: 'Perintah Git yang digunakan untuk membuat dan langsung berpindah ke cabang fitur (branch) baru adalah?',
    options: ['git checkout -b nama-branch', 'git branch -d nama-branch', 'git merge nama-branch', 'git pull nama-branch'],
    answer: 0,
    explanation: '`git checkout -b <nama-branch>` (atau `git switch -c`) membuat branch baru sekaligus berpindah ke branch tersebut.',
  },
  {
    id: 'git_03',
    category: 'GIT_GITHUB',
    categoryName: 'Git & GitHub',
    major: 'RPL',
    difficulty: 'hard',
    question: 'Studi Kasus: Dua programmer SMK mengedit baris kode yang sama pada file yang sama di branch berbeda. Saat melakukan merge, terminal menampilkan pesan "CONFLICT (content)". Tindakan yang tepat adalah?',
    options: [
      'Membuka file yang berkonflik, mendiskusikan baris kode yang benar, menghapus penanda konflik (<<<<<<<, =======, >>>>>>>), lalu commit ulang',
      'Menghapus seluruh folder project dan membuat ulang dari awal',
      'Mematikan laptop dan tidak mengunggah kodenya',
      'Menghapus repository GitHub secara permanen'
    ],
    answer: 0,
    explanation: 'Merge Conflict harus diselesaikan secara manual oleh developer dengan memilih kode yang tepat pada penanda konflik lalu melakukan commit penyelesaian.',
  },

  // =========================================================================
  // 9. JARINGAN KOMPUTER (TKJ / TJKT)
  // =========================================================================
  {
    id: 'net_01',
    category: 'NETWORK',
    categoryName: 'Jaringan Komputer',
    major: 'TKJ',
    difficulty: 'easy',
    question: 'Perangkat jaringan yang berfungsi menghubungkan dua atau lebih jaringan komputer dengan segmen/network ID yang berbeda adalah?',
    options: ['Router', 'Switch Unmanaged', 'Hub', 'Kabel UTP'],
    answer: 0,
    explanation: 'Router beroperasi di Layer 3 (Network) dan berfungsi merutekan paket data antar jaringan dengan network ID yang berbeda.',
  },
  {
    id: 'net_02',
    category: 'NETWORK',
    categoryName: 'Jaringan Komputer',
    major: 'TKJ',
    difficulty: 'easy',
    question: 'Jumlah bit total pada alamat IPv4 (Internet Protocol version 4) adalah?',
    options: ['32 bit (terbagi menjadi 4 oktet)', '64 bit', '128 bit', '16 bit'],
    answer: 0,
    explanation: 'IPv4 terdiri dari 32 bit yang dibagi menjadi 4 oktet (masing-masing 8 bit) dipisahkan oleh tanda titik.',
  },
  {
    id: 'net_03',
    category: 'NETWORK',
    categoryName: 'Jaringan Komputer',
    major: 'TKJ',
    difficulty: 'medium',
    question: 'Berapakah subnet mask desimal untuk notasi prefix CIDR `/24`?',
    options: ['255.255.255.0', '255.255.0.0', '255.0.0.0', '255.255.255.240'],
    answer: 0,
    explanation: 'Prefix /24 berarti 24 bit bernilai 1 berturut-turut (11111111.11111111.11111111.00000000) yang setara dengan 255.255.255.0.',
  },
  {
    id: 'net_04',
    category: 'NETWORK',
    categoryName: 'Jaringan Komputer',
    major: 'TKJ',
    difficulty: 'medium',
    question: 'Urutan 4 tahap proses jabat tangan (handshake) DHCP saat klien meminta alamat IP otomatis dari DHCP Server adalah?',
    options: ['DORA (Discover, Offer, Request, Acknowledgment)', 'SYN, SYN-ACK, ACK', 'Ping, Trace, Connect, Disconnect', 'DNS, ARP, NAT, VLAN'],
    answer: 0,
    explanation: 'Proses DHCP mengikuti mekanisme DORA: DHCP Discover (klien mencari server), Offer (server menawarkan IP), Request (klien meminta IP), Acknowledgment (server menyetujui).',
  },
  {
    id: 'net_05',
    category: 'NETWORK',
    categoryName: 'Jaringan Komputer',
    major: 'TKJ',
    difficulty: 'hard',
    question: 'Studi Kasus: Lab Komputer SMK memiliki IP Network `192.168.10.0/28`. Berapakah jumlah host IP yang valid (usable host) yang dapat digunakan oleh komputer siswa?',
    options: ['14 host valid', '16 host valid', '30 host valid', '6 host valid'],
    answer: 0,
    explanation: 'Dengan /28, jumlah bit host = 32 - 28 = 4 bit. Total IP = 2^4 = 16. Host valid = Total IP - 2 (Network & Broadcast) = 16 - 2 = 14 host.',
  },

  // =========================================================================
  // 10. SISTEM KOMPUTER & HARDWARE
  // =========================================================================
  {
    id: 'comp_01',
    category: 'COMPUTER_SYSTEM',
    categoryName: 'Sistem Komputer',
    major: 'TKJ',
    difficulty: 'easy',
    question: 'Komponen perangkat keras komputer yang berfungsi sebagai otak utama untuk memproses semua instruksi aritmatika dan logika adalah?',
    options: ['CPU (Central Processing Unit)', 'Hard Disk Drive', 'Power Supply Unit', 'Monitor'],
    answer: 0,
    explanation: 'CPU adalah komponen sentral pemroses instruksi pada arsitektur komputer modern.',
  },
  {
    id: 'comp_02',
    category: 'COMPUTER_SYSTEM',
    categoryName: 'Sistem Komputer',
    major: 'TKJ',
    difficulty: 'medium',
    question: 'Jenis memori penyimpanan sementara (RAM) bersifat Volatile, yang berarti?',
    options: [
      'Data yang tersimpan akan hilang seketika saat daya listrik komputer dimatikan',
      'Data akan tersimpan abadi selamanya meskipun dicabut',
      'Memori tahan air dan debu',
      'Hanya bisa dibaca oleh printer'
    ],
    answer: 0,
    explanation: 'Volatile memory membutuhkan suplai daya listrik untuk mempertahankan data; jika daya mati, isi memori akan terhapus.',
  },
  {
    id: 'comp_03',
    category: 'COMPUTER_SYSTEM',
    categoryName: 'Sistem Komputer',
    major: 'TKJ',
    difficulty: 'hard',
    question: 'Perbedaan mendasar antara sistem partisi MBR (Master Boot Record) dan GPT (GUID Partition Table) adalah?',
    options: [
      'GPT mendukung kapasitas disk di atas 2 TB dan jumlah partisi primer tak terbatas (default 128 partisi), sedangkan MBR dibatasi maks 2 TB dan 4 partisi primer',
      'MBR hanya untuk Linux, GPT hanya untuk MacOS',
      'MBR lebih cepat 100x dibanding GPT',
      'GPT tidak mendukung UEFI firmware'
    ],
    answer: 0,
    explanation: 'GPT adalah standar tabel partisi modern pengganti MBR yang mendukung kapasitas drive sangat besar (>2 TB) dan integrasi aman dengan UEFI.',
  },

  // =========================================================================
  // 11. DESAIN GRAFIS & DKV
  // =========================================================================
  {
    id: 'dkv_01',
    category: 'GRAPHIC_DESIGN',
    categoryName: 'Desain Grafis (DKV)',
    major: 'DKV',
    difficulty: 'easy',
    question: 'Model warna standar yang digunakan khusus untuk keperluan media cetak (printing) adalah?',
    options: ['CMYK (Cyan, Magenta, Yellow, Key/Black)', 'RGB (Red, Green, Blue)', 'HEX Code', 'Grayscale Only'],
    answer: 0,
    explanation: 'CMYK adalah model warna subtraktif standar untuk mesin cetak, sedangkan RGB adalah model aditif untuk layar monitor.',
  },
  {
    id: 'dkv_02',
    category: 'GRAPHIC_DESIGN',
    categoryName: 'Desain Grafis (DKV)',
    major: 'DKV',
    difficulty: 'medium',
    question: 'Dalam tipografi, pengaturan jarak horizontal antar pasangan dua karakter huruf tertentu agar terlihat seimbang disebut?',
    options: ['Kerning', 'Tracking', 'Leading', 'Alignment'],
    answer: 0,
    explanation: 'Kerning mengatur jarak antar dua karakter huruf spesifik, sedangkan tracking mengatur jarak antar seluruh huruf dalam satu blok teks.',
  },
  {
    id: 'dkv_03',
    category: 'GRAPHIC_DESIGN',
    categoryName: 'Desain Grafis (DKV)',
    major: 'DKV',
    difficulty: 'hard',
    question: 'Studi Kasus: Siswa DKV mendesain logo perusahaan yang akan dicetak pada kartu nama kecil hingga baliho raksasa di jalan tol tanpa pecah. Format file yang paling tepat digunakan adalah?',
    options: [
      'Format Vektor (SVG, AI, EPS) karena gambar disusun dari rumus matematis garis dan kurva',
      'Format Bitmap Raster (JPEG 72 dpi)',
      'Format GIF 256 warna',
      'Format BMP 8-bit'
    ],
    answer: 0,
    explanation: 'Grafis vektor dapat diperbesar hingga ukuran tak terbatas tanpa kehilangan ketajaman karena berbasis perhitungan koordinat matematika.',
  },

  // =========================================================================
  // 12. BLENDER & 3D (ANIMASI)
  // =========================================================================
  {
    id: 'anim_01',
    category: 'BLENDER_3D',
    categoryName: 'Blender & 3D (Animasi)',
    major: 'ANIMASI',
    difficulty: 'easy',
    question: 'Di aplikasi Blender 3D, shortcut keyboard standar untuk berpindah antara Object Mode dan Edit Mode adalah?',
    options: ['Tombol Tab', 'Tombol Spasi', 'Tombol E', 'Tombol G'],
    answer: 0,
    explanation: 'Tombol `Tab` adalah shortcut cepat di Blender untuk toggle antara Object Mode dan Edit Mode mesh.',
  },
  {
    id: 'anim_02',
    category: 'BLENDER_3D',
    categoryName: 'Blender & 3D (Animasi)',
    major: 'ANIMASI',
    difficulty: 'medium',
    question: 'Proses menambahkan struktur tulang virtual (Armature/Bones) pada model karakter 3D agar dapat digerakkan saat animasi disebut?',
    options: ['Rigging', 'UV Unwrapping', 'Sculpting', 'Compositing'],
    answer: 0,
    explanation: 'Rigging adalah proses pembuatan hierarki kerangka tulang (armature) dan controller untuk menggerakkan model 3D.',
  },
  {
    id: 'anim_03',
    category: 'BLENDER_3D',
    categoryName: 'Blender & 3D (Animasi)',
    major: 'ANIMASI',
    difficulty: 'hard',
    question: 'Perbedaan utama antara Render Engine Cycles dan Eevee di Blender adalah?',
    options: [
      'Cycles adalah ray-tracing renderer yang sangat fotorealistis dengan kalkulasi cahaya akurat, sedangkan Eevee adalah real-time rasterization renderer yang sangat cepat',
      'Cycles hanya untuk teks 2D, Eevee hanya untuk suara',
      'Eevee tidak memerlukan GPU sama sekali',
      'Keduanya menghasilkan kecepatan render yang persis sama'
    ],
    answer: 0,
    explanation: 'Cycles mengkalkulasi jalur cahaya secara fisik (Path Tracing) untuk realisme tinggi, sedangkan Eevee memprioritaskan render waktu-nyata instan.',
  },

  // =========================================================================
  // 13. AKUNTANSI & KEUANGAN (AKL)
  // =========================================================================
  {
    id: 'akl_01',
    category: 'ACCOUNTING_AKL',
    categoryName: 'Akuntansi Dasar (AKL)',
    major: 'AKL',
    difficulty: 'easy',
    question: 'Rumus persamaan dasar akuntansi yang benar dan menjadi fondasi neraca keuangan adalah?',
    options: ['Aset (Harta) = Liabilitas (Utang) + Ekuitas (Modal)', 'Aset = Utang - Modal', 'Modal = Aset + Utang', 'Pendapatan = Beban + Aset'],
    answer: 0,
    explanation: 'Persamaan dasar akuntansi menyatakan bahwa seluruh kekayaan (Aset) perusahaan dibiayai oleh Utang pihak ketiga (Liabilitas) dan Modal pemilik (Ekuitas).',
  },
  {
    id: 'akl_02',
    category: 'ACCOUNTING_AKL',
    categoryName: 'Akuntansi Dasar (AKL)',
    major: 'AKL',
    difficulty: 'medium',
    question: 'Jika perusahaan menerima pembayaran tunai dari pelanggan atas jasa yang telah diselesaikan, jurnal umum yang dicatat adalah?',
    options: ['Kas bertambah di DEBIT, Pendapatan Jasa bertambah di KREDIT', 'Kas di KREDIT, Piutang di DEBIT', 'Beban di DEBIT, Kas di KREDIT', 'Modal di DEBIT, Kas di KREDIT'],
    answer: 0,
    explanation: 'Penerimaan uang tunai menambah aset Kas (saldo normal Debit) dan mengakui pendapatan jasa (saldo normal Kredit).',
  },
  {
    id: 'akl_03',
    category: 'ACCOUNTING_AKL',
    categoryName: 'Akuntansi Dasar (AKL)',
    major: 'AKL',
    difficulty: 'hard',
    question: 'Laporan keuangan yang menyajikan rincian pendapatan dan beban perusahaan selama satu periode tertentu untuk mengetahui laba atau rugi bersih disebut?',
    options: ['Laporan Laba Rugi (Income Statement)', 'Laporan Perubahan Modal', 'Neraca Saldo', 'Laporan Arus Kas'],
    answer: 0,
    explanation: 'Laporan Laba Rugi mempertemukan seluruh pendapatan usaha dengan beban operasional untuk menghitung laba/rugi bersih periode berjalan.',
  },

  // =========================================================================
  // 14. MANAJEMEN PERKANTORAN (MPLB)
  // =========================================================================
  {
    id: 'mplb_01',
    category: 'OFFICE_MPLB',
    categoryName: 'Manajemen Perkantoran (MPLB)',
    major: 'MPLB',
    difficulty: 'easy',
    question: 'Fitur di Microsoft Word yang digunakan untuk membuat dokumen massal (seperti surat undangan atau sertifikat) dengan sumber data otomatis dari Excel adalah?',
    options: ['Mail Merge', 'Track Changes', 'WordArt', 'Equation Editor'],
    answer: 0,
    explanation: 'Mail Merge memadukan template surat di Word dengan database nama/alamat di Excel untuk mencetak surat secara massal dan otomatis.',
  },
  {
    id: 'mplb_02',
    category: 'OFFICE_MPLB',
    categoryName: 'Manajemen Perkantoran (MPLB)',
    major: 'MPLB',
    difficulty: 'medium',
    question: 'Sistem penyimpanan arsip yang dikelompokkan berdasarkan urutan abjad nama orang, perusahaan, atau instansi disebut?',
    options: ['Sistem Abjad (Alphabetical Filing System)', 'Sistem Kronologis (Tanggal)', 'Sistem Geografis (Wilayah)', 'Sistem Nomor Seri'],
    answer: 0,
    explanation: 'Sistem abjad menyusun arsip surat atau berkas berdasarkan urutan huruf A-Z nama koresponden atau instansi terkait.',
  },
  {
    id: 'mplb_03',
    category: 'OFFICE_MPLB',
    categoryName: 'Manajemen Perkantoran (MPLB)',
    major: 'MPLB',
    difficulty: 'hard',
    question: 'Dalam penulisan surat dinas resmi instansi, urutan struktur bagian surat dari paling atas yang benar adalah?',
    options: [
      'Kop Surat -> Nomor, Lampiran, Hal -> Tanggal Surat -> Alamat Tujuan -> Salam Pembuka -> Isi Surat -> Salam Penutup -> Tanda Tangan & Nama Terang',
      'Isi Surat -> Alamat Tujuan -> Kop Surat -> Tanda Tangan',
      'Salam Penutup -> Kop Surat -> Lampiran -> Tanggal',
      'Tanda Tangan -> Alamat Tujuan -> Kop Surat -> Nomor Surat'
    ],
    answer: 0,
    explanation: 'Surat dinas resmi wajib memiliki kepala surat (kop), nomor/lampiran/perihal, tanggal, alamat tujuan, salam pembuka, batang tubuh, salam penutup, dan identitas pengirim.',
  },

  // =========================================================================
  // 15. PELAJARAN UMUM: MATEMATIKA SMK
  // =========================================================================
  {
    id: 'math_01',
    category: 'MATH_SMK',
    categoryName: 'Matematika SMK',
    major: 'UMUM',
    difficulty: 'easy',
    question: 'Nilai dari sin 30° dan cos 60° dalam trigonometri sudut istimewa masing-masing adalah?',
    options: ['1/2 dan 1/2', '1 dan 0', '1/2 √3 dan 1/2', '0 dan 1'],
    answer: 0,
    explanation: 'Dalam sudut istimewa kuadran I, sin 30° = 1/2 dan cos 60° = 1/2.',
  },
  {
    id: 'math_02',
    category: 'MATH_SMK',
    categoryName: 'Matematika SMK',
    major: 'UMUM',
    difficulty: 'medium',
    question: 'Diberikan barisan aritmatika: 3, 7, 11, 15, ... Berapakah suku ke-10 (U10) dari barisan tersebut?',
    options: ['39', '35', '43', '40'],
    answer: 0,
    explanation: 'Rumus suku ke-n: Un = a + (n - 1)b. Diketahui a = 3, b = 4. U10 = 3 + (9 * 4) = 3 + 36 = 39.',
  },
  {
    id: 'math_03',
    category: 'MATH_SMK',
    categoryName: 'Matematika SMK',
    major: 'UMUM',
    difficulty: 'hard',
    question: 'Sebuah dadu bersisi 6 dilempar satu kali. Peluang munculnya mata dadu bilangan prima genap adalah?',
    options: ['1/6', '1/2', '1/3', '2/3'],
    answer: 0,
    explanation: 'Himpunan semesta S = {1, 2, 3, 4, 5, 6} (total 6). Bilangan prima genap pada dadu hanya angka 2 (1 angka). Maka peluangnya = 1/6.',
  },

  // =========================================================================
  // 16. PELAJARAN UMUM: BAHASA INGGRIS SMK
  // =========================================================================
  {
    id: 'eng_01',
    category: 'ENGLISH',
    categoryName: 'Bahasa Inggris SMK',
    major: 'UMUM',
    difficulty: 'easy',
    question: 'In a job interview, the question "What are your greatest strengths in software engineering?" asks about?',
    options: [
      'Your best skills, competencies, and positive abilities',
      'The salary you want to get',
      'Your family background',
      'The company\'s address'
    ],
    answer: 0,
    explanation: '"Strengths" refers to positive technical and soft skills that make you qualified for the position.',
  },
  {
    id: 'eng_02',
    category: 'ENGLISH',
    categoryName: 'Bahasa Inggris SMK',
    major: 'UMUM',
    difficulty: 'medium',
    question: 'Change the active sentence to passive: "The developer fixed the database error yesterday."',
    options: [
      'The database error was fixed by the developer yesterday.',
      'The database error is fixed by developer.',
      'The developer was fixing the error.',
      'The database error will be fixed by developer.'
    ],
    answer: 0,
    explanation: 'In Simple Past passive voice, the formula is: Object + was/were + Verb 3 (Past Participle) + by Subject.',
  },

  // =========================================================================
  // 17. PELAJARAN UMUM: BAHASA INDONESIA
  // =========================================================================
  {
    id: 'ina_01',
    category: 'INDONESIAN',
    categoryName: 'Bahasa Indonesia',
    major: 'UMUM',
    difficulty: 'easy',
    question: 'Bagian surat lamaran pekerjaan yang berisi riwayat singkat pendidikan, keahlian teknis, dan lampiran berkas pendukung terdapat pada bagian?',
    options: ['Isi / Kualifikasi Pelamar', 'Kepala Surat', 'Salam Pembuka', 'Titimangsa'],
    answer: 0,
    explanation: 'Bagian isi surat lamaran kerja memuat identitas, pendidikan, keahlian khusus, dan daftar lampiran berkas.',
  },
  {
    id: 'ina_02',
    category: 'INDONESIAN',
    categoryName: 'Bahasa Indonesia',
    major: 'UMUM',
    difficulty: 'medium',
    question: 'Penulisan kata baku menurut Kamus Besar Bahasa Indonesia (KBBI) dan EYD V yang benar adalah?',
    options: ['Praktik, Kualitas, Analisis, Sistem', 'Praktek, Kwalitas, Analisa, Sistim', 'Praktek, Kualitas, Analisa, Sistem', 'Praktik, Kwalitas, Analisis, Sistim'],
    answer: 0,
    explanation: 'Bentuk kata baku yang benar adalah Praktik (bukan praktek), Kualitas (bukan kwalitas), Analisis (bukan analisa), dan Sistem (bukan sistim).',
  },

  // =========================================================================
  // 18. PELAJARAN UMUM: PPKN & SEJARAH
  // =========================================================================
  {
    id: 'ppkn_01',
    category: 'PPKN',
    categoryName: 'PPKN & Etika Digital',
    major: 'UMUM',
    difficulty: 'easy',
    question: 'Sila dalam Pancasila yang menjadi landasan utama musyawarah untuk mencapai mufakat dalam pengambilan keputusan bersama adalah?',
    options: ['Sila ke-4', 'Sila ke-1', 'Sila ke-2', 'Sila ke-5'],
    answer: 0,
    explanation: 'Sila ke-4 "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan" mendasari prinsip musyawarah mufakat.',
  },
  {
    id: 'hist_01',
    category: 'HISTORY',
    categoryName: 'Sejarah Indonesia',
    major: 'UMUM',
    difficulty: 'easy',
    question: 'Teks Proklamasi Kemerdekaan Republik Indonesia pada 17 Agustus 1945 diketik oleh tokoh bangsa bernama?',
    options: ['Sayuti Melik', 'Sukarni', 'Moh. Hatta', 'Latief Hendraningrat'],
    answer: 0,
    explanation: 'Naskah proklamasi kemerdekaan otentik diketik dengan mesin tik oleh Sayuti Melik setelah dirumuskan oleh Soekarno, Hatta, dan Achmad Soebardjo.',
  },

  // =========================================================================
  // 19. PENGETAHUAN UMUM IT & CYBER SECURITY
  // =========================================================================
  {
    id: 'sec_01',
    category: 'CYBER_SECURITY',
    categoryName: 'Keamanan Siber',
    major: 'TKJ',
    difficulty: 'medium',
    question: 'Teknik kejahatan siber di mana penyerang menyamar sebagai institusi resmi (seperti bank/sekolah) lewat email atau website tiruan untuk mencuri password disebut?',
    options: ['Phishing', 'DDoS Attack', 'Brute Force', 'Ransomware'],
    answer: 0,
    explanation: 'Phishing adalah rekayasa sosial untuk memancing korban memberikan kredensial rahasia melalui pesan atau halaman login palsu.',
  },
  {
    id: 'ai_01',
    category: 'AI',
    categoryName: 'AI & Kecerdasan Buatan',
    major: 'RPL',
    difficulty: 'medium',
    question: 'Dalam Machine Learning, jenis pembelajaran di mana model dilatih menggunakan dataset yang sudah memiliki label jawaban (Ground Truth) disebut?',
    options: ['Supervised Learning (Pembelajaran Terawasi)', 'Unsupervised Learning', 'Reinforcement Learning', 'Random Guessing'],
    answer: 0,
    explanation: 'Supervised Learning menggunakan data berlabel (input dan output target) agar model belajar memprediksi label untuk data baru.',
  },
  {
    id: 'gen_01',
    category: 'GENERAL_KNOWLEDGE',
    categoryName: 'Pengetahuan Umum IT',
    major: 'UMUM',
    difficulty: 'easy',
    question: 'Pencipta World Wide Web (WWW), HTML, dan browser web pertama di dunia pada tahun 1989 di CERN adalah?',
    options: ['Sir Tim Berners-Lee', 'Bill Gates', 'Linus Torvalds', 'Steve Jobs'],
    answer: 0,
    explanation: 'Sir Tim Berners-Lee menemukan WWW, protokol HTTP, dan bahasa HTML saat bekerja di laboratorium CERN Swiss.',
  },
  {
    id: 'gen_02',
    category: 'GENERAL_KNOWLEDGE',
    categoryName: 'Pengetahuan Umum IT',
    major: 'UMUM',
    difficulty: 'easy',
    question: 'Pencipta kernel sistem operasi Linux open-source dan sistem kontrol versi Git adalah?',
    options: ['Linus Torvalds', 'Richard Stallman', 'Dennis Ritchie', 'Ken Thompson'],
    answer: 0,
    explanation: 'Linus Torvalds merilis kernel Linux pada 1991 dan menciptakan Version Control System Git pada 2005.',
  },
];

// =========================================================================
// QUESTION RANDOMIZER & OPTION SHUFFLER
// =========================================================================

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Prepares a question by cloning it, shuffling its options, and updating the answer index
 * so that correct answers are never locked to a single option index.
 */
export function prepareQuestionWithOptionsShuffled(question: Question): Question {
  const originalCorrectAnswerText = question.options[question.answer ?? question.correctIndex ?? 0];
  const shuffledOptions = shuffleArray(question.options);
  const newAnswerIndex = shuffledOptions.indexOf(originalCorrectAnswerText);

  return {
    ...question,
    options: shuffledOptions,
    answer: newAnswerIndex >= 0 ? newAnswerIndex : 0,
    correctIndex: newAnswerIndex >= 0 ? newAnswerIndex : 0,
  };
}

/**
 * Retrieves randomized, non-repeating questions according to selected Category, Major, Boss Level, and Difficulty.
 */
export function getRandomQuestions(
  category: Category = 'ALL',
  count: number = 10,
  bossLevel: number = 1,
  difficulty: Difficulty = 'MEDIUM',
  major: Major = 'ALL'
): Question[] {
  let pool = [...QUESTION_BANK];

  // 1. Filter by Major if specified and not ALL
  if (major !== 'ALL') {
    pool = pool.filter((q) => q.major === major || q.major === 'UMUM');
  }

  // 2. Filter by Category if specified and not ALL
  if (category !== 'ALL') {
    // Map legacy categories if needed
    const catUpper = category.toUpperCase();
    if (catUpper === 'PROGRAMMING') {
      pool = QUESTION_BANK.filter((q) => q.category === 'PROGRAMMING' || q.category === 'ALGORITHM');
    } else if (catUpper === 'DATABASE') {
      pool = QUESTION_BANK.filter((q) => q.category === 'DATABASE');
    } else if (catUpper === 'NETWORK') {
      pool = QUESTION_BANK.filter((q) => q.category === 'NETWORK' || q.category === 'CYBER_SECURITY');
    } else if (catUpper === 'COMPUTER') {
      pool = QUESTION_BANK.filter((q) => q.category === 'COMPUTER_SYSTEM');
    } else {
      const match = pool.filter((q) => q.category === category);
      if (match.length > 0) pool = match;
    }
  }

  // If pool is empty or too small, fall back to whole bank
  if (pool.length === 0) {
    pool = [...QUESTION_BANK];
  }

  // 3. Score/Weight by difficulty and boss level
  // Boss 1-5: mostly easy; Boss 6-15: medium; Boss 16-25: hard
  const desiredDifficulty: ('easy' | 'medium' | 'hard')[] = [];
  if (difficulty === 'EASY' || bossLevel <= 5) {
    desiredDifficulty.push('easy', 'easy', 'medium');
  } else if (difficulty === 'HARD' || bossLevel >= 18) {
    desiredDifficulty.push('hard', 'hard', 'medium');
  } else {
    desiredDifficulty.push('medium', 'medium', 'easy', 'hard');
  }

  // Sort pool with slight preference to matching difficulty
  const sortedPool = shuffleArray(pool).sort((a, b) => {
    const aMatch = desiredDifficulty.includes(a.difficulty) ? 1 : 0;
    const bMatch = desiredDifficulty.includes(b.difficulty) ? 1 : 0;
    return bMatch - aMatch;
  });

  // 4. Select unique questions
  const selected: Question[] = [];
  const usedIds = new Set<string | number>();

  for (const q of sortedPool) {
    if (!usedIds.has(q.id)) {
      usedIds.add(q.id);
      selected.push(q);
      if (selected.length >= count) break;
    }
  }

  // If still fewer than count, fill from general bank
  if (selected.length < count) {
    const remaining = QUESTION_BANK.filter((q) => !usedIds.has(q.id));
    const shuffledRemaining = shuffleArray(remaining);
    for (const q of shuffledRemaining) {
      usedIds.add(q.id);
      selected.push(q);
      if (selected.length >= count) break;
    }
  }

  // 5. Shuffle options for each selected question to guarantee anti-bias
  return selected.slice(0, count).map(prepareQuestionWithOptionsShuffled);
}
