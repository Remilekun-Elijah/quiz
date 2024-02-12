const { UserModel } = require("../models/user");
const emails = [
    "remilekunelijah97@gmail.com",
    "babsfadeyi@gmail.com",
    "giftshores@gmail.com",
  ],
  helper = require("./helper");
const passwords = ["09023007389"];
const names = ["Remilekun Elijah"];
emails.forEach((email, indx) => {
  UserModel.findOne({
    email,
  }).then((data) => {
    if (data) console.log(data.email, "already seeded!");
    else {
      const user = new UserModel();
      user.firstName = names[indx].split(" ")[0];
      user.lastName = names[indx].split(" ")[1];
      user.email = email;
      user.password = helper.hashPassword(passwords[indx]);
      user.role = "superadmin";

      user.save().then((doc, error) => {
        console.log(doc.email, "seeded successfully");
        if (error) console.error("ERROR", error);
      });
    }
  });
});
