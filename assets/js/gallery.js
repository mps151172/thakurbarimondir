document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('galleryGrid');
    const categoryBtns = document.querySelectorAll('.category-btn');
    let allGalleryItems = [];
    
    // Firebase থেকে গ্যালারি ডাটা লোড
    function loadGallery(category = 'all') {
        galleryGrid.innerHTML = '<div class="loading">ছবি লোড হচ্ছে...</div>';
        
        const database = firebase.database();
        const galleryRef = database.ref('gallery');
        
        galleryRef.once('value').then((snapshot) => {
            galleryGrid.innerHTML = '';
            allGalleryItems = [];
            const galleryData = snapshot.val();
            
            if (!galleryData) {
                galleryGrid.innerHTML = '<div class="no-images">কোন ছবি পাওয়া যায়নি</div>';
                return;
            }
            
            // সব আইটেম প্রসেসিং
            Object.keys(galleryData).forEach(key => {
                const item = galleryData[key];
                allGalleryItems.push(item);
                
                if (category === 'all' || item.category === category) {
                    createGalleryItem(item);
                }
            });
            
            if (galleryGrid.innerHTML === '') {
                galleryGrid.innerHTML = '<div class="no-images">এই ক্যাটাগরিতে কোন ছবি নেই</div>';
            }
        });
    }
    
    // গ্যালারি আইটেম ক্রিয়েট
    function createGalleryItem(item) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        galleryItem.innerHTML = `
            <a href="${item.imageUrl}" data-lightbox="gallery" data-title="${item.caption || ''}">
                <img src="${item.imageUrl}" alt="${item.caption || 'মিলরোড ঠাকুরবাড়ী'}">
            </a>
            <div class="image-caption">
                ${item.caption || ''}
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    }
    
    // ক্যাটাগরি বাটন ইভেন্ট
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterGallery(category);
        });
    });
    
    // গ্যালারি ফিল্টার
    function filterGallery(category) {
        galleryGrid.innerHTML = '';
        
        if (category === 'all') {
            allGalleryItems.forEach(item => createGalleryItem(item));
        } else {
            const filteredItems = allGalleryItems.filter(item => item.category === category);
            
            if (filteredItems.length === 0) {
                galleryGrid.innerHTML = '<div class="no-images">এই ক্যাটাগরিতে কোন ছবি নেই</div>';
            } else {
                filteredItems.forEach(item => createGalleryItem(item));
            }
        }
    }
    
    // ইনিশিয়াল লোড
    loadGallery();
    
    // Lightbox ক্যাপশনে বাংলা ফন্ট সাপোর্ট
    const style = document.createElement('style');
    style.innerHTML = `
        .lb-data .lb-caption {
            font-family: 'SolaimanLipi', 'Hind Siliguri', sans-serif;
            font-size: 16px;
            line-height: 1.5;
        }
    `;
    document.head.appendChild(style);
});