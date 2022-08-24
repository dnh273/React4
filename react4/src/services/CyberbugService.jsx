const { default: Axios } = require("axios");
const { DOMAIN_CYBERBUGS } = require("../util/constants/settingSystem");

export const cyberbugsService = {
  signinCyberBugs: (userLogin) => {
    return Axios({
      url: `${DOMAIN_CYBERBUGS}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  },
};
