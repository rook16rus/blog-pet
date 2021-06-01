const btnAdd = document.getElementById('btn-add');
const addForm = document.getElementById('add-post');
const inputHeader = document.getElementById('add-header');
const inputPoster = document.getElementById('add-poster');
const inputLink = document.getElementById('add-link');
const inputText = document.getElementById('add-text');

btnAdd.addEventListener('click', () => {
    addForm.classList.remove('hide')
});

addForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('image', inputPoster.files[0]);
    const answer = await fetch('http://inno-ijl.ru/api/files/v1/img-to-webp', {
        method: 'POST',
        cors: 'no-cors',
        body: formData
    })

    const data = await answer.json();

    const posterPath = `http://89.223.91.151:8033/${data.path}`;

    await fetch('http://89.223.91.151:8080/multystub/stc-21-03/posts', {
        method: 'POST',
        cors: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            header: inputHeader.value,
            poster: posterPath,
            text: inputText.value,
            link: inputLink.value,
        })
    })

    location.reload();
})
