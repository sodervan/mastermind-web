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
    <div class="relative z-10 flex flex-col items-center h-full py-10">
      <!-- Game Icon -->
      <div class="flex-1">
        <CircuitBoard class="w-24 h-24 text-white opacity-80" />
      </div>

      <!-- Game Description and Button -->
      <div class="flex flex-col items-center space-y-8">
        <p class="text-gray-300 text-xl text-center max-w-md px-6">
          Test your deductive reasoning in this classic code-breaking game
        </p>
        <Drawer>
          <DrawerTrigger class="w-full flex justify-center">
            <Button
              class="relative py-10 pr-12 pl-16 rounded-full w-[90%] bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 border border-zinc-800 group transition-all duration-300 shadow-lg text-white"
            >
              <div
                class="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md"
              >
                <ChevronRight class="text-zinc-900 w-5 h-5" />
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
              <Dialog>
                <DialogTrigger as-child>
                  <DrawerClose class="w-full">
                    <Button
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
                </DialogTrigger>
                <!--                DIALOGUE CONTENT-->
                <DialogContent class="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle
                      class="flex items-center justify-center gap-2 text-xl font-bold"
                    >
                      <Brain class="h-6 w-6 text-primary" />
                      Select Game Mode
                    </DialogTitle>
                    <DialogDescription class="text-center">
                      Choose how you want to play Mastermind
                    </DialogDescription>
                  </DialogHeader>
                  <div class="grid gap-4 py-4">
                    <div class="grid grid-cols-1 gap-4">
                      <Button
                        variant="outline"
                        class="flex items-center justify-start gap-3 h-16 px-4 hover:bg-primary/5 hover:border-primary transition-all group"
                        @click="handleModeSelect('single')"
                      >
                        <div
                          class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-active:scale-95 transition-transform"
                        >
                          <User
                            class="h-5 w-5 text-primary group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div
                          class="text-left group-active:translate-x-1 transition-transform"
                        >
                          <h3 class="font-medium">Single Player</h3>
                          <p class="text-sm text-muted-foreground">
                            Play at your own pace
                          </p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        class="flex items-center justify-start gap-3 h-16 px-4 hover:bg-primary/5 hover:border-primary transition-all group"
                        @click="handleModeSelect('computer')"
                      >
                        <div
                          class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-active:scale-95 transition-transform"
                        >
                          <Monitor
                            class="h-5 w-5 text-primary group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div
                          class="text-left group-active:translate-x-1 transition-transform"
                        >
                          <h3 class="font-medium">vs Computer</h3>
                          <p class="text-sm text-muted-foreground">
                            Challenge the AI opponent
                          </p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        class="flex items-center justify-start gap-3 h-16 px-4 hover:bg-primary/5 hover:border-primary transition-all group"
                        @click="handleModeSelect('online')"
                      >
                        <div
                          class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-active:scale-95 transition-transform"
                        >
                          <Users
                            class="h-5 w-5 text-primary group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div
                          class="text-left group-active:translate-x-1 transition-transform"
                        >
                          <h3 class="font-medium">Online Multiplayer</h3>
                          <p class="text-sm text-muted-foreground">
                            Play against other players
                          </p>
                        </div>
                      </Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose as-child class="w-full flex justify-center">
                      <Button type="button" class="w-[70%] py-6">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

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
              class="relative py-10 pr-12 pl-16 rounded-full w-[90%] bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 border border-zinc-800 group transition-all duration-300 shadow-lg text-white"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover } from "@/components/ui/popover/index.js";
</script>
