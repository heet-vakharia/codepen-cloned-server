const allPens = async (req, res, User) => {
  const { id } = req.query;
  await User.findOne({ _id: id }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ err: "Not Found" });
    } else {
      res.status(200).json({ pens: user.pens });
    }
  });
};
export default allPens;
