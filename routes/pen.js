const pen = async (req, res, User) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ err: "PLz give pen ID" });
  } else {
    await User.findOne({ "pens._id": id }, { "pens.$": 1 }, (err, pen) => {
      if (err || !pen) {
        return res.status(400).json({ err: "Pen Not Found" });
      } else {
        return res.json(pen);
      }
    });
  }
};

export default pen;
