// --- 1. PENGATURAN DATA BARU ---
// Format Tanggal: Month Day, Year Time
const tanggalAcara = new Date("Nov 11, 2026 08:00:00").getTime();
const nomorWA = "6282132742993"; // Nomor WA Baru

// --- 2. LOGIKA INPUT NAMA ---
const urlParams = new URLSearchParams(window.location.search);
const namaURL = urlParams.get('to');

const guestBox = document.getElementById('guest-name');
const inputWrapper = document.getElementById('input-name-wrapper');
const btnOpen = document.getElementById('btn-open');
const formNama = document.getElementById('formNama');

if (namaURL) {
    guestBox.innerText = namaURL;
    formNama.value = namaURL;
    inputWrapper.style.display = 'none';
    btnOpen.style.display = 'block';
} else {
    guestBox.innerText = "Tamu Spesial";
    inputWrapper.style.display = 'block';
    btnOpen.style.display = 'none';
}

function simpanNama() {
    const namaInput = document.getElementById('guest-input').value;
    if (namaInput) {
        guestBox.innerText = namaInput;
        formNama.value = namaInput;
        inputWrapper.style.display = 'none';
        btnOpen.style.display = 'block';
    } else {
        alert("Mohon isi nama Anda terlebih dahulu.");
    }
}

function openInvitation() {
    const cover = document.getElementById('cover');
    cover.style.transform = "translateY(-100%)";
    toggleMusic(true);
}

// --- 3. MUSIK ---
const audio = document.getElementById('lagu');
const btnMusic = document.getElementById('music-btn');
let isPlaying = false;

function toggleMusic(forcePlay = false) {
    if (forcePlay || !isPlaying) {
        audio.play().catch(e => console.log("Audio block"));
        isPlaying = true;
        btnMusic.innerHTML = '<i class="fas fa-compact-disc fa-spin"></i>';
    } else {
        audio.pause();
        isPlaying = false;
        btnMusic.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// --- 4. COUNTDOWN (HITUNG MUNDUR) ---
const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = tanggalAcara - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "ACARA TELAH DIMULAI";
    }
}, 1000);

// --- 5. FUNGSI COPY REKENING (BNI) ---
function copyRek() {
    navigator.clipboard.writeText("1418527232"); // Nomor BNI
    alert("Nomor Rekening BNI berhasil disalin!");
}

function kirimWA(e) {
    e.preventDefault();
    const nama = document.getElementById('formNama').value;
    const hadir = document.getElementById('formKehadiran').value;
    const pesan = document.getElementById('formPesan').value;

    const text = `Halo, saya ${nama}. Konfirmasi: ${hadir}. Ucapan: ${pesan}`;
    window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(text)}`, '_blank');
}