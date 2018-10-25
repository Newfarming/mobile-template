<template>
  <div class="service-container aboutus">
    <div class="our_story_title">
      <img class="our_story" src="/static/img/service/our_story.jpg">
    </div>
    <div class="avatar-wrap">
      <img class="avatar" src="/static/img/service/founder_avatar.jpg">
    </div>
    <div class="story">
      <p>{{$t('aboutText.us.p1')}}</p>
      <p>{{$t('aboutText.us.p2')}}</p>
    </div>
    <div class="img">
      <img class="team" src="/static/img/service/team.jpg">
    </div>
    <div class="story">
      <p>{{$t('aboutText.us.p3')}}</p>
      <p>{{$t('aboutText.us.p4')}}</p>
    </div>
    <div class="whats_more_title">
      <img class="whats_more" src="/static/img/service/whats_more.jpg">
    </div>
    <h4>{{$t('aboutText.us.h1')}}</h4>
    <p>{{$t('aboutText.us.p5')}}</p>
    <h4>{{$t('aboutText.us.h2')}}</h4>
    <p>{{$t('aboutText.us.p6')}}</p>
    <h4>{{$t('aboutText.us.h3')}}</h4>
    <p>{{$t('aboutText.us.p7')}}</p>
    <h4>{{$t('aboutText.us.h4')}}</h4>
    <p>{{$t('aboutText.us.p8')}}</p>
  </div>
</template>

<style lang="scss" scoped>
  .avatar-wrap {
    text-align: center;
    .avatar {
      width: 50%;
    }
  }
</style>



