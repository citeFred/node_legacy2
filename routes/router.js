const express = require('express')
const router = express.Router();
const viewController = require('../controllers/viewController')
const apiController = require('../controllers/apiController')

/* route to view controllers*/
// 메인 뷰페이지 반환
router.get('/', viewController.getIndexViewPage);

// 뷰페이지+데이터 반환(ModelAndView) (데이터+뷰페이지 렌더링까지 필요한 경우)
router.get('/contactList', viewController.getContactListViewPageWithData);



/* route to api controllers */
// 문의사항 목록 조회(데이터만 필요한 경우)
router.get('/api/contact/', apiController.getContacts)

// 문의사항 데이터 삽입
router.post('/api/contact/', apiController.addContact)

// 문의사항 데이터 업데이트
router.put('/api/contact/:id', apiController.updateContact)

// 문의사항 데이터 삭제
router.delete('/api/contact/:id', apiController.deleteContact)

module.exports = router;