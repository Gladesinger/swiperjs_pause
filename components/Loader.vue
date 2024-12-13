<template>
    <svg class="x-md-loader" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.6835 12.228C17.2976 13.5587 16.5728 14.7664 15.5799 15.7328C14.587 16.6992 13.3602 17.3911 12.0195 17.7409C10.6789 18.0907 9.27035 18.0862 7.93192 17.7281C6.59348 17.3699 5.37102 16.6702 4.38423 15.6976C3.39745 14.725 2.68018 13.5128 2.30267 12.1797C1.92517 10.8466 1.90036 9.4383 2.23068 8.09272C2.56101 6.74714 3.23514 5.51042 4.18705 4.50367C5.13897 3.49692 6.33604 2.75465 7.66103 2.34956" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="bevel"/>
    </svg>
</template>

<script setup></script>

<style scoped>
.x-md-loader {
    animation: rotation 1.35s linear infinite;
    
    circle {
        stroke-dasharray: 260% 350%;
        stroke-dashoffset: 0;
        transform-origin: center;
        animation: turn 1.35s ease-in-out infinite;
    }
}
@keyframes rotation
{
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
@keyframes turn
{
    0% {
        stroke-dashoffset: 260%;
    }
    50% {
        stroke-dashoffset: 60%;
        transform: rotate(135deg);
    }
    100% {
        stroke-dashoffset: 260%;
        transform: rotate(450deg);
    }
}
</style>