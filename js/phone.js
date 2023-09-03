const loadPhones = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const getDiv = document.getElementById('phones-container');
    //Clear phone container cards before adding new cards
    getDiv.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 10 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    } else {
        showAllContainer.classList.add('hidden');
    }

    console.log(isShowAll);
    if (!isShowAll) {
        phones = phones.slice(0, 10);
    }

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center mt-2">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        getDiv.appendChild(phoneCard);
    })

    //Hide loading spinner
    loadingSpinner(false);
}

//Load individual data using id
const handleShowDetails = async (id) => {
    //Load individual data using id:
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const details = data.data;
    showPhoneDetails(details);
    console.log(data, details);
}

//Show Phone details:
const showPhoneDetails = (data) => {
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
        <img class="my-4" src="${data.image}" alt=""/>
        <div class="flex flex-col items-start">      
            <h3 id="phone-name" class="font-bold text-xl mb-4">${data.name}</h3>
            <p><strong>Storage: </strong>${data?.mainFeatures?.storage}</p>
            <p><strong>Chipset: </strong>${data?.mainFeatures?.chipSet}</p>
            <p><strong>Memory: </strong>${data?.mainFeatures?.memory}</p>
            <p><strong>Bluetooth: </strong>${data?.others?.Bluetooth}</p>
            <p><strong>Display Size: </strong>${data?.mainFeatures?.displaySize}</p>
        </div>
    `
    show_details_modal.showModal(data);
}

//Handle Search with button
function handleSearch(isShowAll) {
    loadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, isShowAll);
}

const loadingSpinner = (isLoading) => {
    const loading = document.getElementById('loading');
    if (isLoading) {
        loading.classList.remove('hidden');
    }
    else {
        loading.classList.add('hidden');
    }
}


const showAll = () => {
    handleSearch(true);
}
loadPhones();