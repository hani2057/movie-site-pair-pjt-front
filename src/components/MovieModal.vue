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
                <h4 class="modal__movieTitle py-3">
                  {{ singleMovieData.title }}
                </h4>
                <div class="d-flex justify-content-between">
                  <div>
                    <i class="fa-solid fa-star me-1"></i>
                    <span>{{ singleMovieData.vote_average }}</span> <br />
                    <span v-if="singleMovieData.release_date">
                      {{ singleMovieData.release_date }} 개봉
                    </span>
                    <p v-if="!singleMovieData.release_date">
                      개봉일 정보가 없습니다.
                    </p>
                    <br />
                    <span
                      v-for="genre in singleMovieDataGenres"
                      :key="genre"
                      class="badge text-bg-light me-2"
                    >
                      {{ genre }}
                    </span>
                  </div>
                  <button
                    class="btn btn-outline-light trailerBtn"
                    @click="showTrailer"
                  >
                    예고편 보기
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
              <form @submit.prevent="postReview">
                <label for="">리뷰 작성</label>
                <input type="text" v-model="reviewContent" />
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  v-model="reviewScore"
                />
                <button type="submit">등록</button>
              </form>
            </div>
            <div class="modal-card__info-reviews">
              <div v-for="review in singleMovieReviews" :key="review.id">
                <span> {{ review?.score }}</span>
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
  },
  watch: {
    singleMovieData() {},
    singleMovieReviews(val) {
      console.log("review watch", val);
    },
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

      // console.log(singleMovieId);
      // axios({
      //   method: "get",
      //   // url: this.reviewUrlForGetPost,
      //   // url: `${this.$store.state.baseUrlLocalServer}/movies/detail/${singleMovieId}/comment/`,
      //   url: "http://127.0.0.1:8000/movies/detail/16/comment/",
      // })
      //   .then((res) => {
      //     console.log("리뷰", res);
      //     this.reviews = res.data;
      //   })
      //   .catch((err) => console.error(err));
    },
    postReview() {
      const content = this.reviewContent;
      const score = this.reviewScore;
      const movieId = this.singleMovieData.id;
      // console.log(singleMovieId);
      // console.log(this.$store.state.token);
      const payload = { content, score, movieId };

      this.$store.dispatch("postSingleMovieReview", payload);

      this.reviewContent = null;
      this.reviewScore = null;
      // axios({
      //   method: "post",
      //   url: this.reviewUrlForGetPost,
      //   // url: `${this.$store.state.baseUrlLocalServer}/movies/detail/${singleMovieId}/comment/`,
      //   data: { content: reviewContent, score: reviewScore },
      //   headers: {
      //     Authorization: `Token ${this.$store.state.token}`,
      //   },
      // })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => console.error(err));

      // this.getMovieReviews();
    },
  },
  // beforeRouteUpdate() {
  //   this.getMovieReviews();
  // },
  created() {
    this.getMovieReviews();
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
  z-index: 30;
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
  z-index: 40;
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
  text-overflow: ellipsis;
  height: 6em;
  overflow: hidden;
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
.trailerBtn {
  height: 75px;
}
.modal-card__space {
  padding-left: 20px;
  width: 50%;
  height: 100%;
}
/* .modal-card__space-trailer {
  width: 100%;
  height: 50%;
  overflow: hidden;
} */

/* .presentation {
  z-index: 1200;
  position: absolute;
}
.wrapper-modal {
  position: fixed;
  inset: 0px;
  background-color: rgb(0 0 0 / 71%);
  -webkit-tap-highlight-color: transparent;
  display: flex;
  justify-content: center;
} */
/* .modal {
  position: relative;
  max-width: 800px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  background: #111;
  overflow: hidden;
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;
  animation: fadeIn 400ms;
}
.modal-close {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 1000;
  color: white;
}
.modal__poster-img {
  width: 100%;
  height: auto;
}
.modal__content {
  padding: 40px;
  color: white;
}
.modal__title {
  padding: 0;
  font-size: 40px;
  margin: 16px 0;
}
.modal__details {
  font-weight: 600;
  font-size: 18px;
}
.modal__overview {
  font-size: 20px;
  line-height: 1.5;
}
.modal__user-perc {
  color: #46d369;
}
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
