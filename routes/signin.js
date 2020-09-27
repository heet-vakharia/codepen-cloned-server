const signin = async (req, res, User, bcrypt) => {
  const { userid, password } = req.body;
  if (userid && password) {
    User.findOne({ userid }, (err, user) => {
      if (err || !user) {
        res.status(404).status({ err: "USER NOT Found" });
      } else {
        const pass = user.password;
        bcrypt.compare(password, pass, (err, resp) => {
          if (resp) {
            res.status(302).json(user);
          } else {
            res.status(404).json({ err: "Invalid Password" });
          }
        });
      }
    });
  }
};
export default signin;
