<template>
    <slot></slot>
</template>
<script setup>
import { provide } from "vue";
import cheer from "./cheer.wav";
import buue from "./buue.wav";

function playSound(action) {
    console.log(action);
    switch (action) {
        case "cheer":
            play(cheer);
            break;
        case "buue":
            play(buue);
            break;
        default:
            break;
    }
}

function play(sound) {
    const audio = new Audio(sound);
    audio.play();
}

provide("playSound", playSound);
</script>
