const shareButtons = document.querySelectorAll('.tile-share-button');

console.log(shareButtons);

async function copyText(e) {
    // Mencegah tombol share membuka link tile
    e.preventDefault();
    e.stopPropagation();

    const link = this.getAttribute('link');

    console.log(link);

    try {
        await navigator.clipboard.writeText(link);
        alert("Copied the text: " + link);
    } catch (err) {
        console.error(err);
    }
}

shareButtons.forEach(shareButton => {
    shareButton.addEventListener('click', copyText);
});


// ========================================
// CATALOG SLIDER
// ========================================

let currentCatalog = 0;

const track = document.querySelector(".catalog-track");
const items = document.querySelectorAll(".catalog-item");
const dots = document.querySelectorAll(".dot");

console.log("CATALOG TRACK:", track);
console.log("CATALOG ITEMS:", items.length);
console.log("CATALOG DOTS:", dots.length);


// Update posisi catalog
function updateCatalog() {

    if (!track || items.length === 0) {
        return;
    }

    track.style.transform =
        `translateX(-${currentCatalog * 100}%)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle(
            "active",
            index === currentCatalog
        );
    });
}


// Next / Previous
function moveCatalog(direction) {

    if (items.length === 0) {
        return;
    }

    currentCatalog += direction;

    if (currentCatalog >= items.length) {
        currentCatalog = 0;
    }

    if (currentCatalog < 0) {
        currentCatalog = items.length - 1;
    }

    updateCatalog();
}


// Klik titik
function goToCatalog(index) {

    if (index < 0 || index >= items.length) {
        return;
    }

    currentCatalog = index;

    updateCatalog();
}


// ========================================
// AUTO SLIDE SETIAP 5 DETIK
// ========================================

let autoSlide = setInterval(() => {

    moveCatalog(1);

}, 5000);


// ========================================
// SWIPE / DRAG
// ========================================

let startX = 0;
let endX = 0;


// Touch HP
track.addEventListener("touchstart", function(e) {

    startX = e.touches[0].clientX;

}, { passive: true });


track.addEventListener("touchend", function(e) {

    endX = e.changedTouches[0].clientX;

    handleSwipe();

});


// Mouse PC
track.addEventListener("mousedown", function(e) {

    startX = e.clientX;

});


track.addEventListener("mouseup", function(e) {

    endX = e.clientX;

    handleSwipe();

});


function handleSwipe() {

    const difference = startX - endX;

    // Geser ke kiri
    if (difference > 50) {

        moveCatalog(1);

    }

    // Geser ke kanan
    else if (difference < -50) {

        moveCatalog(-1);

    }

}