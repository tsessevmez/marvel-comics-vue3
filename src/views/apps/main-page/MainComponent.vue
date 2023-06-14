<template>
  <div class="home">
    <div class="container">
      <div class="left">
        <h1 class="title-1">Money Heist</h1>
      </div>
      <div class="center">
        <div class="button-section">
          <button class="button-btn">Play</button>
          <button class="button-btn">My List</button>
        </div>
      </div>
      <div class="right">
        <span class="desc-1"
          >To carry out the biggest heist in history, a mysterious man called
          The Professor recruits a band of eight robbers who have a single
          characteristic: n...
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.home {
  /* background-image: url("../../../assets/banner.jpg"); */
  background-size: cover;
  background-position: center;
  object-fit: contain;
  height: 450px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.left,
.center,
.right {
  width: 100%;
  text-align: start;

  margin-bottom: 10px;
  margin-left: 30px;
  color: #fff;
}

.title-1 {
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
}

.button-section {
  margin: 5px;
}

.button-btn {
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);
}

.button-btn:hover {
  color: #000;
  background-color: #e6e6e6;
  transition: all 0.2s;
}

.right {
}

.desc-1 {
  display: inline-block;
  text-align: start;
  max-width: 360px;
}
</style>
