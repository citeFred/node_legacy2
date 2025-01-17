$(document).ready(function() {
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function() {
        window.location.hash = hash;
      });
    } // End if
  });

  $(window).scroll(function() {
    $(".slideanim").each(function() {
      var pos = $(this).offset().top;
      var winTop = $(window).scrollTop();
      if (pos < winTop + 600) {
        $(this).addClass("slide");
      }
    });
  });

  // 모달 열기 버튼을 클릭할 때 loadContactList 함수 호출
  const modalOpenButton = document.querySelector('[data-target="#myModal"]');
  if (modalOpenButton) {
    modalOpenButton.addEventListener('click', loadContactList);
  } else {
    console.error('모달 열기 버튼을 찾을 수 없습니다.');
  }
});
  
// Create Fetch
async function createContact() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const memo = document.getElementById('comments').value;

  const data = {
      name: name,
      email: email,
      phone: phone,
      memo: memo
  };

  try {
      const response = await fetch(`/api/contact`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error('문의 작성 오류');
      }
      const result = await response.json();
      console.log(result);
      alert('문의사항이 작성되었습니다.');
      loadContactList(); // 목록을 동적으로 새로 가져옴 (모달 유지)
  } catch (error) {
      console.error('문의작성 오류:', error);
  }
}

// Update Fetch
async function updateContact(id) {
  console.log("Updating contact with ID:", id);
  try {
      const response = await fetch(`/api/contact/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          }
          // PUT 요청의 경우 body가 필요할 수 있음
      });

      if (!response.ok) {
          throw new Error('업데이트 오류');
      }
      alert('문의사항이 업데이트되었습니다.');
      loadContactList(); // 목록을 동적으로 새로 가져옴 (모달 유지하고 동적으로 데이터 가져오는 경우)
      location.reload(); // 페이지 새로고침 해야하는 경우 (/contactList 처럼 페이지 새로고침이 필요한 경우)
  } catch (error) {
      console.error('업데이트 오류:', error);
  }
}

// Delete Fetch
async function deleteContact(id) {
  console.log("Deleting contact with ID:", id);
  try {
      const response = await fetch(`/api/contact/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error('삭제 오류');
      }
      alert('문의사항이 삭제되었습니다.');
      loadContactList(); // 목록을 동적으로 새로 가져옴 (모달 유지하고 동적으로 데이터 가져오는 경우)
      location.reload(); // 페이지 새로고침 해야하는 경우 (/contactList 처럼 페이지 새로고침이 필요한 경우)
  } catch (error) {
      console.error('삭제 오류:', error);
  }
}

// Get Fetch (데이터만 가져오는 API를 사용하는 경우)
async function loadContactList() {
  try {
      const response = await fetch('/api/contact'); // API 호출
      if (!response.ok) {
          throw new Error('네트워크 오류 발생');
      }
      const data = await response.json(); // JSON으로 변환

      // 테이블 생성
      let tableHtml = `
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Contact Lists</h4>
                </div>
                <div class="modal-body">
                  <table border="1">
                      <tr>
                          <th>name</th>
                          <th>phone</th>
                          <th>email</th>
                          <th>content</th> 
                          <th>status</th> 
                          <th>DONE</th>
                          <th>DELETE</th> 
                      </tr>`;
      
      data.forEach(item => {
          tableHtml += `
                      <tr>
                          <td>${item.name}</td>
                          <td>${item.phone}</td>
                          <td>${item.email}</td>
                          <td>${item.memo}</td>
                          <td>${item.status}</td>
                          <td>
                              <button type="button" onclick="updateContact(${item.id})">UPDATE</button>
                          </td>
                          <td>
                              <button type="button" onclick="deleteContact(${item.id})">DELETE</button>
                          </td>
                      </tr>`;
      });

      tableHtml += `</table>
                        </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>`;
      document.querySelector('#myModal').innerHTML = tableHtml; // 모달에 테이블 추가
  } catch (error) {
      console.error('Error:', error);
  }
}
