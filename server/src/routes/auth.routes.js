const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// Маршруты для регистрации и авторизации пользователя

const router = new Router();

// Валидируем данные
const validate = [
  check('email', 'Uncorrect email').isEmail(),
  check(
    'password',
    'Password must be longer than 3 and shorter than 12'
  ).isLength({ min: 3, max: 12 }),
];

router.post('/registration', validate, async (req, res) => {
  try {
    // Получаем результат валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Uncorrect request', errors });
    }

    // Получим email и пароль из тела запроса
    const { email, password } = req.body;

    // Проверяем если есть такой пользователь в базе
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exist` });
    }

    // Создаём нового пользователя
    const hashPassword = await bcrypt.hash(password, 15);
    const user = new User({ email, password: hashPassword });
    await user.save();
    return res.json({ message: 'User was created' });
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
});

module.exports = router;
