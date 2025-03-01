<template>
  <div class="relative h-screen bg-black text-white">
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Welcome to the game screen</h1>
      <button
        class="btn bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
      >
        Click me
      </button>
    </div>

    <!-- KEYBOARD -->
    <div
      class="absolute bottom-0 left-0 w-full border-t-2 border-gray-700 bg-zinc-900 p-4 pb-8"
    >
      <div class="grid grid-cols-5 gap-3 max-w-md mx-auto">
        <div v-for="num in numbers" :key="num" class="col-span-1">
          <button
            @click="handleKeyPress(num)"
            :class="[
              'number-key w-full aspect-square bg-white text-black font-bold text-2xl rounded-xl',
              'flex items-center justify-center shadow-lg',
              'transition-all duration-150 ease-in-out',
              activeKey === num ? 'bg-gray-300 scale-95' : 'hover:bg-gray-100',
            ]"
          >
            {{ num }}
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <!--      <div class="mt-4 max-w-md mx-auto">-->
      <!--        <button-->
      <!--          class="w-full py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-white transition-colors"-->
      <!--        >-->
      <!--          SUBMIT-->
      <!--        </button>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/store/gameStore.js";

const gameStore = useCounterStore();
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const activeKey = ref(null);

const handleKeyPress = (num) => {
  // Visual feedback
  activeKey.value = num;
  setTimeout(() => {
    activeKey.value = null;
  }, 150);

  // Add your game logic here
  console.log(`Number ${num} pressed`);
  // Example: gameStore.addNumber(num);
};
</script>

<style scoped>
.number-key:active {
  transform: scale(0.95);
  background-color: #e5e5e5;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.number-key.clicked {
  animation: pulse 0.15s ease;
}
</style>
