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
              <span v-if="adult">Adult</span>
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
                    <!-- <i class="vote-star fa-solid fa-star-shooting"></i> -->
                    <i class="fa-solid fa-star"></i>
                    <span>{{ singleMovieData.vote_average }}</span> <br />
                    <span>{{ singleMovieData.release_date }} 개봉</span> <br />
                    <span
                      v-for="genre_id in singleMovieData.genre_ids"
                      :key="genre_id"
                      class="badge text-bg-light me-2"
                    >
                      {{ genre_id }}
                    </span>
                    <!-- </div> -->
                  </div>
                  <button class="btn btn-outline-light" @click="showTrailer">
                    예고편 보기
                  </button>
                </div>
              </div>
            </div>
            <div class="modal-card__info-second">
              <p>{{ singleMovieData.overview }}</p>
            </div>
          </div>
          <div class="modal-card__space">
            <!-- <iframe
              width="100%"
              height="auto"
              :src="`https://www.youtube.com/embed/${youtubeId}?autoplay=1`"
              frameborder="0"
              class="modal-card__space-trailer"
            ></iframe> -->
            <!-- width="640" height="360" -->
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
  // props: {
  //   title: String,
  //   poster_path: String,
  //   backdrop_path: String,
  //   overview: String,
  //   vote_average: Number,
  //   release_date: String,
  //   adult: Boolean,
  // },
  data() {
    return {
      bgImgLinearGradient:
        "linear-gradient(to right, rgba(0, 0, 0, 1), 72%, rgba(0, 0, 0, 0))",
      youtubeId: "",
    };
  },
  computed: {
    singleMovieData() {
      return this.$store.state.singleMovieData;
    },
    baseUrlTMDBImg() {
      return this.$store.state.baseUrlTMDBImg;
    },
  },
  methods: {
    closeModal() {
      this.$store.commit("CHANGE_MODAL_OPEN_STATE");
    },
    showTrailer() {
      axios({
        method: "get",
        url: `${this.$store.state.baseUrlTMDB}/movie/${this.singleMovieData.id}/videos`,
        params: this.$store.state.paramsTMDBVideo,
      })
        .then((res) => {
          const div = document.querySelector("div.modal-card__space");
          console.log(res);
          if (res.data.results) {
            this.youtubeId = res.data.results[0]?.key;
            const output = `<iframe width="100%" height="auto" src="https://www.youtube.com/embed/${this.youtubeId}?autoplay=1" frameborder="0" class="modal-trailer" ></iframe>`;
            // 에러의 원인: '<iframe width="100%" height="auto" src=`https://www.youtube.com/embed/${youtubeId}?autoplay=1` frameborder="0"></iframe>';

            div.innerHTML = output;
          } else {
            const output = `<h3 class="noVideo">재생할 예고편이 없습니다.</h3>`;
            div.innerHTML = output;
          }
        })
        .catch((err) => console.error(err));
    },
  },
  created() {
    console.log(this.singleMovieData);
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
  max-width: 70%;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
  background-size: cover;
  background-position: center;
  object-fit: cover;
  min-height: 500px;
  z-index: 40;
  transition: all 400ms ease-in-out 2s;
  animation: fadeIn 400ms;
}
.modal-card-wrapper {
  width: 100%;
  height: 100%;
}
.modal-card__info {
  max-width: 50%;
}
.modal-card__info-first,
.modal-card__info-second {
  width: 100%;
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
.modal-card__space {
  width: 100%;
  height: 100%;
}
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
