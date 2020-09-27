const updatePen = async (req, res, User) => {
  const { name, id, code } = req.body;
  if (!name) {
    return res.status(400).json({ err: "Plz Fill all Details" });
  } else {
    await User.findOneAndUpdate(
      { "pens.name": name, _id: id },
      { $set: { "pens.$.code": code } },
      { new: true },
      (err, pen) => {
        if (err || !pen) {
          return res.status(404).json({ err: "Pen Not Found" });
        } else {
          return res.json({ pen });
        }
      }
    );
  }
};
export default updatePen;
