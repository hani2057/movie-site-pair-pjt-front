<template>
  <div>
    <div class="modal-wrapper">
      <div class="modal-overlay" @click="closeModal"></div>
      <div
        class="modal-card"
        :style="{
          backgroundImage: `${this.bgImgLinearGradient}, url(${baseUrlTMDBImg}${singleMovieData?.backdrop_path})`,
        }"
      >
        <div class="modal-card-wrapper d-flex">
          <div class="modal-card__info d-flex flex-column">
            <div class="modal-card__info-first d-flex">
              <span v-if="singleMovieData.adult">Adult</span>
              <img
                class="modal__poster-img me-3"
                :src="`${baseUrlTMDBImg}${singleMovieData?.poster_path}`"
                alt="modal__poster-img"
              />
              <div class="flex-fill">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex flex-column align-items-between">
                    <h4 class="modal__movieTitle py-3">
                      {{ singleMovieData.title }}
                    </h4>
                    <div
                      class="d-flex justify-content-between align-items-between"
                    >
                      <div>
                        <div>
                          <i class="fa-solid fa-star me-1"></i>
                          <span>{{ singleMovieData.vote_average }}</span> <br />
                        </div>
                        <div>
                          <span v-if="singleMovieData.release_date">
                            {{ singleMovieData.release_date }} 개봉
                          </span>
                          <p v-if="!singleMovieData.release_date">
                            개봉일 정보가 없습니다.
                          </p>
                        </div>
                        <div>
                          <span
                            v-for="genre in singleMovieDataGenres"
                            :key="genre"
                            class="badge text-bg-light me-2"
                          >
                            {{ genre }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="my-3">
                      <b-button
                        v-b-modal.my-list-modal
                        variant="outline-secondary"
                        class="putMovieToListBtn"
                        @click="loadUserMyLists"
                      >
                        이 영화를 내 리스트에 추가
                      </b-button>
                      <b-modal id="my-list-modal" title="My Lists">
                        <template #modal-header="{ close }">
                          <h5 class="my-list-modal__title">My Lists</h5>
                          <b-button
                            size="sm"
                            variant="outline-dark"
                            @click="close()"
                          >
                            X
                          </b-button>
                        </template>
                        <template #default="{}">
                          <p class="my-list-modal__content">
                            이 영화를 추가할 리스트를 선택해주세요.
                          </p>
                          <div class="d-flex flex-column align-items-center">
                            <div
                              v-for="list in singleUserMyLists"
                              :key="`${list.id}-${list.title}`"
                            >
                              <button
                                class="my-list-modal__list-btn custom-btn"
                                @focus="setChosenList"
                              >
                                <span>{{ list.title }}</span>
                              </button>
                              <!-- <i
                                class="fa-solid fa-trash-can my-list-modal__list-delete-btn"
                                @click="deleteMyList"
                              ></i> -->
                              <!-- <i class="fa-regular fa-trash-can"></i> -->
                            </div>
                            <!-- <button class="my-list-modal__list-btn custom-btn">
                              <span>test</span>
                            </button> -->

                            <form @submit.prevent="makeNewMyList">
                              <input
                                type="text"
                                class="my-list-modal__new-list-btn"
                                placeholder="Make New My List"
                                @focus="changePlaceholder"
                                @blur="resetPlaceholder"
                                v-model.trim="newMyListTitle"
                              />
                              <!-- <button
                                class="my-list-modal__list-btn my-list-modal__new-list-btn"
                              >
                                Make New My List
                              </button> -->
                            </form>
                          </div>
                        </template>
                        <template #modal-footer>
                          <!-- <div class="my-list-modal__footer">
                            <p class="my-list-modal__footer-p">
                              My List 수정 및 삭제는 마이페이지에서 가능합니다:)
                            </p>
                          </div> -->
                          <b-button
                            variant="secondary"
                            @click="addSingleMovieToList"
                          >
                            추가하기
                          </b-button>
                        </template>
                      </b-modal>
                    </div>
                  </div>
                  <button
                    class="btn btn-outline-light trailerBtn"
                    @click="showTrailer"
                  >
                    예고편보기
                  </button>
                </div>
              </div>
            </div>
            <div class="modal-card__info-overview">
              <p>{{ singleMovieData.overview }}</p>
              <p v-if="!singleMovieData.overview">
                이 영화는 상세정보를 제공하지 않습니다.
              </p>
            </div>
            <div class="modal-card__info-review-post">
              <span>리뷰 작성</span>
              <form
                @submit.prevent="postReview"
                class="modal-card__info-review-form d-flex"
              >
                <input
                  type="text"
                  class="modal-card__info-review-content"
                  v-model="reviewContent"
                />
                <star-rating
                  v-model="reviewScore"
                  @rating-selected="setReviewScore"
                  :increment="0.5"
                  :max-rating="5"
                  inactive-color="#b3b3b3"
                  active-color="#fceb26"
                  :star-size="20"
                  :show-rating="false"
                ></star-rating>
                <button type="submit" class="badge text-bg-light me-2">
                  등록
                </button>
              </form>
            </div>
            <div class="modal-card__info-reviews">
              <div v-for="review in singleMovieReviews" :key="review.id">
                <span>
                  <i class="fa-solid fa-star me-1"></i>{{ review?.score }} |
                </span>
                <span> {{ review?.content }}</span>
              </div>
            </div>
          </div>
          <div class="modal-card__space" v-show="trailerExists">
            <iframe
              id="singleMovieTrailer"
              width="100%"
              height="350vh"
              frameborder="0"
              class="modal-card__space-trailer"
            ></iframe>
            <p v-if="!trailerExists">재생할 예고편이 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";
// https://github.com/craigh411/vue-star-rating

export default {
  name: "MovieModal",
  data() {
    return {
      bgImgLinearGradient:
        "linear-gradient(to right, rgba(0, 0, 0, 1), 72%, rgba(0, 0, 0, 0))",
      trailerExists: false,
      youtubeId: "",
      iframeSrc: `https://www.youtube.com/embed/${this.youtubeId}?autoplay=1`,
      reviews: [],
      reviewContent: null,
      reviewScore: null,
      chosenList: null,
      newMyListTitle: null,
    };
  },
  computed: {
    singleMovieData() {
      return this.$store.state.singleMovieData;
    },
    singleMovieDataGenres() {
      return this.$store.getters.singleMovieDataGenres;
    },
    baseUrlTMDBImg() {
      return this.$store.state.baseUrlTMDBImg;
    },
    reviewUrlForGetPost() {
      return `${this.$store.state.baseUrlLocalServer}/movies/detail/${this.singleMovieData.id}/comment/`;
    },
    // reviewUrlForUpdateDelete: `${this.$store.state.baseUrlLocalServer}/movies/detail/${this.singleMovieData.id}/comment/`
    singleMovieReviews() {
      return this.$store.state.singleMovieReviews;
    },
    singleUserMyLists() {
      return this.$store.state.singleUserMyLists;
    },
  },
  watch: {
    singleMovieData() {},
    singleMovieReviews() {},
    singleUserMyLists() {},
  },
  methods: {
    closeModal() {
      this.trailerExists = false;
      this.$store.commit("CHANGE_MODAL_OPEN_STATE");
      this.$store.commit("DELETE_SINGLE_MOVIE_REVIEWS");
    },
    showTrailer() {
      console.log(this.singleMovieData);
      axios({
        method: "get",
        url: `${this.$store.state.baseUrlTMDB}/movie/${
          this.singleMovieData.id || this.singleMovieData.movie_id
        }/videos`,
        params: this.$store.state.paramsTMDBVideo,
      })
        .then((res) => {
          if (res.data.results) {
            this.trailerExists = true;
            this.youtubeId = res.data.results[0]?.key;

            const singleMovieTrailer =
              document.getElementById("singleMovieTrailer");
            console.log(singleMovieTrailer);
            // const iframeHeight =
            //   singleMovieTrailer.contentWindow.document.body.scrollHeight;

            // singleMovieTrailer.height = iframeHeight;
            singleMovieTrailer.setAttribute(
              "src",
              `https://www.youtube.com/embed/${this.youtubeId}?autoplay=1`
            );
          }
        })
        .catch((err) => console.error(err));
    },
    getMovieReviews() {
      console.log(this.singleMovieData);
      const movieId = this.singleMovieData.id || this.singleMovieData.movie_id;
      this.$store.dispatch("getSingleMovieReviews", movieId);
    },
    setReviewScore(rating) {
      this.reviewScore = rating;
    },
    postReview() {
      const content = this.reviewContent;
      const score = this.reviewScore;
      const movieId = this.singleMovieData.id;
      const payload = { content, score, movieId };

      this.$store.dispatch("postSingleMovieReview", payload);

      this.reviewContent = null;
      this.reviewScore = 0;
    },
    loadUserMyLists() {
      if (!this.$store.state.isLoggedIn) {
        alert("로그인이 필요한 서비스입니다.");
      } else {
        this.$store.dispatch("getSingleUserMyLists");
        this.singleUserMyLists = this.$store.state.singleUserMyLists;
      }
    },
    changePlaceholder(e) {
      e.target.placeholder = "생성할 My List의 제목을 입력하고 엔터!";
    },
    resetPlaceholder(e) {
      e.target.placeholder = "Make New My List";
    },
    makeNewMyList(e) {
      this.$store.dispatch("makeNewMyList", this.newMyListTitle);
      console.log(e);
      this.newMyListTitle = "";
      e.target[0].blur();
    },
    addSingleMovieToList() {
      console.log(this.chosenList);
      axios({
        method: "get",
        url: `${
          this.$store.state.baseUrlLocalServer
        }/list/recommend_movie_append/${this.chosenList.id}/${
          this.singleMovieData.id || this.singleMovieData.movie_id
        }/`,
      })
        .then((res) => {
          console.log("chosenList", this.chosenList);
          console.log("siglemoviedata", this.singleMovieData);
          alert(
            `${this.chosenList.title} 리스트에 ${this.singleMovieData.title} 영화를 추가했어요!`
          );
          console.log(res);
        })
        .catch((err) => console.error(err));
    },
    setChosenList(e) {
      const chosenList = this.singleUserMyLists.filter(
        (list) => list.title === e.target.innerText
      );
      this.chosenList = chosenList[0];
      console.log(this.chosenList);
    },
  },

  // beforeRouteUpdate() {
  //   this.getMovieReviews();
  // },
  mounted() {
    this.getMovieReviews();
  },
  components: {
    StarRating,
  },
};
</script>

<style>
.modal-wrapper,
.modal-overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 40;
}
.modal-overlay {
  background-color: rgb(0 0 0 / 71%);
}
.modal-card {
  position: relative;
  max-width: 60%;
  min-width: 1100px;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
  background-size: cover;
  background-position: center;
  object-fit: cover;
  min-height: 500px;
  /* max-height: 50vh; */
  z-index: 50;
  transition: all 400ms ease-in-out 2s;
  animation: fadeIn 400ms;
}
.modal-card-wrapper {
  width: 100%;
  height: 100%;
}
.modal-card__info {
  width: 50%;
}
.modal-card__info-first,
.modal-card__info-overview {
  width: 100%;
  height: 100%;
  line-height: 160%;
}
.modal-card__info-overview {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
  /* height: 6em; */
  overflow: hidden;
  margin: 10px 0px;
}
.modal__poster-img {
  width: 150px;
  height: 200px;
}
.vote-star {
  width: 30px;
  height: 30px;
  color: yellow;
}
.putMovieToListBtn {
  color: var(----main-text-color) !important;
}
.putMovieToListBtn:hover {
  color: white !important;
  font-weight: 500 !important;
}
#my-list-modal {
  font-family: "Ubuntu", Helvetica, Arial, sans-serif;
}
.my-list-modal__title,
.my-list-modal__content {
  color: var(--main-bg-color);
}

/* 버튼 css */
.custom-btn {
  width: 300px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  margin-bottom: 5px;
}
.my-list-modal__list-btn {
  background: rgb(0, 172, 238);
  background: linear-gradient(
    0deg,
    rgba(0, 172, 238, 1) 0%,
    rgba(2, 126, 251, 1) 100%
  );
  width: 300px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
}
.my-list-modal__list-btn span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.my-list-modal__list-btn:before,
.my-list-modal__list-btn:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}
.my-list-modal__list-btn:before {
  height: 0%;
  width: 2px;
}
.my-list-modal__list-btn:after {
  width: 0%;
  height: 2px;
}
.my-list-modal__list-btn:hover {
  background: transparent;
  box-shadow: none;
}
.my-list-modal__list-btn:hover:before {
  height: 100%;
}
.my-list-modal__list-btn:hover:after {
  width: 100%;
}
.my-list-modal__list-btn span:hover {
  color: rgba(2, 126, 251, 1);
}
.my-list-modal__list-btn span:before,
.my-list-modal__list-btn span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}
.my-list-modal__list-btn span:before {
  width: 2px;
  height: 0%;
}
.my-list-modal__list-btn span:after {
  width: 0%;
  height: 2px;
}
.my-list-modal__list-btn span:hover:before {
  height: 100%;
}
.my-list-modal__list-btn span:hover:after {
  width: 100%;
}

/* .my-list-modal__list-btn {
  width: 300px;
  height: 40px;
  background-color: var(--main-text-color);
  border: 2px solid var(--main-bg-color);
  margin-bottom: 5px;
} */
.my-list-modal__new-list-btn {
  width: 300px;
  height: 40px;
  border: 2px solid rgba(2, 126, 251, 1);
  background: transparent;
}
.my-list-modal__new-list-btn::placeholder {
  text-align: center;
  color: var(--main-bg-color);
}
.my-list-modal__list-btn:focus {
  border: 2px solid rgba(2, 126, 251, 1);
  color: rgba(2, 126, 251, 1);
  background: transparent;
  font-weight: 900;
}
.my-list-modal__list-btn:focus span {
  /* border: 2px solid rgba(2, 126, 251, 1); */
  color: rgba(2, 126, 251, 1);
  /* background: transparent; */
  /* font-weight: 700; */
}

.my-list-modal__new-list-btn:focus::placeholder {
  /* color: white; */
  font-weight: 100;
  font-size: 0.8rem;
}
/* .my-list-modal__footer {
  position: relative;
} */
.my-list-modal__footer-p {
  /* position: absolute; */
  /* text-align: left; */
  left: 5px;
  color: var(--main-bg-color);
  /* font-size: 0.8rem; */
  font-weight: 200;
  float: left;
}
.trailerBtn {
  width: 110px;
  height: 75px;
  font-size: 0.9rem;
}
.modal-card__info-review-post {
  border-top: 1px solid #b3b3b3;
  border-bottom: 1px solid #b3b3b3;
  padding: 10px 0px;
}
.modal-card__info-review-form {
  align-items: center;
  justify-content: space-between;
}
.modal-card__info-review-content {
  width: 350px;
}
.modal-card__info-reviews {
  margin: 10px 0px;
}
.modal-card__space {
  padding-left: 20px;
  width: 50%;
  height: 100%;
}

/*
.modal::-webkit-scrollbar {
  display: none;
  visibility: hidden;
} */

/* Hide scrollbar for IE, Edge and Firefox */
/* .modal {
  /* IE and Edge */
/* -ms-overflow-style: none;  */
/* Firefox */
/* scrollbar-width: none; } */

/* @media screen and (max-height: 768px) {
  .wrapper-modal {
    align-items: unset;
    padding-top: 2rem;
  }
  .modal {
    overflow-y: scroll;
  }
}
@media screen and (max-width: 768px) {
  .modal__overview {
    font-size: 16px;
  }
  .modal__details {
    font-size: 16px;
  }
  .wrapper-modal {
    padding: 0;
  }
  .modal {
    overflow-y: scroll !important;
  }
}
*/
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
