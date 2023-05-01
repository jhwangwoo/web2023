const allMusic = [
    {
        name : "1. 저리가라",
        artist : "parrick parrick",
        img: "music_view01",
        audio: "music_audio01"
    },{
        name : "2. 저리가라",
        artist : "parrick parrick",
        img: "music_view02",
        audio: "music_audio02"
    },{
        name : "3. 저리가라",
        artist : "parrick parrick",
        img: "music_view03",
        audio: "music_audio03"
    },{
        name : "4. 저리가라",
        artist : "parrick parrick",
        img: "music_view04",
        audio: "music_audio04"
    },{
        name : "5. 저리가라",
        artist : "parrick parrick",
        img: "music_view05",
        audio: "music_audio05"
    },{
        name : "6. 저리가라",
        artist : "parrick parrick",
        img: "music_view06",
        audio: "music_audio06"
    },{
        name : "7. 저리가라",
        artist : "parrick parrick",
        img: "music_view07",
        audio: "music_audio07"
    },{
        name : "8. 저리가라",
        artist : "parrick parrick",
        img: "music_view08",
        audio: "music_audio08"
    },{
        name : "9. 저리가라",
        artist : "parrick parrick",
        img: "music_view09",
        audio: "music_audio09"
    },{
        name : "10. 저리가라",
        artist : "parrick parrick",
        img: "music_view10",
        audio: "music_audio10"
    }
    
];

//선택자
const musicWrap = document.querySelector(".music__wrap");
const musicName = musicWrap.querySelector(".music__control .title h3");
const musicArtist = musicWrap.querySelector(".music__control .title p");
const musicView = musicWrap.querySelector(".music__view .image img");
const musicAudio = musicWrap.querySelector("#main-audio");
const musicPlay = musicWrap.querySelector("#control-play");
const musicPrevbtn = musicWrap.querySelector("#control-prev");
const musicNextbtn = musicWrap.querySelector("#control-next");
const musicProgress = musicWrap.querySelector(".progress");
const musicProgressBar = musicWrap.querySelector(".progress .bar");
const musicProgressCurrent = musicWrap.querySelector(".progress .timer .current");
const musicProgressDuration = musicWrap.querySelector(".progress .timer .duration");
const musicRepeat = musicWrap.querySelector("#control-repeat");
const musicListBtn = musicWrap.querySelector("#control-list");
const musicList = musicWrap.querySelector(".music__list");
const musicListUl = musicWrap.querySelector(".music__list ul");
const musicListClose = musicWrap.querySelector(".music__list h3 .close");

let musicIndex = 1; //현재 음악 인덱스

//음악 재생 파일
const loadMusic = (num) => {
    musicName.innerText = allMusic[num-1].name;             //뮤직 이름
    musicArtist.innerText = allMusic[num-1].artist;         //뮤직 아티스트
    musicView.src = `img/${allMusic[num-1].img}.png`;       //뮤직 이미지
    musicView.alt = allMusic[num-1].name;                   //뮤직 이미지 alt
    musicAudio.src = `audio/${allMusic[num-1].audio}.mp3`;   //뮤직 파일
};

//재생
const palyMusic = () => {
    musicWrap.classList.add("paused");
    musicPlay.setAttribute("title", "정지");
    musicPlay.setAttribute("class", "stop");
    musicAudio.play();
};

//정지
const pauseMusic = () => {
    musicWrap.classList.remove("paused");
    musicPlay.setAttribute("title", "재생");
    musicPlay.setAttribute("class", "play");
    musicAudio.pause();

};

//이전곡 듣기 
const prevMusic = () => {
    musicIndex == 1 ? musicIndex = allMusic.length : musicIndex--;

    loadMusic(musicIndex);
    palyMusic();
    palyListMusic();
};

//다음곡 듣기 
const nextMusic = () => {
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;

    // console.log(musicIndex)
    loadMusic(musicIndex);
    palyMusic();
    palyListMusic();
};

//뮤직 진행바
musicAudio.addEventListener("timeupdate", e => {
    const currentTime = e.target.currentTime;           //재생되는시간
    const duration = e.target.duration;                 //오디오의 총길이
    let progressWidth = (currentTime/duration) * 100 ;  //전체길이에서 현재 진행되는 시간을 백분위 단위로 나누면 그값의 width값을 알수 있다.

    musicProgressBar.style.width = `${progressWidth}%`

    //전체 시간
    musicAudio.addEventListener("loadeddata", () => {
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10) totalSec = `0${totalSec}`;
        musicProgressDuration.innerText = `${totalMin}:${totalSec}`;
    });

    //진행 시간
    let currenMin = Math.floor(currentTime / 60);
    let currenSec = Math.floor(currentTime % 60);

    if(currenSec < 10) currenSec = `0${currenSec}`;
    musicProgressCurrent.innerText = `${currenMin}:${currenSec}`;
});

// 진행 버튼 클릭 
musicProgress.addEventListener("click", (e) => {
    let progressWidth = musicProgress.clientWidth; //진행바 전체 길이
    let clickedOffsetX = e.offsetX;                //진행바를 기준으로 측정되는 X좌표 값
    let songDuration = musicAudio.duration;        //오디오 전체길이
    // console.log(songDuration);

    //백분위로 나눈 숫자에 다시 전체 길이를 곱해서 현재 재생값으로 바꿈
    musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    
});

// 반복 버튼 클릭
musicRepeat.addEventListener("click", () => {
    let getAttr = musicRepeat.getAttribute("class");

    switch(getAttr){
        case "repeat":
            musicRepeat.setAttribute("class", "repeat_one");
            musicRepeat.setAttribute("title", "한곡 반복");
        break;
        case "repeat_one":
            musicRepeat.setAttribute("class", "shuffle");
            musicRepeat.setAttribute("title", "랜덤 반복");
        break;
        case "shuffle":
            musicRepeat.setAttribute("class", "repeat");
            musicRepeat.setAttribute("title", "전체 반복");
        break;
    }
});

// 오디오가 끝나면
musicAudio.addEventListener("ended", () => {
    let getAttr = musicRepeat.getAttribute("class");

    switch (getAttr) {
        case "repeat":
            nextMusic();
        break;
        case "repeat_one":
            palyMusic();
        break;
        case "shuffle":
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1); //랜덤 인덱스 생성

            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1);
            } while (musicIndex == randomIndex);   //랜덤인덱스가 현재인덱스와 같을때 다시한번 더 랜덤
  
            musicIndex = randomIndex;  //현재 인덱스를 랜덤 인덱스로 변경

            loadMusic(musicIndex);
            palyMusic();
        break;
    }
    palyListMusic();
});

// 플레이 버튼
musicPlay.addEventListener("click", () => {
    const isMUsicPaused = musicWrap.classList.contains("paused");//클라스가 있는지 확인하는contains 음악재생중

    isMUsicPaused ?  pauseMusic() : palyMusic();
});


//이전곡 듣기 버튼
musicPrevbtn.addEventListener("click", () => {
    prevMusic();
});


//다음곡 듣기 버튼
musicNextbtn.addEventListener("click", () => {
    nextMusic();
});

// 뮤직 리스트 버튼
musicListBtn.addEventListener("click", () => {
    musicList.classList.add("show");
});

musicListClose.addEventListener("click", () => {
    musicList.classList.remove("show");
});

// 뮤직 리스트 구현하기
for(let i=0; i < allMusic.length; i++){
    let li = `
        <li data-index="${i+1}">
            <span class="img">
                <img src="img/${allMusic[i].img}.png" alt="">
            </span>
            <span class="title">
                <strong>${allMusic[i].name}</strong>
                <em>${allMusic[i].artist}</em>
                <audio class="${allMusic[i].audio}" src="audio/${allMusic[i].audio}.mp3"></audio>
            </span>
            <span class="audio-duration" id="${allMusic[i].audio}">재생시간</span>
        </li>
    `;
    // musicListUl.innerHTML += li;
    musicListUl.insertAdjacentHTML("beforeend", li);//insertAdjacentHTML있다

    // //리스트에 음악 시간 불러오기
    let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`); //리스트에서 시간을 표시할 선택자
    let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`);         //리스트에서 오디오 파일 선택
    // console.log(liAudio)
    liAudio.addEventListener("loadeddata", () => {
        let audioDuration = liAudio.duration;
        // console.log(audioDuration)
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10) totalSec = `0${totalSec}`;
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        liAudioDuration.setAttribute("data-duration", `${totalMin}:${totalSec}`);
    });
}

// 뮤직 리스트르 클릭하면 재생
function palyListMusic() {
    const musicListAll =  musicListUl.querySelectorAll("li");    //뮤직 리스트
    for(let i=0; i<musicListAll.length; i++){
        let audioTag = musicListAll[i].querySelector(".audio-duration");
        
        musicListAll[i].setAttribute("onclick", "onclicked(this)");

        if(musicListAll[i].classList.contains("playing")){
            musicListAll[i].classList.remove("playing");
            let dataAudioDuration = audioTag.getAttribute("data-duration");
            audioTag.innerText = dataAudioDuration;
        }

        if(musicListAll[i].getAttribute("data-index") == musicIndex){
            musicListAll[i].classList.add("playing");
            audioTag.innerText = "재생중";
        }
    }
}
palyListMusic();

// 뮤직 리스트를 클릭하면
function onclicked(el){
    let getIndex = el.getAttribute("data-index");
    
    musicIndex = getIndex;
    loadMusic(musicIndex);
    palyMusic();
    palyListMusic();
};


//윈도우 로드시 발생
window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

