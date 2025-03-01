<template>
  <div class="relative h-screen bg-black text-white flex flex-col">
    <!-- Header Section -->
    <div class="p-6">
      <button
        @click="goBack"
        class="btn bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Go Back
      </button>
    </div>

    <!-- Main Game Section -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Game Board - Left Side -->
      <div class="w-3/4 bg-zinc-900 flex flex-col p-4">
        <h2 class="text-xl font-bold mb-4 text-center">Guess the Code</h2>

        <!-- Previous Guesses -->
        <div class="flex-1 overflow-y-auto space-y-4">
          <div
            v-for="(guess, index) in previousGuesses"
            :key="index"
            class="flex justify-between items-center bg-zinc-800 p-3 rounded-lg"
          >
            <div class="flex gap-2">
              <div
                v-for="(num, numIndex) in guess.numbers"
                :key="numIndex"
                class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold"
              >
                {{ num }}
              </div>
            </div>
            <div class="flex gap-1">
              <div
                v-for="(result, resultIndex) in guess.results"
                :key="resultIndex"
                class="w-4 h-4 rounded-full"
                :class="{
                  'bg-green-500': result === 'correct',
                  'bg-yellow-500': result === 'misplaced',
                  'bg-gray-600': result === 'incorrect',
                }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Current Guess Display -->
        <div class="mt-4 bg-zinc-800 p-4 rounded-lg">
          <div class="flex justify-center gap-2 mb-2">
            <div
              v-for="(num, index) in currentGuess"
              :key="index"
              class="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl font-bold"
            >
              {{ num !== null ? num : "" }}
            </div>
          </div>
          <div class="flex justify-center mt-2">
            <button
              @click="submitGuess"
              class="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-bold text-white transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
              :disabled="!isGuessComplete"
            >
              SUBMIT
            </button>
            <button
              @click="clearGuess"
              class="ml-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-bold text-white transition-colors"
              :disabled="currentGuess.every((val) => val === null)"
            >
              CLEAR
            </button>
          </div>
        </div>
      </div>

      <!-- Hints/Stats - Right Side -->
      <div class="w-1/4 bg-zinc-800 p-4 flex flex-col">
        <h2 class="text-xl font-bold mb-4 text-center">Stats</h2>
        <div class="space-y-4">
          <div class="bg-zinc-700 p-3 rounded-lg">
            <p class="text-sm text-gray-300">Attempts</p>
            <p class="text-2xl font-bold">{{ previousGuesses.length }}/10</p>
          </div>
          <div class="bg-zinc-700 p-3 rounded-lg">
            <p class="text-sm text-gray-300">Time</p>
            <p class="text-2xl font-bold">{{ formatTime(gameTime) }}</p>
          </div>
        </div>

        <div class="mt-auto">
          <div class="bg-zinc-700 p-3 rounded-lg">
            <h3 class="font-bold mb-2">How to play:</h3>
            <ul class="text-sm space-y-1 text-gray-300">
              <li>• Guess the 4-digit code</li>
              <li>• Green: Correct number & position</li>
              <li>• Yellow: Correct number, wrong position</li>
              <li>• Gray: Incorrect number</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Keyboard Section -->
    <div class="border-t-2 border-gray-700 bg-zinc-900 p-4 pb-8">
      <div class="grid grid-cols-5 gap-3 max-w-md mx-auto">
        <div v-for="num in numbers" :key="num" class="col-span-1">
          <button
            @click="handleKeyPress(num)"
            :class="[
              'number-key w-full aspect-square bg-white text-black font-bold text-2xl rounded-xl',
              'flex items-center justify-center shadow-lg',
              'transition-all duration-150 ease-in-out',
              activeKey === num ? 'bg-gray-300 scale-95' : 'hover:bg-gray-100',
              isGuessComplete ? 'opacity-50 cursor-not-allowed' : '',
            ]"
            :disabled="isGuessComplete"
          >
            {{ num }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useCounterStore } from "@/store/gameStore.js";
import { useRouter } from "vue-router";

const router = useRouter();
const gameStore = useCounterStore();
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const activeKey = ref(null);
const currentGuess = ref([null, null, null, null]);
const previousGuesses = ref([
  // Example guesses for demonstration
  {
    numbers: [1, 2, 3, 4],
    results: ["correct", "misplaced", "incorrect", "incorrect"],
  },
  {
    numbers: [5, 2, 6, 4],
    results: ["correct", "correct", "misplaced", "correct"],
  },
]);
const gameTime = ref(0);
const timer = ref(null);

const isGuessComplete = computed(() => {
  return currentGuess.value.every((val) => val !== null);
});

const handleKeyPress = (num) => {
  // Visual feedback
  activeKey.value = num;
  setTimeout(() => {
    activeKey.value = null;
  }, 150);

  // Add number to current guess
  const emptyIndex = currentGuess.value.findIndex((val) => val === null);
  if (emptyIndex !== -1) {
    currentGuess.value[emptyIndex] = num;
  }
};

const clearGuess = () => {
  currentGuess.value = [null, null, null, null];
};

const submitGuess = () => {
  if (!isGuessComplete.value) return;

  // In a real game, you would check the guess against the secret code here
  // For demonstration, we'll add a fake result
  const fakeResults = ["correct", "misplaced", "incorrect", "correct"];

  previousGuesses.value.push({
    numbers: [...currentGuess.value],
    results: fakeResults,
  });

  // Clear current guess
  clearGuess();

  // Check if game is over (win or max attempts)
  if (fakeResults.every((r) => r === "correct")) {
    alert("Congratulations! You won!");
    // Handle win
  } else if (previousGuesses.value.length >= 10) {
    alert("Game over! You ran out of attempts.");
    // Handle game over
  }
};

const goBack = () => {
  router.replace("/");
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

// Game timer
onMounted(() => {
  timer.value = setInterval(() => {
    gameTime.value++;
  }, 1000);
});

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
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
