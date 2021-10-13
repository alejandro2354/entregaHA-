
const {getUsers, updateUsers} = require('../controllers/users');
const {Router} = require('express');
const router = Router();


router.get('/', getUsers);

router.put('/:id', updateUsers)


module.exports = router;