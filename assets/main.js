var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

// start = function(){
//     renderPlayList();
// }
// start();
var totalBody = $('#music-player-body');

var songs = [
    {
        name : 'Em của ngày hôm qua',
        singer : 'Sơn Tùng MTP',
        path : './assets/mp3/Em-Cua-Ngay-Hom-Qua-Son-Tung-M-TP.mp3',
        img : './assets/image/em-cua-ngay-hom-qua.png'
    },
    {
        name : 'Cơn mưa ngang qua',
        singer : 'Sơn Tùng MTP',
        path : './assets/mp3/Con-Mua-Ngang-Qua-Son-Tung-M-TP-Beat-Instrumental-Son-Tung-M-TP.mp3',
        img : './assets/image/con-mua-ngang-qua.jpg'
    },
    {
        name : 'Đừng về trễ',
        singer: 'Sơn Tùng MTP',
        path : './assets/mp3/Dung-Ve-Tre-Son-Tung-M-TP.mp3',
        img : './assets/image/dung-ve-tre.jpg"'
    },
    {
        name : 'Xin đừng lặng im',
        singer : 'Soobin Hoàng Sơn',
        path : './assets/mp3/Xin-Dung-Lang-Im-Beat-Soobin-Hoang-Son.mp3',
        img: './assets/image/xin-dung-lang-im.jpg'
    },
    {
        name : 'Nắng ấm xa dần',
        singer : 'Sơn Tùng MTP',
        path : './assets/mp3/Nang-Am-Xa-Dan-MTP.mp3',
        img : './assets/image/nang-am-xa-dan.jpg'
    },
    {
        name : 'Ấn nút nhớ thả giấc mơ',
        singer : 'Sơn Tùng MTP',
        path : './assets/mp3/An-Nut-Tha-Giac-Mo-Son-Tung-M-TP.mp3',
        img : './assets/image/an-nut-nho-tha-giac-mo.jpg'
    },
]

//Render ra danh sách nhạc
var playList = $('.main-song-list');
var renderPlayList = function(){
    var htmls = songs.map(function(song){
        return `
        <li class="song-item">
        <div class="song-photo-area">
            <img src="${song.img}" alt="" class="song-photo">
        </div>
        <div class="song-description">
            <h2 class="song-name">
                ${song.name}
            </h2>
            <p class="song-singer">
                ${song.singer}
            </p>
        </div>
        </li>
        `
    })
    var html =htmls.join("");
    playList.innerHTML = html;
}
renderPlayList();

//Thực hiện thu nhỏ / phóng ta phần dashboard khi scroll
var musicPhotoArea = $('.music-photo-area');
var musicPhotoAreaHeight = musicPhotoArea.offsetHeight;
document.onscroll = function(){
    var scrollTop = window.scrollY;
    // console.log(scrollTop)
    var newMusicPhotoAreaHeight = musicPhotoAreaHeight - scrollTop -50 ;

    musicPhotoArea.style.height = newMusicPhotoAreaHeight >= 0 ?
         newMusicPhotoAreaHeight + 'px' : 0 + 'px';
    musicPhotoArea.style.opacity = newMusicPhotoAreaHeight / musicPhotoAreaHeight;
}


//Xử lý chạy / dừng bài hát
var currentSongHTML = $('.song-item');
var audioTask = $('#audio');
audioTask.src= songs[1].path;
audioTask.play();
var playButton = $('.playButton');
var pauseButton = $('.pauseButton');
currentSongHTML.classList.add('song-playing');

playButton.onclick = function(){
    audioTask.play();
    playButton.classList.add('unactive');
    pauseButton.classList.remove('unactive');
}
pauseButton.onclick = function(){
    audioTask.pause();
    pauseButton.classList.add('unactive');
    playButton.classList.remove('unactive');
}
