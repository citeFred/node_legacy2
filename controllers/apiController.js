const contactModel = require('../models/contactModel')

// 데이터 조회 API Controller
const getContacts = (req, res) => {
    contactModel.getContacts((err, result) => {
        if (err) {
            console.error('데이터 조회 중 에러 발생', err);
            return res.status(500).send('내부 서버 오류')
        }
        res.json(result);
    })
}

// 데이터 삽입 API Controller
const addContact = (req, res) => {
    const contact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        memo: req.body.memo
    };
    contactModel.addContact(contact, (err, result) => {
        if (err) {
            console.error('데이터 삽입 중 에러 발생', err);
            return res.status(500).send('내부 서버 오류')
        }
        res.status(201).json({ message: '문의사항이 등록 되었습니다', id: result.id });
    })
}

// 데이터 수정 API Controller
const updateContact = (req, res) => {
    const id = req.params.id; // 오타수정
    console.log("Received contactId:", id); // 확인용 로그

    contactModel.updateContactStatus(id, (err, result) => {
        if (err) {
            console.error('데이터 수정 중 에러 발생', err);
            return res.status(500).send('내부 서버 오류')
        }
        res.status(200).json({ message: '문의사항이 업데이트 되었습니다' });
    })
}

// 데이터 삭제 API Controller
const deleteContact = (req, res) => {
    const id = req.params.id;  // 오타수정
    console.log("Received contactId:", id); // 확인용 로그

    contactModel.deleteContact(id, (err, result) => {
        if (err) {
            console.error('데이터 삭제 중 에러 발생', err);
            return res.status(500).send('내부 서버 오류')
        }
        res.status(200).json({ message: '문의사항이 삭제 되었습니다' });
    })
}

module.exports = {
    getContacts,
    addContact,
    deleteContact,
    updateContact,
}