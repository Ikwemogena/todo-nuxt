<template>
    <div class="loading-sign">
      <div class="spinner"></div>
      <!-- <p>Loading...</p> -->
    </div>
  </template>
  
  <style scoped>
  .loading-sign {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #183440;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  