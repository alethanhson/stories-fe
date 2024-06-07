<template>
  <div>
    <el-container>
      <el-header class="bg-pink-100 !px-0 fixed w-full z-50">
        <DefaultHeader />
      </el-header>
      <el-main class="!px-0 !py-0 min-h-screen !pt-[60px] !flex [&>div]:w-full bg-black">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
