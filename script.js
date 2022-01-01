let posts = [
    {
        'author': 'tagesschau',
        'profile-img': 'img/img1-profile.jpg',
        'image': 'img/img1.jpg',
        'description': 'But were free to tell the browser to size the image to 100% of its container width and 100% of its container height.Then it will create a box that completely fills the container space.',
        'location': 'Berlin, Deutschland',
        'likes': 68,
        'comments': [
            {
                'username': 'mv_33',
                'comment': 'Klasse Max!'
            },
            {
                'username': 'peter.h',
                'comment': 'Verdient Weltmeister!!'
            }
        ],
        'uploadTime': new Date(2021, 11, 24, 13, 40, 0, 0),
        'loggedUser': '',
        'loggedUserComment': ''
    },
    {
        'author': 'tagesschau',
        'profile-img': 'img/img1-profile.jpg',
        'image': 'img/img2.jpg',
        'description': 'Text2',
        'location': 'München, Deutschland',
        'likes': 105,
        'comments': [
            {
                'username': 'richard.t',
                'comment': 'Sehr schöner Wagen'
            },
            {
                'username': 'erika.b',
                'comment': 'Ein Traum!!!'
            }
        ],
        'uploadTime': new Date(2021, 11, 29, 12, 22, 0, 0),
        'loggedUser': '',
        'loggedUserComment': ''
    },
    {
        'author': 'tagesschau',
        'profile-img': 'img/img1-profile.jpg',
        'image': 'img/img3.jpg',
        'description': 'Text3',
        'location': 'Frankfurt, Deutschland',
        'likes': 119,
        'comments': [
            {
                'username': 'francesco.italia',
                'comment': 'ich liebe ferrari'
            },
            {
                'username': 'lukas.0815',
                'comment': 'sieht einfach in jeder Farbe super aus'
            }
        ],
        'uploadTime': new Date(2021, 11, 29, 11, 34, 0, 0),
        'loggedUser': '',
        'loggedUserComment': ''
    }

];


function generatePostContainer() {
    let content = document.getElementById('post-container');
    content.innerHTML = '';


    for (let i = 0; i < posts.length; i++) {
        const element = posts[i];
        let likeCounter = element['likes'];

        content.innerHTML += `
            <div class="post-layout">
                <div class="border-radius post-padding row space-between bgr">
                    <div class="row bgr">
                        <img class="sug-img" src="${element['profile-img']}">
                        <div class="column2">
                            <span><b>${element['author']}</b></span>
                            <span>${element['location']}</span>
                        </div>
                    </div>
                    <div>
                        <img class="pointer" src="img/icons/more_horiz_black_24dp.svg">
                    </div>
                </div>
                <div class="img-container">
                    <img class="post-img" src="${element['image']}">
                    <img id="showUpHeart${i}" class="heart-position" src="img/icons/heart-white.png">
                </div>
                <div class="post-padding row space-between bgr">
                    <div class="row gap bgr">
                        <img id="heart${i}" class="icons-size2 pointer" src="img/icons/heart-thin.svg" onclick="redLikeButton(${i})">
                        <img class="icons-size2 pointer" src="img/icons/comments-32.png" onclick="inputFocus(${i})">
                        <img class="icons-size2 pointer" src="img/icons/sent.svg">
                    </div>
                    <div>
                        <img class="icons-size2 pointer" src="img/icons/bookmark_border_black_24dp.svg">
                    </div>
                </div>
                <div>
                    <p class="padding-left-right margin-zero">Gefällt <b><span id="likeCounter${i}">${likeCounter}</span> Mal</b></p>
                </div>
                <div class="padding-left-right margin-zero">
                    <span><b>${element['author']}</b></span>
                    <span>${element['description']}</span>
                </div>
                <div id="postedComments${i}" class="padding-left-right">
                    ${loadComments(i)}
                </div>
                <div class="padding-left-right profile-desc2">
                    VOR${timePassed(i)}
                </div>
                <div class="posting-section padding-left-right">
                    <input id="input-comment${i}" class="input-comment" type="text" placeholder="Kommentar hinzufügen ..." onkeyup="allowCommenting(${i})">
                    <button id="post-button${i}" class="change-profile bgr not-clickable" onclick="addComment(${i})">Posten</button>
                </div>
            </div>
        `;
    }
}

function loadComments(position) {
    let allComments = '';

    for (let i = 0; i < posts[position].comments.length; i++) {
        allComments += `
            <div class="row comment-margin bgr">
                <div><b>${posts[position].comments[i].username}</b>&nbsp;</div>
                <div>${posts[position].comments[i].comment}</div>
            </div>
        `;
    }

    return allComments;
}

function timePassed(position) {
    const postingTime = posts[position].uploadTime;
    const startStamp = postingTime.getTime();

    let currentDate = new Date();
    let endStamp = currentDate.getTime();

    let diff = Math.round((endStamp - startStamp) / 1000);

    let d = Math.floor(diff / (24 * 60 * 60));
    diff = diff - (d * 24 * 60 * 60);
    let h = Math.floor(diff / (60 * 60));
    diff = diff - (h * 60 * 60);
    let m = Math.floor(diff / (60));
    diff = diff - (m * 60);
    let s = diff;

    if (d > 1) {
        return ' ' + d + ' TAGEN';
    } else if (d == 1) {
        return ' EINEM TAG';
    } else if (h > 1) {
        return ' ' + h + ' STUNDEN';
    } else if (h == 1) {
        return ' EINER STUNDE';
    } else if (h < 1 && m > 1) {
        return ' ' + m + ' MINUTEN';
    } else if (m <= 1) {
        return ' EINER MINUTE';
    }

}

function allowCommenting(position) {
    let input = document.getElementById('input-comment' + position);

    if (input.value.length > 0) {
        document.getElementById('post-button' + position).classList.remove('not-clickable');
        document.getElementById('post-button' + position).classList.add('pointer');
    } else {
        document.getElementById('post-button' + position).classList.add('not-clickable');
        document.getElementById('post-button' + position).classList.remove('pointer');
    }
}

function addComment(position) {
    let input = document.getElementById('input-comment' + position);
    let commentSection = document.getElementById('postedComments' + position);

    let userName = posts[position].loggedUser;
    let userComment = posts[position].loggedUserComment;

    userName = 'a.baraev';
    userComment = input.value;

    commentSection.innerHTML += `
        <div class="row comment-margin bgr post-animation">
            <div><b>${userName}</b>&nbsp;</div>
            <div>${userComment}</div>
        </div>
    `;

    input.value = '';


}

function redLikeButton(position) {
    let img = document.getElementById('heart' + position);
    let heart = document.getElementById('showUpHeart' + position);
    let likes = document.getElementById('likeCounter' + position);
    let likeCounter = posts[position].likes;

    if (img.getAttribute('src') === 'img/icons/heart-thin.svg') {
        img.src = 'img/icons/heart-full.png';
        heart.classList.add('like-animation');
        let amountOfLikes = likeCounter + 1;     // Wie kann der Wert im JSON ausgetauscht werden?
        likes.innerHTML = amountOfLikes;
    } else {
        img.src = 'img/icons/heart-thin.svg';
        heart.classList.remove('like-animation');
        likes.innerHTML = posts[position].likes;
    }


}

function inputFocus(position) {
    document.getElementById('input-comment' + position).focus();
}


function filterPosts() {
    
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase();

    let content = document.getElementById('post-container');
    content.innerHTML = '';


    for (let i = 0; i < posts.length; i++) {

        let names = posts[i].author;

        if (names.toLowerCase().includes(search)) {
            const element = posts[i];
            let likeCounter = element['likes'];

            content.innerHTML += `
            <div class="post-layout">
                <div class="border-radius post-padding row space-between bgr">
                    <div class="row bgr">
                        <img class="sug-img" src="${element['profile-img']}">
                        <div class="column2">
                            <span><b>${element['author']}</b></span>
                            <span>${element['location']}</span>
                        </div>
                    </div>
                    <div>
                        <img class="pointer" src="img/icons/more_horiz_black_24dp.svg">
                    </div>
                </div>
                <div class="img-container">
                    <img class="post-img" src="${element['image']}">
                    <img id="showUpHeart${i}" class="heart-position" src="img/icons/heart-white.png">
                </div>
                <div class="post-padding row space-between bgr">
                    <div class="row gap bgr">
                        <img id="heart${i}" class="icons-size2 pointer" src="img/icons/heart-thin.svg" onclick="redLikeButton(${i})">
                        <img class="icons-size2 pointer" src="img/icons/comments-32.png" onclick="inputFocus(${i})">
                        <img class="icons-size2 pointer" src="img/icons/sent.svg">
                    </div>
                    <div>
                        <img class="icons-size2 pointer" src="img/icons/bookmark_border_black_24dp.svg">
                    </div>
                </div>
                <div>
                    <p class="padding-left-right margin-zero">Gefällt <b><span id="likeCounter${i}">${likeCounter}</span> Mal</b></p>
                </div>
                <div class="padding-left-right margin-zero">
                    <span><b>${element['author']}</b></span>
                    <span>${element['description']}</span>
                </div>
                <div id="postedComments${i}" class="padding-left-right">
                    ${loadComments(i)}
                </div>
                <div class="padding-left-right profile-desc2">
                    VOR${timePassed(i)}
                </div>
                <div class="posting-section padding-left-right">
                    <input id="input-comment${i}" class="input-comment" type="text" placeholder="Kommentar hinzufügen ..." onkeyup="allowCommenting(${i})">
                    <button id="post-button${i}" class="change-profile bgr not-clickable" onclick="addComment(${i})">Posten</button>
                </div>
            </div>
        `;
        } else {
            content.innerHTML = `
                <div class="noPosts">Keine Posts gefunden.</div>
            `;
        }


    }

}