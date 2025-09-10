
const homeBtn = document.getElementById('home_btn');
const characterBtn = document.getElementById('character_btn');
const videoBtn = document.getElementById('video_btn');
const goodsBtn = document.getElementById('goods_btn');
const eventBoardBtn = document.getElementById('event_board_btn');
const recruitmentCalculatorBtn = document.getElementById('recruitment_calculator_btn');

const selectListContainer = document.getElementById("select_list_container");


//버턴 누를시 페이지 전환
homeBtn.addEventListener('click', function() {
    location.href = 'home.html';
});


characterBtn.addEventListener('click', function() {
    location.href = 'character.html';

    
});

videoBtn.addEventListener('click', function(){

    //location.href = 'video.html';

    if(selectListContainer.style.display === 'flex'){
        //이미 표시 중이면 숨기기
        selectListContainer.innerHTML = '';
        selectListContainer.style.display = 'none';
        selectListContainer.dataset.value=''; // 선택 초기화
        UpdateBtnState()
        return;
    }
    else{
        // 1. 데이터베이스에서 스테이지 목록 받아오기
    fetch("http://localhost:3000/video/stagesBtn")
        .then(res => res.json())
        .then(stages => {
            console.log("Stages fetched:", stages);
            // 2. release_date 기준 내림차순 정렬
            //stages.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            stages = stages.sort((a, b) => {
            return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
            });
            console.log(stages);

            // 3. select_list_container 초기화
            selectListContainer.innerHTML = ''; // 기존 내용 제거
            selectListContainer.style.display = 'flex'; // 컨테이너 표시
            selectListContainer.dataset.value='video'; // 현재 비디오 리스트라는 것을 표기

            UpdateBtnState();
            showSelectListContainer(this);

            // 4. 데이터 넣기
            stages.forEach(stage => {
                const div = document.createElement("div");
                div.className = "stage_description"; 
                div.onclick = function () {location.href=`video.html?stageID=${stage.stage_ID}`;};
                div.innerHTML = `
                    <p class="event_name">${stage.event_name}</p>
                    <p class="stage_ID">
                    ${stage.stage_ID}</p>
                    `;

            selectListContainer.appendChild(div);
            });

        })
        .catch(err => {
            alert('영상 목록 불러오기 실패: ' + err);
        });


    }
    console.log('end');
    
});

goodsBtn.addEventListener('click', function() {
    location.href = 'goods.html';
});

eventBoardBtn.addEventListener('click', function() {
    location.href = 'event_board.html';
});

recruitmentCalculatorBtn.addEventListener('click', function() {
    location.href = 'recruitment_calculator.html';
});

// 모든 버튼 활성화
function EnableAllBtn(){
    //각각 버턴 활성화, 활성 상태 클래스 추가
    homeBtn.disabled = false;
    homeBtn.classList.remove('topbtn_disabled');
    homeBtn.classList.add('topbtn_enabled');

    //characterBtn.disabled = false;
    characterBtn.classList.remove('topbtn_clicked');
    characterBtn.classList.add('topbtn_enabled');

    //videoBtn.disabled = false;
    videoBtn.classList.remove('topbtn_clicked');
    videoBtn.classList.add('topbtn_enabled');

    goodsBtn.disabled = false;
    goodsBtn.classList.remove('topbtn_disabled');
    goodsBtn.classList.add('topbtn_enabled');

    eventBoardBtn.disabled = false;
    eventBoardBtn.classList.remove('topbtn_disabled');
    eventBoardBtn.classList.add('topbtn_enabled');

    recruitmentCalculatorBtn.disabled = false;
    recruitmentCalculatorBtn.classList.remove('topbtn_disabled');
    recruitmentCalculatorBtn.classList.add('topbtn_enabled');
}

function UpdateBtnState(){
    console.log('UpdateBtnState called');

    

    const currentPage = location.pathname.split('/').pop(); // 현재 페이지 파일명 추출

    // 모든 버튼을 활성화 상태로 설정
    EnableAllBtn();    

     // 현재 페이지에 따라 해당 버튼 비활성화 후 활성 상태 클래스 삭제, 비활성 상태 클래스 추가
    if(selectListContainer.style.display==='flex'){
        console.log(selectListContainer.dataset.value);
        if(selectListContainer.dataset.value==='character'){
            characterBtn.classList.remove('topbtn_enabled');
            characterBtn.classList.add('topbtn_clicked');
        }
        else if(selectListContainer.dataset.value==='video'){
            videoBtn.classList.remove('topbtn_enabled');
            videoBtn.classList.add('topbtn_clicked');
        }

    }
    else if (currentPage === 'home.html') 
    {
        homeBtn.disabled = true;
        homeBtn.classList.remove('topbtn_enabled');
        homeBtn.classList.add('topbtn_disabled');
    }
    else if (currentPage === 'character.html') 
    {
        //characterBtn.disabled = true;
        characterBtn.classList.remove('topbtn_enabled');
        characterBtn.classList.add('topbtn_clicked');
    }
    else if (currentPage === 'video.html') 
    {
        //videoBtn.disabled = true;
        videoBtn.classList.remove('topbtn_enabled');
        videoBtn.classList.add('topbtn_clicked');
    }
    else if (currentPage === 'goods.html') 
    {
        goodsBtn.disabled = true;
        goodsBtn.classList.remove('topbtn_enabled');
        goodsBtn.classList.add('topbtn_disabled');
    }
    else if (currentPage === 'event_board.html')
    {
        eventBoardBtn.disabled = true;
        eventBoardBtn.classList.remove('topbtn_enabled');
        eventBoardBtn.classList.add('topbtn_disabled');
    }
    else if (currentPage === 'recruitment_calculator.html')
    {
        recruitmentCalculatorBtn.disabled = true;
        recruitmentCalculatorBtn.classList.remove('topbtn_enabled');
        recruitmentCalculatorBtn.classList.add('topbtn_disabled');
    }
}

function closeSelectList(){
    //selectListContainer 비활성화
    selectListContainer.innerHTML = '';
    selectListContainer.style.display = 'none';
}

function showSelectListContainer(btn) {
    const rect = btn.getBoundingClientRect();

     // 원하는 width 계산 (예: 버튼과 동일하게)
    const width = rect.width * 0.8;
    selectListContainer.style.width = width + 'px';

    // 버튼 중앙 좌표
    const btnCenter = rect.left + rect.width / 2;

    // selectListContainer의 left 좌표 = 버튼 중앙 - 컨테이너 절반
    const left = btnCenter - width / 2 - 5;

    // 버튼의 위치와 크기를 기준으로 select_list_container 스타일 지정
    selectListContainer.style.position = 'absolute';
    selectListContainer.style.left = left + 'px';
    selectListContainer.style.display = 'flex';
}

// 페이지 로드 시 버튼 상태 업데이트
document.addEventListener('DOMContentLoaded', ()=>{
    closeSelectList();
    UpdateBtnState();
});