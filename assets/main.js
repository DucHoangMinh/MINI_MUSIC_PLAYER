var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
// start = function(){
    //     renderPlayList();
    // }
    // start();
    var totalBody = $('#music-player-body');
    var songProgressRange = $('.song-progress');
    var musicPhotoArea = $('.music-photo-area');
    var mainMusicPhoto = $('.main-music-photo');
    var audioTask = $('#audio');
    var forwardButton = $('.stepforward');
    var backwardButton = $('.stepbackward');
    var randomButton = $('.randomButton');
    var replayButton = $('.replayButton');
    var searchButton = $('.search-icon');
    var searchInputText = $('#searchTextId');
    var closeSearchButton = $('.close-search-icon');
    
    var songs = [
    {
        name : 'Hai mươi hai',
        singer : 'Hứa Kim Tuyền, Amee',
        path : './assets/mp3/HaiMuoiHai22-HuaKimTuyenAMEE-7231237.mp3',
        img : './assets/image/hai-muoi-hai-amee.jpg'
    },
    {
        name : 'Thay mọi cô gái yêu anh',
        singer : 'AMEE',
        path : './assets/mp3/ThayMoiCoGaiYeuAnh-AMEE-7198475.mp3',
        img : './assets/image/thay-moi-co-gai-yeu-anh.jpg'
    },
    {
        name : 'Từ thích thích thành thương thương',
        singer : 'Amee ft Andiez',
        path : './assets/mp3/TuThichThichThanhThuongThuong-AMEEHoangDungTheVoice-7983036.mp3',
        img : './assets/image/tu-thich-thich-thanh-thuong-thuong.jpg'
    },
    {
        name : 'Anh đánh rơi người yêu này',
        singer : 'Amee ft Andiez',
        path : './assets/mp3/AnhDanhRoiNguoiYeuNay-Andiez-7625350.mp3',
        img : './assets/image/anh-danh-roi-nguoi-yeu-nay.jpg'
    },
    {
        name : 'Em về tinh khôi',
        singer : 'Amee ft Hoàng Dũng',
        path : './assets/mp3/em-ve-tinh-khoi-amee.mp3',
        img : './assets/image/em-ve-tinh-khoi-amee-img.jpg'
    },
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
var renderPlayList = function(songs){
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
renderPlayList(songs);
//Render lại trang web để bỏ hết danh sách bài hát
var emptySongList = function(){
    playList.innerHTML = '';
}

//Thực hiện thu nhỏ / phóng ta phần dashboard khi scroll
var musicPhotoAreaHeight = musicPhotoArea.offsetHeight;
document.onscroll = function(){
    var scrollTop = window.scrollY;
    // console.log(scrollTop)
    var newMusicPhotoAreaHeight = musicPhotoAreaHeight - scrollTop - 70 ;

    musicPhotoArea.style.height = newMusicPhotoAreaHeight >= 0 ?
         newMusicPhotoAreaHeight + 'px' : 0 + 'px';
    musicPhotoArea.style.opacity = newMusicPhotoAreaHeight / musicPhotoAreaHeight;
}


//Xử lý khi bắt đầu vào trang web
//Load ra bài hát ở trên cùng 
var playButton = $('.playButton');
var pauseButton = $('.pauseButton');
window.onload = function() {
    pauseButton.classList.add('unactive');
    playButton.classList.remove('unactive');
}
var currentSongHTML = $('.song-item');
currentSongHTML.classList.add('song-playing');
var currentSong = songs[0];

var loadSong = function(song){
    pauseButton.classList.remove('unactive');
    playButton.classList.add('unactive');
    songProgressRange.value = 0;
    mainMusicPhoto.src= song.img;
    $('.playing-song-name').innerHTML = `${song.name}`;
    $('.playing-singer-name').innerHTML = `${song.singer}`;
    audioTask.src= song.path;
    audioTask.play();
}
playButton.onclick = loadSong(currentSong);
//Lấy ra danh sách các bài hát đang hiển thị
var songItems = $$('.song-item');

//Hàm tìm index của bài hát hiện tại đang phát
var findCurrentSongIndex = function(){
    var currentSongIndex;
    songItems.forEach(function(songItem,index){
        if(songItem.classList.contains('song-playing')){
            currentSongIndex =  index;
        }
    })
    return currentSongIndex;
}


//Hàm xử lý sự kiện ấn vào play/pause
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
var musicPhotoRotate = mainMusicPhoto.animate(
    [{transform : 'rotate(360deg)'}],
    {duration : 10000,//10 seconds
    iterations : Infinity
    } 
)
musicPhotoRotate.pause();
audioTask.onplay = function(){
    musicPhotoRotate.play();
}
audioTask.onpause = function(){
    musicPhotoRotate.pause();
}


//=======Xử lý sự kiện cho nút phát ngẫu nhiên bài hát
randomButton.onclick = function(){
    randomButton.classList.toggle('button-active');
}
//Hàm xử lý việc sinh ra một bài hát mới trong danh sách
var randomSongIndex = function(){
    var randomIndex;
    do{
        randomIndex = Math.floor(Math.random() * songs.length);
    }while(randomIndex == findCurrentSongIndex())
    return randomIndex;
}
//====Xử lý sự kiện cho nút lặp lại bài hát
replayButton.onclick = function(){
    replayButton.classList.toggle('button-active');
}


//Xử lý khi tua bài hát tiếp theo / quay về bài hát trước đó
var nextSong = function() {
    var currentSongIndex = findCurrentSongIndex();
    if(replayButton.classList.contains('button-active')){
        loadSong(songs[currentSongIndex]);
    }
    else if(randomButton.classList.contains('button-active')){
        $('.song-item.song-playing').classList.remove('song-playing');
        var newRandomSong = randomSongIndex();
        songItems[newRandomSong].classList.add('song-playing');
        loadSong(songs[newRandomSong]);
    }
    else{
        $('.song-item.song-playing').classList.remove('song-playing');
        songItems[currentSongIndex == songsListLength - 1 
            ? 0 : currentSongIndex + 1].classList.add('song-playing');
        var nextSong = (currentSongIndex === songsListLength - 1 )
            ? songs[0] : songs[currentSongIndex + 1];
        loadSong(nextSong);
    }
}
//Xử lý tự động sang bài mới
audioTask.onended = function(){
    nextSong();
}
var previousSong = function() {
    var currentSongIndex = findCurrentSongIndex();
    $('.song-item.song-playing').classList.remove('song-playing');
    if(randomButton.classList.contains('button-active')){
        var newRandomSong = randomSongIndex();
        songItems[newRandomSong].classList.add('song-playing');
        loadSong(songs[newRandomSong]);
    }
    else{
        songItems[currentSongIndex == 0 
            ? songsListLength -1 : currentSongIndex - 1].classList.add('song-playing');
        var previousSong = (currentSongIndex == 0 )
            ? songs[songsListLength - 1] : songs[currentSongIndex - 1];
        loadSong(previousSong);
    }
    
}
forwardButton.onclick = function(){
    nextSong();
}
backwardButton.onclick = function(){
    previousSong();
}
//Xử lý khi click bài hát khác
// var songItems = $$('.song-item');
var changeNewSong = function(index,songList){
    var newSong = songList[index];
    loadSong(newSong);
}
songItems.forEach(function(songItem,index){
    songItem.onclick = function(){
        $('.song-item.song-playing').classList.remove('song-playing');
        changeNewSong(index,songs);
        songItem.classList.add('song-playing');
    }
})
//Xử lý sự kiện ấn vào nút tìm kiếm
searchButton.onclick = function() {

    searchInputText.classList.remove('unactive-search');
    if(searchInputText.classList.contains('unactive-search') == false) {
        searchInputText.addEventListener('input', function(){
            for(var i = 0; i < songItems.length; i ++){
                songItems[i].classList.remove('hide');
            }
            searchSongList = [];
            var findWord = searchInputText.value;
            songs.forEach(function(song,index){
                if(song.name.toLowerCase().includes(findWord.toLowerCase()) == false){
                    songItems[index].classList.add('hide');
                }
            })
        })
    }
    closeSearchButton.classList.remove('hide');
    searchButton.classList.add('hide');
    musicPhotoArea.style.height = '0px';
    mainMusicPhoto.style.display = 'none';
    playList.style.marginTop = '270px';
}
closeSearchButton.onclick = function(){
    closeSearchButton.classList.add('hide');
    searchButton.classList.remove('hide');
    searchInputText.classList.add('unactive-search');
    for(var i = 0; i < songItems.length; i ++){
        songItems[i].classList.remove('hide');
    }
    musicPhotoArea.style.height = '200px';
    mainMusicPhoto.style.display = 'block';
    playList.style.marginTop = '460px';
}