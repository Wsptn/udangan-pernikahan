// --- 1. PENGATURAN DATA ---
const tanggalAcara = new Date("Nov 11, 2026 08:00:00").getTime();
const nomorWA = "6282132742993"; 

// --- 2. LOGIKA INPUT NAMA ---
const urlParams = new URLSearchParams(window.location.search);
const namaURL = urlParams.get('to');
const guestBox = document.getElementById('guest-name');
const inputWrapper = document.getElementById('input-name-wrapper');
const btnOpen = document.getElementById('btn-open');
const formNama = document.getElementById('formNama');

// Cek Link Nama
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
    toggleMusic(true); // Mainkan musik saat dibuka
}

// --- 3. MUSIK PINTAR (AUTO STOP & RESUME) ---
const audio = document.getElementById('lagu');
const btnMusic = document.getElementById('music-btn');
let isPlaying = false;

function toggleMusic(forcePlay = false) {
    if (forcePlay || !isPlaying) {
        audio.play().catch(e => console.log("Audio block"));
        isPlaying = true;
        btnMusic.innerHTML = '<i class="fas fa-compact-disc fa-spin"></i>';
    } else {
        stopMusic();
    }
}

function stopMusic() {
    audio.pause();
    isPlaying = false;
    btnMusic.innerHTML = '<i class="fas fa-play"></i>';
}

// [BARU] DETEKSI JIKA USER KEMBALI KE TAB
document.addEventListener('visibilitychange', function() {
    // Jika tab aktif kembali (user selesai dari Maps/WA)
    if (document.visibilityState === 'visible') {
        const cover = document.getElementById('cover');
        // Cek: Apakah undangan sudah dibuka? (Cover sudah naik?)
        if (cover.style.transform === "translateY(-100%)") {
            // Jika ya, mainkan musik lagi
            toggleMusic(true);
        }
    } 
    // Opsional: Jika user pindah tab lain, musik mati (biar tidak ganggu)
    else {
        stopMusic();
    }
});

// --- 4. COUNTDOWN ---
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

// --- 5. UTILITY ---
function copyRek() {
    navigator.clipboard.writeText("1418527232");
    alert("Nomor Rekening BNI berhasil disalin!");
}

function kirimWA(e) {
    e.preventDefault();
    
    // Matikan musik dulu sebelum pindah ke WA
    stopMusic();

    const nama = document.getElementById('formNama').value;
    const hadir = document.getElementById('formKehadiran').value;
    const pesan = document.getElementById('formPesan').value;
    const text = `Halo, saya ${nama}. Konfirmasi: ${hadir}. Ucapan: ${pesan}`;
    
    // Buka WA
    window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(text)}`, '_blank');
}