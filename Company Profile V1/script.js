const container = document.querySelector('.container-set');
const places = document.querySelectorAll('.row .place:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const blokSelect = document.getElementById('blok');

populateUI();
let Price = +blokSelect.value;

// Save selected Blok index and price
function setDataBlok(Index, Price) {
    localStorage.setItem('selectedIndex', Index);
    localStorage.setItem('selectedPrice', Price);
}

// update total and count
function updateSelectedCount() {
    const selectedBloks = document.querySelectorAll('.row .place.selected');

    const seatsIndex = [...selectedBloks].map((seat) =>
        [...places].indexOf(seat)
    );

    localStorage.setItem('selectedBloks', JSON.stringify(seatsIndex));

    const selectedBloksCount = selectedBloks.length;

    count.innerText = selectedBloksCount;
    total.innerText = selectedBloksCount * Price;
}

// get data from localstorage and populate ui
function populateUI() {
    const selectedBloks = JSON.parse(localStorage.getItem('selectedBloks'));
    if (selectedBloks !== null && selectedBloks.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedBloks.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedBlokeIndex = localStorage.getItem('selectedIndex');

    if (selectedBlokeIndex !== null) {
        blokSelect.selectedIndex = selectedBlokeIndex;
    }
}

// Blok select event
blokSelect.addEventListener('change', (e) => {
    Price = +e.target.value;
    setDataBlok(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
    if (
        e.target.classList.contains('place') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// intial count and total
updateSelectedCount();
