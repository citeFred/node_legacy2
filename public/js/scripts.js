$(document).ready(function() {
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function() {
        // Add hash (#) to URL when done scrolling (default click behavior)
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
});
  
async function createContact() {
  // 각 입력 필드에서 값을 가져옵니다.
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const memo = document.getElementById('comments').value;

  // JSON 객체 생성
  const data = {
      name: name,
      email: email,
      phone: phone,
      memo: memo
  };

  try {
      const response = await fetch(`/api/contact`, {
          method: 'POST', // HTTP 메서드
          headers: {
              'Content-Type': 'application/json' // 데이터 형식 지정 (필요한 경우)
          },
          body: JSON.stringify(data) // JSON 형식변환하여 바디 Payload에 담기
      });

      if (!response.ok) {
          throw new Error('문의 작성 오류'); // throw를 통해 catch절로 오류 객체 전달
      }
      const result = await response.json();
      console.log(result)
      alert('문의사항이 작성되었습니다.');
      location.reload(); // 페이지 새로고침 또는 다른 업데이트 방식 선택
  } catch (error) {
      console.error('문의작성 오류:', error); // 오류 처리
  }
}



async function updateContact(contactId) {
  try {
      const response = await fetch(`/api/contactUpdate/${contactId}`, {
          method: 'PUT', // HTTP 메서드
          headers: {
              'Content-Type': 'application/json' // 데이터 형식 지정 (필요한 경우)
          }
          // PUT 요청의 경우 body가 필요할 수 있음
      });

      if (!response.ok) {
          throw new Error('업데이트 오류'); // throw를 통해 catch절로 오류 객체 전달
      }
      alert('문의사항이 업데이트되었습니다.');
      location.reload(); // 페이지 새로고침 또는 다른 업데이트 방식 선택
  } catch (error) {
      console.error('업데이트 오류:', error); // 오류 처리
  }
}


function deleteContact(contactId) {
  // AJAX를 사용하여 DELETE 요청 보내기
  $.ajax({
      url: `/api/contactDelete/${contactId}`,
      type: 'DELETE',
      success: function(response) {
          // 삭제 성공 시의 처리
          alert('문의사항이 삭제되었습니다.');
          location.reload(); // 페이지 새로고침 또는 다른 삭제 방식 선택
      },
      error: function(error) {
          // 오류 처리
          console.error('삭제 오류:', error);
      }
  });
}