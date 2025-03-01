<template>
  <div class="relative h-screen w-full bg-black overflow-hidden">
    <!-- Animated Background -->
    <svg
      class="absolute inset-0 w-full h-full opacity-15"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
    >
      <!-- Grid Pattern -->
      <pattern
        id="grid"
        x="0"
        y="0"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="#ffffff"
          stroke-width="0.5"
        />
      </pattern>
      <rect width="400" height="400" fill="url(#grid)" />

      <!-- Central Design Elements -->
      <g transform="translate(200, 200)">
        <template
          v-for="angle in [0, 45, 90, 135, 180, 225, 270, 315]"
          :key="angle"
        >
          <g :transform="`rotate(${angle})`">
            <path
              d="M0 -160 A160 160 0 0 1 0 160"
              fill="none"
              stroke="#ffffff"
              stroke-width="0.5"
              opacity="0.2"
            />
            <circle cx="0" cy="-120" r="4" fill="#ffffff" opacity="0.3" />
          </g>
        </template>
      </g>
    </svg>

    <!-- Header -->
    <!--    <div class="absolute top-0 left-0 w-full px-6 py-8">-->
    <!--      <div class="flex items-center justify-center space-x-4">-->
    <!--        <Brain class="w-10 h-10 text-indigo-400" />-->
    <!--        <h1 class="text-3xl font-bold text-white tracking-wider">MASTERMIND</h1>-->
    <!--      </div>-->
    <!--    </div>-->

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col items-center h-full py-10 px-10">
      <!-- Game Icon -->
      <div class="flex-1">
        <CircuitBoard class="w-24 h-24 text-white opacity-80" />
      </div>

      <!-- Game Description and Button -->
      <div class="flex flex-col items-center space-y-8">
        <div class="flex flex-col gap-3">
          <p class="text-[40px] font-bold">Good Morning</p>
          <p class="text-gray-500 text-xl">
            Test your deductive reasoning in this classic code-breaking game
          </p>
        </div>

        <Drawer>
          <DrawerTrigger class="w-full flex justify-center">
            <Button
              class="relative py-10 pr-12 pl-16 rounded-full w-full bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 border border-zinc-800 group transition-all duration-300 shadow-lg text-white"
            >
              <div
                class="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md"
              >
                <ChevronRight class="text-zinc-900" />
              </div>
              <span class="text-lg font-medium tracking-wide">START</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle> SELECT MODE</DrawerTitle>
            </DrawerHeader>
            <div class="flex flex-col gap-4 px-6">
              <!-- Easy Mode -->

              <DrawerClose class="w-full">
                <Button
                  @click="goToGameScreen"
                  variant="outline"
                  class="flex justify-between items-center py-10 rounded-[25px] w-full"
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="bg-green-400 p-5 rounded-[20px] flex items-center justify-center"
                    >
                      <Rocket />
                    </div>
                    <div class="flex flex-col items-start">
                      <p class="font-bold text-lg">EASY</p>
                      <p class="text-gray-500">10 numbers, 10 attempts</p>
                    </div>
                  </div>

                  <div>
                    <ChevronRight />
                  </div>
                </Button>
              </DrawerClose>

              <!-- Medium Mode -->
              <Button
                variant="outline"
                class="flex justify-between items-center py-10 rounded-[25px] w-full"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="bg-yellow-400 p-5 rounded-[20px] flex items-center justify-center"
                  >
                    <Rocket />
                  </div>
                  <div class="flex flex-col items-start">
                    <p class="font-bold text-lg">MEDIUM</p>
                    <p class="text-gray-500">10 numbers, 8 attempts</p>
                  </div>
                </div>

                <div>
                  <ChevronRight />
                </div>
              </Button>

              <!-- Hard Mode -->
              <Button
                variant="outline"
                class="flex justify-between items-center py-10 rounded-[25px] w-full"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="bg-red-400 p-5 rounded-[20px] flex items-center justify-center"
                  >
                    <Rocket />
                  </div>
                  <div class="flex flex-col items-start">
                    <p class="font-bold text-lg">HARD</p>
                    <p class="text-gray-500">10 numbers, 6 attempts</p>
                  </div>
                </div>

                <div>
                  <ChevronRight />
                </div>
              </Button>
            </div>
            <DrawerFooter>
              <DrawerClose>
                <!--                <Button class="w-[60%] my-3 rounded-lg py-5"> Cancel</Button>-->
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <!--        SETTINGS DRAWER-->
        <Drawer>
          <DrawerTrigger class="w-full">
            <Button
              class="relative py-10 pr-12 pl-16 rounded-full w-full bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 border border-zinc-800 group transition-all duration-300 shadow-lg text-white"
            >
              <div
                class="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md"
              >
                <Bolt class="text-zinc-900 w-5 h-5" />
              </div>
              <span class="text-lg font-medium tracking-wide">SETTINGS</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle> SELECT MODE</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <!-- Decorative Dots -->
      <div class="absolute top-8 right-8 flex space-x-2">
        <div
          v-for="i in 4"
          :key="i"
          class="w-3 h-3 rounded-full bg-white opacity-75"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import {
  Brain,
  User,
  Monitor,
  Users,
  CircuitBoard,
  Rocket,
  ChevronRight,
  ChevronsRight,
  Bolt,
} from "lucide-vue-next";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const router = useRouter();

const goToGameScreen = () => {
  console.log("Navigation triggered");
  setTimeout(() => {
    router.replace("/game-screen");
  }, 20);
};
</script>
