    
function makeRolesButton() {
    fetch(`/character/rolesBtn`)
        .then(res => res.json())
        .then(roles => {
            // sequence 기준 오름차순 정렬
            roles = roles.sort((a, b) => a.sequence - b.sequence);

            const role_big_div = document.getElementById('role_big_div');
            role_big_div.innerHTML = ''; // 기존 내용 초기화

            const clearButton = document.createElement('button');
            clearButton.className = 'btn';
            clearButton.id = 'clear_button';
            clearButton.textContent = '초기화';
            clearButton.onclick = clearPicture;
            role_big_div.appendChild(clearButton);

            roles.forEach(item => {
                const roleDiv = document.createElement('div');
                roleDiv.className = 'role_container';
                roleDiv.onclick = function() {
                     // 이미 button_clicked가 있으면 등급 버튼 영역만 초기화하고 함수 실행 안 함
                    if (this.classList.contains('button_clicked')) {
                        const rarityDiv = document.getElementById('rarityBtnList');
                        if (rarityDiv) rarityDiv.innerHTML = '';
                        this.classList.remove('button_clicked');
                    }
                    else{
                        makeRarityButton(item.role_name);
                        buttonClicked('role_container', this);
                    }
                    
                };

                
                // 역할 이름
                const name = document.createElement('span');
                name.textContent = item.role_name;
                roleDiv.appendChild(name);

                // 역할 이미지
                const img = document.createElement('img');
                img.src = item.role_img;
                img.alt = item.role_name;
                img.style.maxWidth = '80px';
                img.style.marginTop = '8px';
                roleDiv.appendChild(img);

                role_big_div.appendChild(roleDiv);
            });

        })
        .catch(err => {
            alert('역할 목록 불러오기 실패: ' + err);
        });
}

function makeRarityButton(role_name) {
    fetch(`/character/roleRarity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role_name: role_name })
    })
    .then(res => res.json())
    .then(data => {

        // 기존 rarity 버튼 영역 초기화 또는 생성
        let rarityDiv = document.getElementById('rarityBtnList');
        rarityDiv.innerHTML = '';

        // star 값 기준 내림차순 정렬
        data = data.sort((a, b) => b.star - a.star);

        // star 값 개수만큼 버튼 생성
        data.forEach(star => {
            const div = document.createElement('div');
            div.className = 'rarity_btn_container';
            div.id = `rarity_${star.star}`;
            rarityDiv.appendChild(div);
            const btn = document.createElement('button');
            btn.textContent = `${star.star}성`;
            btn.className = 'rarity_btn';
            btn.onclick = function() {

                const oldContainer = document.getElementById(`character_btn_container_${star.star}`);
                if (oldContainer) {
                    oldContainer.remove(); // 기존 컨테이너 제거
                }
                if (this.classList.contains('button_clicked')) {
                    this.classList.remove('button_clicked');
                }
                    else{
                        buttonClicked('rarity_btn', this);
                        makeCharacterButton(role_name, star.star);
                    }

                
            };
            div.appendChild(btn);
        });
    })
    .catch(() => {
        alert('등급 목록을 불러올 수 없습니다.');
    });
}

function makeCharacterButton(role_name, star) {


    fetch(`/character/btnList`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role_name: role_name, star: star })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const listDiv = document.getElementById(`rarity_${star}`);

            const characterBtncontainer = document.createElement('div');
            characterBtncontainer.className = 'character_btn_container';
            characterBtncontainer.id = `character_btn_container_${star}`;
            listDiv.appendChild(characterBtncontainer);
            characterBtncontainer.innerHTML = ''; // 기존 내용 초기화

            data.forEach(item => {
                const characterDiv = document.createElement('div');
                characterDiv.dataset.id = item.id; // 캐릭터 ID 저장
                characterDiv.className = 'character_name_btn'; // 필요시 스타일링
                characterDiv.innerHTML = `
                    <span>${item.name}</span>
                    <img src="${item.avatar}" alt="${item.name}" style="max-width: 50px;">
                `;
                characterDiv.onclick = function() {
                    // 모든 버튼 활성화
                    document.querySelectorAll('.character_name_btn').forEach(b => b.disabled = false);
                    // 현재 버튼만 비활성화
                    this.disabled = true;
                    // 클릭 시 이미지 로드 함수 호출
                    console.log(item.id);
                    loadCharacterImage(item.id);
                };
                characterBtncontainer.appendChild(characterDiv);
            });
        })
        .catch(err => {
            document.getElementById('characterBtnList').textContent = '캐릭터 목록을 불러올 수 없습니다.';
        });
}

function loadCharacterImage(id) {
    //console.log(id);
    fetch(`/character/picture`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, //요청 데이터가 JSON임을 명시
           body: JSON.stringify({ id: id }) //id를 JSON 형태로 전송  
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const imgDiv = document.getElementById('characterImg');
            imgDiv.innerHTML = '';
            if (data && data.picture) {
                const img = document.createElement('img');
                img.src = data.picture; 
                img.alt = data.name;
                img.className = 'character_image';
                imgDiv.appendChild(img);
            } else {
                imgDiv.textContent = '이미지를 찾을 수 없습니다.';
            }
        })
        .catch(() => {
            document.getElementById('characterImg').textContent = '이미지 불러오기 실패';
        });
}

function clearPicture() {
    // 등급 버튼 영역 비우기
    const rarityDiv = document.getElementById('rarityBtnList');
    if (rarityDiv) rarityDiv.innerHTML = '';

    document.querySelectorAll('.role_container').forEach(btn => {
        btn.classList.remove('button_clicked');
    });

    // 이미지 영역 비우기
    document.getElementById('characterImg').innerHTML = '';
    document.querySelectorAll('.character_name_btn').forEach(b => b.disabled = false);
}

function buttonClicked(btnClass, div) {

    // 모든 해당 클래스의 버튼에서 button_clicked 클래스 제거
    document.querySelectorAll('.' + btnClass).forEach(btn => {
        btn.classList.remove('button_clicked');
    });

    div.classList.add('button_clicked'); // 클릭된 버튼에 클래스 추가

}

document.addEventListener('DOMContentLoaded', ()=>{
    makeRolesButton();
});