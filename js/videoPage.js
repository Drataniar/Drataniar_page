
// 영상 목록 불러오기
function loadVideos(searchText = '', option = '') {
    let url = `/video`;
    if (searchText) {
        url += `/search`;
         // POST 요청으로 body에 검색 종류와 내용 전달 후 결과 받기
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, //요청 데이터가 JSON임을 명시
            body: JSON.stringify({ option, searchText }) //option과 searchText를 JSON 문자열로 변환해 body에 담음
        })
        .then(res => res.json())
        .then(data => showVideoList(data))
        .catch(err => {
            alert('영상 목록 불러오기 실패: ' + err);
        });
    }else {
        url += '/homeList';
        //GET 요청으로 전체 목록 받기
        fetch(url)
        .then(res => res.json())
        .then(data => showVideoList(data))
        .catch(err => {
            alert('영상 목록 불러오기 실패: ' + err);
        });
    }
    
}

function searchVideo() {
    const searchText = document.getElementById('search_text').value;
    const option = document.getElementById('searchOption').value;
    loadVideos(searchText, option);
}

function toggleSearchButton() {
    const searchText = document.getElementById('search_text').value.trim();
    document.getElementById('search_button').disabled = searchText === '';
}

function clearVideo() {
    document.getElementById('search_text').value = ''; // textarea 초기화
    toggleSearchButton(); // 버튼 상태도 갱신
    loadVideos(); // 전체 영상 목록 불러오기
}

function showVideoList(data){
    const videoList = document.getElementById('videoList');
            videoList.innerHTML = '';
            if (!data || data.length === 0) {
                // 데이터가 없을 때 메시지 출력
                const li = document.createElement('li');
                li.textContent = '검색된 영상이 없습니다!';
                videoList.appendChild(li);
                return;
            }
            data = data.sort((a, b) => {
            return new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime();
            });
            data.forEach(item => {
                const upload_date = new Date(item.upload_date);
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${item.name}</strong> | 
                    스테이지 : <strong>${item.stage_ID}</strong> |
                    이벤트 이름 : <strong>${item.event_name}</strong> |
                    업로드 날짜 : ${upload_date.getFullYear()}-${upload_date.getMonth()+1}-${upload_date.getDate()}<br> 
                    <img src="https://img.youtube.com/vi/${item.link_ID}/0.jpg" 
                    alt="${item.name}" width="120" style="cursor:pointer;" onclick="window.open('${item.video_url}', '_blank')"> 
                `;
                videoList.appendChild(li);
            });
}

// 페이지 로드 시 영상 보여주기, 버턴 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 현재 페이지 URL에서 쿼리스트링 가져오기
    const urlParams = new URLSearchParams(window.location.search);

    // stageID 값 꺼내기
    let stageID = urlParams.get("stageID");
    console.log(stageID);
    if (stageID) {
        // 주소창에서 쿼리스트링 제거
        window.history.replaceState({}, document.title, "video.html");
        const id = stageID;
        stageID = ''; // 한번만 실행되도록 초기화
        loadVideos(id, 'stage');
    }
    else{
        loadVideos();
    }
    
    toggleSearchButton();
});