<template>
    <div class="beautiful-images-wrapper">
        <div class="animations-block" v-show="initSlider">
            <div v-if="items.length > 0">
                <swiper-container init="false" ref="animationsBlock" @click="handleTogglePlay" class="swiper-anim-slider animations-block" >
                    <swiper-slide v-for="(item, index) in items" :key="index" :virtualIndex="index" class="swiper-anim-slider__slide">
                        <div class="swiper-anim-slider__item">
                            <div class="swiper-anim-slider__item-pic">
                                <img :alt="item.title" :src="item.path"/>
                            </div>
                            <div class="swiper-anim-slider__item-title" v-html="item.title"></div>
                        </div>
                    </swiper-slide>
                </swiper-container>
            </div>
        </div>
        <div class="loader" v-show="!initSlider">
            <Loader :width="24" :height="24"/>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    items: {
        type: Array,
        default: []
    }
})
const animationsBlock = ref(null)

const initSlider = ref(false)
let timerId = 0

// Variables for calculations
let duration = 0;
let distance = 0;
const isPlaying = ref(true);
let clickable = true;
let startTimer = null

const stopAutoplay = () => {
    // Get the swiper instance
    const swiper = animationsBlock.value.swiper;

    // Current translate value
    const currentTranslate = swiper.getTranslate();

    // Width of a single slide
    const slideWidth = swiper.slidesSizesGrid[swiper.activeIndex > 0 ? swiper.activeIndex - 1 : 0] + swiper.params.spaceBetween

    // Next slide index
    let nextSlideIndex = swiper.activeIndex;

    if (nextSlideIndex >= swiper.slides.length) {
        nextSlideIndex = swiper.slides.length - 1;
    }

    // Translate of a next slide
    const nextSlideTranslate = -swiper.slidesGrid[nextSlideIndex];

    // Distance to the next slide
    const distanceNext = Math.abs(currentTranslate - nextSlideTranslate);
    distance = -nextSlideTranslate

    // Distance ratio to slide width
    const distanceRatio = distanceNext > 0 ? distanceNext / slideWidth : 0;

    // Duration that we will pass to the slideTo method
    const newDuration = swiper.params.speed * distanceRatio
    duration = newDuration <= swiper.params.speed ? newDuration : swiper.params.speed;

    // Stop autoplay by setting the current translate
    swiper.setTranslate(currentTranslate);

    // Logs for debug
    console.log('currentTranslate:', currentTranslate);
    console.log('slideWidth:', slideWidth);
    console.log('nextSlideIndex:', nextSlideIndex);
    console.log('nextSlideTranslate:', nextSlideTranslate);
    console.log('distance:', distance);
    console.log('distanceRatio:', distanceRatio);
    console.log('duration:', duration);

    // Stop swiper autoplay
    if (startTimer) clearTimeout(startTimer);
    swiper.autoplay.stop();
};

const startAutoplay = () => {

    if(isPlaying.value) return
    if (startTimer) clearTimeout(startTimer);

    // Resume autoplay after the duration
    startTimer = setTimeout(() => {
        animationsBlock.value.swiper.autoplay.start();
    }, duration);
};


const handleTogglePlay = () => {

  if (!clickable) return;
  clickable = false;

  if (isPlaying.value) stopAutoplay();
  else {
    // To resume the autoplay we slide to the next slide with calculated duration and then we start swiper autoplay
    animationsBlock.value.swiper.slideTo(animationsBlock.value.swiper.activeIndex, duration);
    startAutoplay();
  }
  isPlaying.value = !isPlaying.value;
  setTimeout(() => { clickable = true; }, 200);
};

onMounted( () =>  {
    const animationsBlockParams = {
        loop: true,
        spaceBetween: 40,
        onlyExternal: true,
        allowTouchMove: false,
        slidesPerView: 'auto',
        speed: 15000,
        injectStyles: [
            `
            .swiper-wrapper {
                margin-bottom: 0px;
                transition-timing-function: linear !important;
            }
        `,
        ],
        on: {
            init: function () {
                timerId = setTimeout(() => initSlider.value = true, 3000)
            },
        },
    }

    if (animationsBlock.value && props.items.length > 0) {
        Object.assign(animationsBlock.value, {
            ...animationsBlockParams,
            autoplay: {
                delay: 1,
                disableOnInteraction: false,
                reverseDirection: true,
            },
        });
        animationsBlock.value.initialize();
    }
})

onUnmounted(() => {
    clearTimeout(timerId)
})
</script>

<style scoped lang="scss">
.beautiful-images-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;

    .loader {
        text-align: center;
    }
}
.animations-block {
    visibility: visible;
    height: auto;
    overflow: hidden;
    margin-top: 20px;

    .swiper-anim-slider {
        cursor: pointer;
    
        &__slide {
            width: auto;
        }
    
        &__item {
            text-align: left;
            color: gray;
            width: min-content;
        }
    
        &__item-pic {
            height: 344px;
            background-color: gray;
            margin: 0 0 16px;
            border-radius: 2px;
            background-position: center center;
            background-size: cover;
    
            img {
                width: auto;
                height: inherit;
            }
        }
    }
}
</style>
