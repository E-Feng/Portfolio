const message = require('../models/message');

// @desc Add message
// @route POST /contactForm/
// access Public
exports.addMessage = async (req, res) => {
  try {
    if (req.body.name && req.body.email && req.body.content) {
      const Message = await message.create(req.body);

      return res.status(201).json({
        success: true,
        data: Message
      });
    } else {
      return res.status(500).json({
        success: false
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
};
