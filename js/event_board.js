
function loadEvents() {
    fetch(`/event/eventList`

    )
        .then(res => res.json())
        .then(data => {
            // end_date 기준 내림차순(가장 늦은 날짜가 위로)
            data.sort((a, b) => new Date(b.end_date) - new Date(a.end_date));

            const eventContainer = document.getElementById('event_container');
            eventContainer.innerHTML = '';

            data.forEach(item => {
                const detailDiv = document.createElement('div');
                detailDiv.className = 'event_detail_container';

                const detailEventDiv = document.createElement('div');

                eventContainer.appendChild(detailDiv);
                detailDiv.appendChild(detailEventDiv);
                
                // 제목
                const title = document.createElement('h2');
                title.textContent = `제목: ${item.event_title}`;
                detailEventDiv.appendChild(title);

                // 날짜
                const date = document.createElement('p');
                const start_date = formatDateString(item.start_date,'16:00');
                const end_date = formatDateString(item.end_date,'03:59');
                date.textContent = `${start_date} ~ ${end_date}`;
                detailEventDiv.appendChild(date);

                

                // end_date와 현재 날짜/시각 비교
                const now = new Date();
                const endDate = new Date(end_date); // end_date에 03:59시 추가
                console.log(now, endDate);
                if (now > endDate) {
                    detailEventDiv.classList.add('event_end'); // 이벤트 종료 시 클래스 추가
                    // 종료됨 문구 추가
                    const endLabel = document.createElement('div');
                    endLabel.textContent = '종료됨';
                    endLabel.className = 'event_end_label';
                    detailDiv.prepend(endLabel); // div 맨 위에 추가
                }


                // 이미지 (클릭 시 notice_link로 이동)
                const img = document.createElement('img');
                img.className = 'event_image';
                img.src = item.img_link;
                img.alt = item.event_title;
                img.onclick = () => window.open(item.notice_link, '_blank');
                detailEventDiv.appendChild(img);

                
            });
        })
        .catch(() => {
            document.getElementById('event_container').textContent = '이벤트 정보를 불러올 수 없습니다.';
        });
}



function formatDateString(dateString,time) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} ${time}`;
}




document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
});