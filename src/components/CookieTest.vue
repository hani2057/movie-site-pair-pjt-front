<template>
  <div>
    <a @click="getTest">get cookie</a><br>
    <a @click="setTest">set cookie</a><br>
    <a @click="resetTest">reset cookie</a><br>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
export default {
  name: 'CookieTest',
  methods: {
    getTest: () => {
      if (VueCookies.isKey('test')) { alert(VueCookies.get('test')) } else {
        alert('값 없음')
      }
      console.log(VueCookies)
    },
    setTest: () => {
      VueCookies.set('test', new Date())
    },
    resetTest: () => {
      alert('삭제됨')
      VueCookies.remove('test')
    }
  }
}
</script>