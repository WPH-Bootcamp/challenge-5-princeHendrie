[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/GmmSDIPy)
# Assignment 5: To-Do App dengan Class, Async, dan DOM (atau CLI)

> Mentor: Henry Rivardo
> Estimasi Waktu: 7 hari

---

## Selamat Datang

Halo teman-teman, selamat datang di assignment kelima kalian.

Di tahap ini, kita mulai bergerak dari sekadar menulis logic menjadi membangun sesuatu yang menyerupai aplikasi sungguhan. Kalian akan belajar memodelkan data dengan class, menangani proses asynchronous, mengelola error secara sadar, serta berinteraksi dengan pengguna melalui antarmuka, baik di browser maupun di terminal.

---

## Konteks Assignment

Kalian akan membangun aplikasi **To-Do List**. Pilih salah satu dari dua jalur berikut:

### Opsi A: Browser App (Direkomendasikan)

Aplikasi berbasis web yang menggunakan DOM untuk menampilkan dan mengelola To-Do.

### Opsi B: CLI App

Aplikasi berbasis command line menggunakan Node.js.

Apapun jalur yang dipilih, semua konsep utama (class, async, error handling, validasi) tetap harus terpenuhi.

---

## Tech Stack

- JavaScript (ES6 ke atas)
- Class
- Async / Await
- Fetch API (untuk Browser)
- DOM Manipulation (untuk Browser)
- Node.js (untuk CLI)

---

## Checklist Wajib

Pastikan submission kalian memenuhi seluruh poin berikut:

1. Menggunakan class (`Todo`, `TodoList`) dengan constructor dan method
2. Mengimplementasikan async / await (fetch atau Promise)
3. Menggunakan try / catch untuk error handling
4. Validasi input dari user
5. Menampilkan dan mengelola data To-Do
6. Menangani kondisi edge case (list kosong, input invalid, fetch gagal)

---

## Arahan dari Mentor

Bagian ini adalah panduan berpikir, bukan template jawaban. Jawablah pertanyaannya dulu, lalu terjemahkan ke dalam kode.

### 1. Sebelum Menulis Satu Baris Kode

Sebelum menyentuh keyboard, coba pahami dulu apa yang sedang kalian bangun.

Tanyakan pada diri sendiri:

- Apa definisi sebuah "task" dalam aplikasi ini?
- Informasi apa saja yang melekat pada sebuah task?
- Bagaimana flow pengguna dari membuka aplikasi sampai menyelesaikan task?
- Aksi apa saja yang harus tersedia dan apa konsekuensinya pada data?

Gambarkan dulu di atas kertas, atau tulis dalam bentuk flow sederhana. Kode yang baik selalu lahir dari pemahaman yang baik.

---

### 2. Memodelkan Data dengan Class

Kalian diminta menggunakan class. Ini bukan hanya soal sintaks, melainkan soal cara berpikir.

Renungkan:

- Apa tanggung jawab dari class `Todo`? Apa yang **hanya boleh** dilakukan oleh dirinya?
- Apa tanggung jawab dari class `TodoList`? Apa yang seharusnya tidak ia urus?
- Jika nanti aplikasi ini berkembang (misalnya menambah kategori atau prioritas), apakah struktur class kalian masih masuk akal?

Petunjuk berpikir:

- Property apa saja yang membentuk identitas sebuah task?
- Method apa yang dibutuhkan agar `TodoList` benar-benar bisa "mengelola" sekumpulan task?
- Apakah kalian perlu unique ID? Jika ya, dari mana asalnya?

Opsional (nilai tambah):

- Coba pikirkan kapan **inheritance** atau **static method** benar-benar dibutuhkan, bukan sekadar dipakai untuk pamer fitur.

---

### 3. Async dan Data Handling

Aplikasi modern jarang sekali berjalan sinkron sepenuhnya. Di sini kalian mulai berkenalan dengan cara berpikir asynchronous.

Jika memilih **Browser App**:

- Gunakan `fetch` dengan `async / await`
- Ambil data dari sebuah public API (contoh: JSONPlaceholder, DummyJSON, atau API publik lain)
- Tanyakan: kapan data ini di-fetch? Saat halaman dibuka? Saat tombol ditekan?
- Apa yang harus user lihat saat data sedang dimuat?

Jika memilih **CLI App**:

- Gunakan `Promise` untuk mensimulasikan operasi asynchronous (misalnya delay loading, simulasi panggilan API)
- Pikirkan kapan async benar-benar memberi nilai dibanding eksekusi sinkron biasa

Renungkan:

- Apa yang terjadi pada UI atau output kalian saat data belum siap?
- Bagaimana kalian mencegah race condition sederhana (misalnya user menekan tombol dua kali)?

---

### 4. Error Handling yang Sadar

Error handling bukan sekadar membungkus segalanya dengan `try / catch`. Ia adalah keputusan: error apa yang mungkin terjadi, dan apa yang harus dilakukan ketika terjadi.

Bayangkan skenario berikut dan tentukan responsnya:

- API yang kalian panggil down atau lambat
- User memasukkan input kosong, atau hanya spasi
- Data yang diterima tidak sesuai dengan yang diharapkan
- Operasi yang seharusnya berhasil ternyata gagal di tengah jalan

Pertanyaan kunci:

- Apakah user kalian tahu sesuatu sedang salah?
- Apakah pesan errornya membantu user mengambil tindakan, atau hanya menampilkan log teknis?
- Apakah aplikasi kalian tetap berjalan, atau langsung mati?

---

### 5. DOM Manipulation (Jika Browser)

Gunakan API DOM yang tepat untuk pekerjaan yang tepat.

Fokus pada:

- Bagaimana cara membaca dan menulis elemen tanpa reload halaman?
- Bagaimana cara menjaga state tampilan tetap konsisten dengan data?
- Bagaimana cara menulis event listener yang tidak menimbulkan kebocoran atau duplikasi handler?

Renungkan:

- Setiap kali data berubah, apa saja yang harus di-render ulang?
- Apakah kalian sedang membangun ulang seluruh list, atau hanya memperbarui bagian yang perlu? Mana yang lebih masuk akal di kasus kalian?

---

### 6. CLI Logic (Jika CLI)

Susun aplikasi kalian sebagai sebuah loop interaktif. Pikirkan:

- Bagaimana user memilih menu?
- Apa yang terjadi ketika user salah ketik?
- Bagaimana cara keluar dari aplikasi dengan rapi?

Function yang **mungkin** muncul (silakan sesuaikan dengan desain kalian sendiri):

- Membuat ID unik
- Menambahkan task baru
- Menandai task selesai
- Menghapus task
- Menampilkan daftar task
- Menjalankan loop utama aplikasi

Ingat: nama dan struktur function harus mencerminkan tanggung jawabnya.

---

### 7. Validasi dan Feedback ke User

Validasi adalah bentuk respect terhadap user. Pikirkan:

- Input seperti apa yang kalian anggap valid? Tulis aturannya sebelum menulis kode validasinya.
- Apa pesan yang muncul ketika user memberi input salah?
- Apa yang user lihat ketika belum ada task sama sekali?

Sebuah aplikasi yang baik tidak hanya bekerja saat input benar, tetapi juga elegan ketika input salah.

---

### 8. Kerapihan Kode

Tulis kode dengan asumsi orang lain akan membacanya minggu depan, dan orang itu bisa jadi kalian sendiri yang sudah lupa konteks.

Tanyakan pada diri sendiri:

- Apakah nama variable dan function langsung berbicara tentang maksudnya?
- Apakah function kalian melakukan satu hal, atau terlalu banyak?
- Apakah ada bagian yang berulang yang bisa diabstraksi, atau justru abstraksi terlalu dini yang membuat kode susah dibaca?

Tidak ada aturan baku, tetapi konsistensi adalah teman terbaik kalian.

---

## Struktur Folder (Contoh)

Struktur ini hanya contoh. Silakan susun ulang sesuai pemahaman kalian.

### Browser App

```
root/
    ├── index.html
    ├── script.js
    └── style.css
```

### CLI App

```
root/
    ├── index.js
    └── package.json
```

### Instalasi untuk CLI App

1. `npm init -y`
2. `npm install prompt-sync`

---

## Workflow yang Disarankan

1. Pilih jalur: Browser atau CLI
2. Rancang flow aplikasi di atas kertas
3. Implementasikan class terlebih dahulu, uji secara terisolasi
4. Tambahkan logic async
5. Tambahkan error handling secara sadar
6. Bangun UI (DOM atau CLI)
7. Uji berbagai skenario, termasuk skenario yang "tidak normal"
8. Refactor untuk kerapihan dan keterbacaan

---

## Kriteria Penilaian

| No  | Kriteria                           | Bobot    |
| --- | ---------------------------------- | -------- |
| 1   | Pemenuhan requirement              | 40%      |
| 2   | Penggunaan JavaScript              | 30%      |
| 3   | Problem solving dan error handling | 20%      |
| 4   | Kerapihan dan keterbacaan kode     | 10%      |
|     | **Total**                          | **100%** |

---

## Pertanyaan Refleksi (Wajib Dijawab Sendiri Setelah Selesai)

Sebelum submit, coba jawab di kepala kalian:

1. Bagian mana yang paling sulit, dan apa yang membuatnya sulit?
2. Jika diberi waktu satu hari lagi, apa yang akan kalian perbaiki?
3. Apakah class kalian benar-benar membantu, atau hanya menjadi pembungkus tanpa nilai tambah?

Jawaban kalian tidak perlu dikirim, tetapi pertanyaan ini adalah cermin sejauh mana kalian memahami pekerjaan sendiri.

---

Di assignment ini, kalian mulai masuk ke level di mana kode kalian menyerupai aplikasi nyata.

Jangan hanya fokus pada "berhasil jalan". Fokus juga pada:

- Apakah kode kalian scalable?
- Apakah mudah dibaca oleh orang lain?
- Apakah mudah dikembangkan ke depan?

Kalau kalian bisa menguasai assignment ini dengan baik, kalian sudah satu langkah lebih dekat menjadi developer yang siap kerja di dunia nyata.

Selamat mengerjakan.

Salam,
**Henry Rivardo**
