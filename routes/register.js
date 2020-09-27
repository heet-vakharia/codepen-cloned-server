const register = async (req, res, User, bcrypt) => {
  const { userid, password } = req.body;

  if (userid && password) {
    var encryptedPassword = bcrypt.hashSync(password, 8);
    User.create(
      {
        userid: userid,
        password: encryptedPassword,
        pens: [],
      },
      (err, user) => {
        res.json({ err, user });
        //   if (err) {
        //     res.status(405).status(err);
        //   } else {
        //     res.status(201).json(user);
        //   }
      }
    );
  } else {
    res.status(400).json({ msg: "Plz provide all information" });
  }
};
export default register;
