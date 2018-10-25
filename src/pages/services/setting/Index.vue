<template>
  <div class="setting-container">
    <group :groups="groups"></group>

    <div class="logout" @click="onLogoutClick" v-if="isLogin">
      {{$t('button.logout')}}
    </div>
  </div>
</template>

<script>
  import Group from '@/components/common/Group'
  import {
    mapGetters
  } from 'vuex'
  export default {
    components: {
      Group
    },
    data () {
      return {
        groups: [
          [
            {
              name: 'title.settingFeedback',
              to: {
                name: 'settingFeedback'
              }
            }
            // {
            //   name: 'title.settingProfileInfo',
            //   to: {
            //     name: 'settingProfileInfo'
            //   }
            // }
          ]
        ]
      }
    },
    methods: {
      onLogoutClick () {
        // 退出登录
        this.$store.commit('setUserProfile')
        this.$router.back()
      }
    },
    computed: {
      ...mapGetters({
        isLogin: 'isLogin'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .setting-container {
    .logout {
      height: px2rem(44);
      line-height: px2rem(44);
      text-align: center;
      margin-top: px2rem(10);
      background: $white;
      color: $flamingo;
    }
  }
</style>
