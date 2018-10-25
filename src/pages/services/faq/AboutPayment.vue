<template>
  <div class="service-container">

    <h3>{{$t('faqText.payment.h1')}}</h3>
    <p>
      <b>{{$t('faqText.payment.b1')}}</b>
    </p>
    <p>
      <router-link :to="{name:'serviceFAQShippingInfo'}">
        {{$t('faqText.payment.a1')}}
      </router-link>
    </p>
    <p>
      <b>{{$t('faqText.payment.b2')}}</b>
    </p>
    <p>{{$t('faqText.payment.p1')}}</p>
    <p>
      <b>{{$t('faqText.payment.b3')}}</b>
    </p>
    <p>{{$t('faqText.payment.p2')}}<br> {{$t('faqText.payment.p3')}}</p>
    <p>
      <b>{{$t('faqText.payment.b4')}}</b>
    </p>
    <p>{{$t('faqText.payment.p4')}}<br> {{$t('faqText.payment.p5')}}</p>
  </div>
</template>
