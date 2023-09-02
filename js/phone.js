const loadPhones = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = phones => {
    const getDiv =  document.getElementById('phones-container');
    //Clear phone container cards before adding new cards
    getDiv.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 10) {
        showAllContainer.classList.remove('hidden')
    } else {
        showAllContainer.classList.add('hidden');
    }

    phones = phones.slice(0, 10);

    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        getDiv.appendChild(phoneCard);
    })
}

function handleSearch() {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
}

// loadPhones();