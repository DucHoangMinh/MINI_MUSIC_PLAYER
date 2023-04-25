var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

// start = function(){
//     renderPlayList();
// }
// start();
var totalBody = $('#music-player-body');

var songs = [
    {
        name : 'Anh sai rồi',
        singer : 'Sơn Tùng MTP',
        path : './assets/mp3/Anh-Sai-Roi-Son-Tung-M-TP.mp3',
        img : './assets/image/anh-sai-roi.jpg'
    },
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
        img : './assets/image/dung-ve-tre.jpg'
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
var songsListLength = songs.length;
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


//Xử lý khi bắt đầu vào trang web
//Load ra bài hát ở trên cùng 
var playButton = $('.playButton');
var pauseButton = $('.pauseButton');
var audioTask = $('#audio');
var currentSongHTML = $('.song-item');
var songPlayingPhoto = $('.music-photo');
var currentSong = songs[0];

var loadSong = function(song){
    pauseButton.classList.remove('unactive');
    playButton.classList.add('unactive');
    
    songPlayingPhoto.src= song.img;
    $('.playing-song-name').innerHTML = `${song.name}`;
    $('.playing-singer-name').innerHTML = `${song.singer}`;
    audioTask.src= song.path;
    audioTask.play();
}
loadSong(currentSong);


//Hàm xử lý sự kiện ấn vào play/pause
currentSongHTML.classList.add('song-playing');
//Có thể sử dụng audio.onplay() = function() để set sự kiện khi audio đang play
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


//Sử dụng ontimeupdate để bắt sự kiện khi mà bài hát đang được chơi
//Sử dụng currentTime để lấy ra thời gian hiện tại của bài hát
//Sử dụng duration để lấy tổng thời lượng bài hát
var songProgressRange = $('.song-progress');
audioTask.ontimeupdate = function() {
    if(audioTask.duration){
        var currentProgress = (audioTask.currentTime / audioTask.duration * 100);
        songProgressRange.value = currentProgress; 
    }
}
//Xử lý khi tua bài hát
songProgressRange.onchange = function(){
    // console.log(songProgressRange.value)
    audioTask.currentTime =  songProgressRange.value / 100  * audioTask.duration;
}


//Xử lý đĩa quay khi nhạc chơi



//Xử lý khi tua bài hát tiếp theo / quay về bài hát trước đó
var songItems = $$('.song-item');
var nextSong = function() {
    var currentSongIndex;
    songItems.forEach(function(songItem,index){
        if(songItem.classList.contains('song-playing')){
            currentSongIndex = index;
            // songItem.classList.add('song-playing')
        }
    })
    $('.song-item.song-playing').classList.remove('song-playing');
    songItems[currentSongIndex == songsListLength - 1 
        ? 0 : currentSongIndex + 1].classList.add('song-playing');
    var nextSong = (currentSongIndex === songsListLength - 1 )
        ? songs[0] : songs[currentSongIndex + 1];
    loadSong(nextSong);
}
var previousSong = function() {
    var currentSongIndex;
    songItems.forEach(function(songItem,index){
        if(songItem.classList.contains('song-playing')){
            currentSongIndex = index;
            // songItem.classList.add('song-playing')
        }
    })
    $('.song-item.song-playing').classList.remove('song-playing');
    songItems[currentSongIndex == 0 
        ? songsListLength -1 : currentSongIndex - 1].classList.add('song-playing');
    var previousSong = (currentSongIndex == 0 )
        ? songs[songsListLength - 1] : songs[currentSongIndex - 1];
    loadSong(previousSong);
}
var forwardButton = $('.stepforward');
forwardButton.onclick = function(){
    nextSong();
}
var backwarđButton = $('.stepbackward');
backwarđButton.onclick = function(){
    previousSong();
}
//Xử lý khi click bài hát khác
// var songItems = $$('.song-item');
var changeNewSong = function(index){
    var newSong = songs[index];
    loadSong(newSong);
}
songItems.forEach(function(songItem,index){
    songItem.onclick = function(){
        $('.song-item.song-playing').classList.remove('song-playing');
        changeNewSong(index);
        songItem.classList.add('song-playing');
    }
})