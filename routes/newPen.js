const newPen = async (req, res, User) => {
  const { name, id } = req.body;
  const pen = {
    name,
    code: {
      html: "",
      css: "",
      js: "",
    },
  };
  if (!name) {
    res.json("PLz Pen Name");
  } else {
    User.findByIdAndUpdate(
      id,
      { $push: { pens: pen } },
      { new: true },
      (err, user) => {
        if (!user || err) {
          return res.status(400).json({ message: "Something Went Wrong" });
        } else {
          return res.json(user);
        }
      }
    );
  }
};

export default newPen;
