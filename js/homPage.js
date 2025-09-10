
const muteBtn = document.getElementById('mute_btn');
const homeVideo = document.getElementById('main_pv1');

//음소거 버턴에 따른 비디오 음소거하기
function ChangeVideoSound(){
    homeVideo.muted = !homeVideo.muted;
    checkmuteBtn();
}

//음소거 상태에 따라 버튼 색상 변경
function checkmuteBtn(){

    if (homeVideo.muted) {
            muteBtn.style.backgroundColor = 'gray'; // 음소거 시 색상 변경
            muteBtn.style.color = 'white';
        } else {
            muteBtn.style.backgroundColor = ''; // 원래대로
            muteBtn.style.color = '';
        }
}

document.addEventListener('DOMContentLoaded', () => {
    homeVideo.volume = 0.25 // 초기 볼륨 설정
    checkmuteBtn(); // 초기 버튼 상태 설정
});