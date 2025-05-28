document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Membuat elemen popup
    const popup = document.createElement('div');
    popup.className = 'custom-popup';
    popup.style.display = 'none';
    document.body.appendChild(popup);
    
    // Membuat overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.display = 'none';
    document.body.appendChild(overlay);
    
    // Fungsi untuk mengambil data form
    function getFormData() {
        const nama = document.getElementById('nama').value;
        const nim = document.getElementById('nim').value;
        const peminatan = document.querySelector('input[name="peminatan"]:checked')?.value || '';
        const angkatan = document.getElementById('angkatan').value;
        const tanggal = document.getElementById('tanggal').value;
        const alamat = document.getElementById('alamat').value;
        
        return {
            nama,
            nim,
            peminatan,
            angkatan,
            tanggal,
            alamat
        };
    }
    
    // Fungsi untuk format tanggal
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('id-ID', options);
    }
    
    // Fungsi untuk menampilkan popup
    function showPopup(title, content, options = {}) {
        popup.innerHTML = `
            <div class="popup-title">${title}</div>
            <div class="popup-content">${content}</div>
        `;
        
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }
    
    // Fungsi untuk menyembunyikan popup
    function hidePopup() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }
    
    // Event listener untuk form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = getFormData();
        
        // Popup hanya menampilkan data form
        showPopup(
            'Data Pendaftaran', 
            `
            <div class="data-display">
                <p><strong>Nama:</strong> ${formData.nama}</p>
                <p><strong>NIM:</strong> ${formData.nim}</p>
                <p><strong>Peminatan:</strong> ${formData.peminatan}</p>
                <p><strong>Angkatan:</strong> ${formData.angkatan}</p>
                <p><strong>Tanggal Pendaftaran:</strong> ${formatDate(formData.tanggal)}</p>
                <p><strong>Alamat:</strong> ${formData.alamat}</p>
            </div>
            `,
            {}
        );
    });
    
    // Tutup popup ketika klik overlay
    overlay.addEventListener('click', hidePopup);
    
    // Tutup popup dengan tombol ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'block') {
            hidePopup();
        }
    });
    
    // Animasi tombol submit
    submitBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 7px 14px rgba(0,0,0,0.15)';
    });
    
    submitBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
    
    // Auto-set tanggal hari ini
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tanggal').value = today;
});