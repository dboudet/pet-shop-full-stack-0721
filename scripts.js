function getPets() {
    fetch('https://danb-pet-boutique.web.app/pets')
        .then(response => response.json())
        .then(data => {
            const petsListContainer = document.getElementById('js-pets-list')
            petsListContainer.innerHTML = ''
            const petsList = data.map(pet => {
                return `<article>
                <div class="pet-info"><h3>${pet.petName}</h3>
                <p>
                    Type: ${pet.petType}<br>
                    Color: ${pet.color}<br>
                    Age: ${pet.age}
                </p></div>
                <div class="pet-photo"><img src="${pet.photoURL}" alt="${pet.petName}"></div>
                </article>`
            })
            petsListContainer.innerHTML = petsList.join('<br>')
        })
        .catch(err => console.error(err))
}
getPets()

function addPet(event) {
    event.preventDefault()
    console.log('Submitted Form')
    const form = document.querySelector('form')
    const newPet = {
        petName: form.elements.petName.value,
        petType: form.elements.petType.value,
        color: form.elements.color.value,
        age: form.elements.age.value,
        photoURL: form.elements.photoURL.value
    }
    console.log(newPet)
    fetch('https://danb-pet-boutique.web.app/pets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPet),
    })
    .then(response => response.json())
    .then(json => {
        form.innerHTML = `<h3>${json.message}</h3>`
    })
    .catch(err => {
        form.innerHTML = '<h3>Error creating pet</h3>'
    })
}