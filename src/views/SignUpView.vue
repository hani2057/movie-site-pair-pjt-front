<template>
  <div class="component-wrapper">
    <div class="signup-page d-flex justify-content-center align-items-center">
      <div class="signup-wrapper d-flex flex-column align-items-center">
        <h1 class="pb-4">TiCi</h1>
        <form
          @submit.prevent="signUp"
          id="signup-form"
          class="d-flex flex-column"
        >
          <input
            type="text"
            id="signup-username"
            class="signup__input"
            placeholder="ID"
            required
            v-model="username"
          />
          <input
            type="password"
            id="signup-password1"
            class="signup__input"
            placeholder="PASSWORD"
            required
            v-model="password1"
          />
          <input
            type="password"
            id="signup-password2"
            class="signup__input"
            placeholder="PASSWORD CONFIRMATION"
            required
            v-model="password2"
          />
          <input
            type="nickname"
            id="signup-nickname"
            class="signup__input"
            placeholder="NICK NAME"
            required
            v-model="nickname"
          />
          <input
            type="age"
            id="signup-age"
            class="signup__input"
            placeholder="AGE"
            required
            v-model="age"
          />
          <fieldset>
            <legend>선호하는 영화 장르를 선택해주세요:</legend>

            <input
              type="checkbox"
              name="genre"
              value="28"
              @click="getGenrePicked"
            />액션
            <input
              type="checkbox"
              name="genre"
              value="10749"
              @click="getGenrePicked"
            />로맨스
            <input
              type="checkbox"
              name="genre"
              value="53"
              @click="getGenrePicked"
            />스릴러
            <input
              type="checkbox"
              name="genre"
              value="35"
              @click="getGenrePicked"
            />코미디
            <input
              type="checkbox"
              name="genre"
              value="14"
              @click="getGenrePicked"
            />판타지
            <input
              type="checkbox"
              name="genre"
              value="16"
              @click="getGenrePicked"
            />애니메이션
          </fieldset>
          <b-button type="submit" id="signup-btn" variant="light">
            SIGN UP
          </b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpView",

  data() {
    return {
      username: null,
      password1: null,
      password2: null,
      nickname: null,
      age: null,
      genre_pick: null,
    };
  },
  methods: {
    signUp() {
      this.getGenrePicked();

      const username = this.username;
      const password1 = this.password1;
      const password2 = this.password2;
      const nickname = this.nickname;
      const age = this.age;
      const genre_pick = this.genre_pick;

      const payload = {
        username,
        password1,
        password2,
        nickname,
        age,
        genre_pick,
      };
      this.$store.dispatch("signUp", payload);
    },

    getGenrePicked(e) {
      const genres = document.getElementsByName("genre");
      const genre_picked = [...genres].filter((genre) => genre.checked);
      this.genre_pick = genre_picked;

      if (this.genre_pick.length > 3) {
        alert("3개까지만 선택 가능합니다");
        this.genre_pick.pop();
        e.target.checked = false;
      }
    },
  },
};
</script>

<style>
/* input style 초기화 */
/* input 기본 스타일 초기화 */
.signup__input,
.login__input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  border: none;
}
.signup__input:focus,
.login__input:focus {
  outline: none;
}
/* IE10 이상에서 input box에 추가된 지우기 버튼 제거 */
.singup__input::-ms-clear,
.login__input::-ms-clear {
  display: none;
}
/* input type nubmer에서 화살표 제거 */
.signup__input[type="number"]::-webkit-inner-spin-button,
.signup__input[type="number"]::-webkit-outer-spin-button,
.login__input[type="number"]::-webkit-inner-spin-button,
.login__input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.signup__input[type="number"],
.login__input[type="number"] {
  -moz-appearance: textfield;
}
/* IE에서 비밀번호 보이기/숨기기 눈 없애기 */
.signup__input[type="password"]::-ms-reveal,
.login__input[type="password"]::-ms-clear {
  display: none;
}
/* Select box 스타일 초기화 */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
/* IE 에서 Select box 화살표 제거 */
select::-ms-expand {
  display: none;
}

/* CSS 적용 */
.signup-page {
  width: 100%;
  height: calc(100vh - 50px);
}
.signup-wrapper {
  width: 30%;
  min-width: 550px;
}
#signup-form {
  width: 100%;
  padding-bottom: 50px;
  /* min-width: 550px; */
}
.signup__input {
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.3); */
  padding: 10px 20px;
  margin-bottom: 13px;
  color: var(--main-text-color);
  font-size: 1.2rem;
}
.signup__input:focus::placeholder {
  color: var(--main-text-color);
}
.signup__input:focus {
  animation-name: border-focus;
  animation-duration: 450ms;
  animation-fill-mode: forwards;
}
@keyframes border-focus {
  from {
    box-shadow: none;
  }
  to {
    box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.3);
  }
}
</style>
