<template>
    <div class="preloader" v-if="isLoading">
      <div class="animation">
        <h1 class="word text-3xl" v-for="(word, index) in words" :key="index" :class="{ 'active': index === currentWordIndex }">{{ word }}</h1>
      </div>
    </div>
  </template>
    
  <script>
  export default {
    data() {
      return {
        isLoading: true,
        words: ['Loading...', 'Please wait...', 'Almost there', 'Your todo list is ready'],
        currentWordIndex: 0,
      };
    },
    mounted() {
      this.showContent();
      this.animateWords();
    },
    methods: {
      showContent() {
        // Simulate loading completion
        setTimeout(() => {
          this.isLoading = false;
        }, 4000);
      },
      animateWords() {
        setInterval(() => {
          this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
        }, 1000);
      },
    },
  };
  </script>
  
  <style scoped>
  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: background-color-change 4s infinite;
  }
  
  .animation {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .word {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  }
  
  .word.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  @keyframes background-color-change {
    0% {
      background-color: #f5f5f5;
    }
    50% {
      background-color: #ebebeb;
    }
    100% {
      background-color: #f5f5f5;
    }
  }
  </style>
  