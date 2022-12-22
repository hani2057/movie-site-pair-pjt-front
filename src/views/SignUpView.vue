<template>
  <div class="component-wrapper">
    <div class="signup-page d-flex justify-content-center align-items-center">
      <div class="signup-wrapper d-flex flex-column align-items-center">
        <h1 class="pb-4">T i C i</h1>
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
            minlength="6"
            required
            v-model="password1"
          />
          <input
            type="password"
            id="signup-password2"
            class="signup__input"
            placeholder="PASSWORD CONFIRMATION"
            minlength="6"
            required
            v-model="password2"
          />
          <input
            type="text"
            id="signup-nickname"
            class="signup__input"
            placeholder="NICK NAME"
            required
            v-model="nickname"
          />
          <input
            type="number"
            id="signup-age"
            class="signup__input"
            placeholder="AGE"
            max="120"
            min="1"
            required
            v-model="age"
          />
          <fieldset class="pt-2 pb-4 genre-choise">
            <legend>선호하는 영화 장르를 최대 2개까지 선택해주세요:</legend>

            <input
              type="checkbox"
              name="genre"
              value="28"
              id="genre-pick-action"
              @click="getGenrePicked"
            />
            <label for="genre-pick-action">액션</label>
            <input
              type="checkbox"
              name="genre"
              value="10749"
              id="genre-pick-romance"
              @click="getGenrePicked"
            />
            <label for="genre-pick-romance">로맨스</label>
            <input
              type="checkbox"
              name="genre"
              value="53"
              id="genre-pick-thriller"
              @click="getGenrePicked"
            />
            <label for="genre-pick-thriller">스릴러</label>
            <input
              type="checkbox"
              name="genre"
              value="35"
              id="genre-pick-comedy"
              @click="getGenrePicked"
            />
            <label for="genre-pick-comedy">코미디</label>
            <input
              type="checkbox"
              name="genre"
              value="14"
              id="genre-pick-fantasy"
              @click="getGenrePicked"
            />
            <label for="genre-pick-fantasy">판타지</label>
            <input
              type="checkbox"
              name="genre"
              value="16"
              id="genre-pick-animation"
              @click="getGenrePicked"
            />
            <label for="genre-pick-animation">애니메이션</label>
          </fieldset>
          <b-button type="submit" id="signup-btn" variant="light" class="mt-3">
            SIGN UP
          </b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { localApi } from "@/api/requests.js";

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
    // signUp() {
    //   this.getGenrePicked();

    //   const username = this.username;
    //   const password1 = this.password1;
    //   const password2 = this.password2;
    //   const nickname = this.nickname;
    //   const age = this.age;
    //   const genre_pick = this.genre_pick;
    //   let genre_pick_1;
    //   let genre_pick_2;

    //   if (genre_pick.length === 0) {
    //     genre_pick_1 = null;
    //     genre_pick_2 = null;
    //   } else if (genre_pick.length === 1) {
    //     genre_pick_1 = genre_pick[0].value;
    //     genre_pick_2 = null;
    //   } else if (genre_pick.length === 2) {
    //     genre_pick_1 = genre_pick[0].value;
    //     genre_pick_2 = genre_pick[1].value;
    //   }

    //   const payload = {
    //     username,
    //     password1,
    //     password2,
    //     nickname,
    //     age,
    //     genre_pick_1,
    //     genre_pick_2,
    //   };
    //   this.$store.dispatch("signUp", payload);
    // },
    async signUp() {
      this.getGenrePicked();

      const username = this.username;
      const password1 = this.password1;
      const password2 = this.password2;
      const nickname = this.nickname;
      const age = this.age;
      const genre_pick = this.genre_pick;
      let genre_pick_1;
      let genre_pick_2;

      if (genre_pick.length === 0) {
        genre_pick_1 = null;
        genre_pick_2 = null;
      } else if (genre_pick.length === 1) {
        genre_pick_1 = genre_pick[0].value;
        genre_pick_2 = null;
      } else if (genre_pick.length === 2) {
        genre_pick_1 = genre_pick[0].value;
        genre_pick_2 = genre_pick[1].value;
      }

      const payload = {
        username,
        password1,
        password2,
        nickname,
        age,
        genre_pick_1,
        genre_pick_2,
      };
      const { data } = await localApi.signup(payload);
      console.log(data);
    },

    getGenrePicked(e) {
      const genres = document.getElementsByName("genre");
      const genre_picked = [...genres].filter((genre) => genre.checked);
      this.genre_pick = genre_picked;

      if (this.genre_pick.length > 2) {
        alert("2개까지만 선택 가능합니다");
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
.signup__input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  border: none;
}
.signup__input:focus {
  outline: none;
}
/* IE10 이상에서 input box에 추가된 지우기 버튼 제거 */
.singup__input::-ms-clear {
  display: none;
}
/* input type nubmer에서 화살표 제거 */
.signup__input[type="number"]::-webkit-inner-spin-button,
.signup__input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.signup__input[type="number"] {
  -moz-appearance: textfield;
}
/* IE에서 비밀번호 보이기/숨기기 눈 없애기 */
.signup__input[type="password"]::-ms-reveal {
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
.genre-choise legend {
  font-weight: 400;
}
.genre-choise input {
  margin-right: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
}
.genre-choise label {
  margin-right: 10px;
  font-weight: 300;
  cursor: pointer;
}
</style>
