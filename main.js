const postsList = document.getElementById('posts-list');

function removePost()
{
    this.parentNode.remove();
}

function createPost({ header, poster, text, id, link }) {
    const li = document.createElement('li');
    li.classList.add('post');
    li.id = 'post-' + id;

    const btnDel = document.createElement('button');
    btnDel.classList.add('post__btn__delete');
    btnDel.textContent = 'X';
    btnDel.addEventListener('click', removePost);

    const headerLink = document.createElement('a');
    headerLink.href = link;

    const h4 = document.createElement('h4');
    h4.classList.add('post__header')
    h4.textContent = header;

    const posterWrapper = document.createElement('div');
    posterWrapper.classList.add('post__poster');

    const posterLink = document.createElement('a');
    posterLink.href = link;

    const posterImg = document.createElement('img');
    posterImg.src = poster;

    const bodyWrapper = document.createElement('div');
    bodyWrapper.classList.add('post__body');
    bodyWrapper.textContent = text;

    li.append(btnDel, headerLink, posterWrapper, bodyWrapper);
    headerLink.append(h4);
    posterWrapper.append(posterLink);
    posterLink.append(posterImg);

    return li;
}

async function init() {
    postsList.innerHTML = '';
    const responce = await fetch('http://inno-ijl.ru/multystub/stc-21-03/posts', {
        cors: 'no-cors'
    });
    const posts = await responce.json();

    for (let i = 0; i < posts.body.length; i++) {
        const post = createPost(posts.body[i]);
        postsList.append(post);
    }
}

init();
