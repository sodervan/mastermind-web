<template>
  <>
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
    <div class="absolute top-0 left-0 w-full px-6 py-8">
      <div class="flex items-center justify-center space-x-4">
        <Brain class="w-10 h-10 text-indigo-400" />
        <h1 class="text-3xl font-bold text-white tracking-wider">MASTERMIND</h1>
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="relative z-10 flex flex-col items-center justify-center h-full -mt-20"
    >
      <!-- Game Icon -->
      <div class="mb-12">
        <CircuitBoard class="w-24 h-24 text-white opacity-80" />
      </div>

      <!-- Game Description and Button -->
      <div class="flex flex-col items-center space-y-8">
        <p class="text-gray-300 text-xl text-center max-w-md px-6">
          Test your deductive reasoning in this classic code-breaking game
        </p>
        <Drawer>
          <DrawerTrigger class="w-[80%]">
            <Button
              variant="secondary"
              class="py-7 px-5 rounded-xl w-[80%] mt-7"
              >START GAME</Button
            >
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle> SELECT MODE </DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline" class="w-[70%]"> Cancel </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <!--        SETTINGS DRAWER-->
        <Drawer>
          <DrawerTrigger class="w-[80%]">
            <Button class="py-7 px-5 rounded-xl w-[80%] mt-0">SETTINGS</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle> SELECT MODE </DrawerTitle>
            </DrawerHeader>
            <DrawerFooter> </DrawerFooter>
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
import { Button } from "@/components/ui/button";
import { Brain, CircuitBoard } from "lucide-vue-next";
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
</script>
