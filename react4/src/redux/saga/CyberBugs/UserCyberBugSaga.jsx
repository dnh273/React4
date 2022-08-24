import Axios from "axios";
import { stringify } from "rc-field-form/es/useWatch";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugService";
import { TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";
import { USER_SIGNIN_API } from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

// Quản lý các action saga
function* signinSaga(action) {
  // gọi API
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield cyberbugsService.signinCyberBugs(
      action.userLogin
    );

    // Lưu token vào localstorage khi thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    console.log("data", data);
  } catch (error) {
    console.log(error.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}
